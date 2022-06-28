import './CartView.css';

import EmptyCartState from '../../resources/empty-cart.svg';
import AddUserState from '../../resources/add-user.svg';

import { SlideEffect } from '../link/Link';
import { Close, Delete } from '../icon/Icon';
import { AuthContext } from '../../App';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';

function CartView(props) {
    const authContextHook = useContext(AuthContext);

    

    useEffect(() => {
        if(authContextHook.cart.length === 0 && authContextHook.role === 'customer'){
            authContextHook.getCart();
        }
    }, []);

    return (
        <div id='cartView'>
            <button className='Tertiary CloseButton' onClick={props.onDismiss}>
                <SlideEffect height='1.5rem'>
                    <Close />
                </SlideEffect>
            </button>
            { !authContextHook.isUserLogged ? 
                <AddUserCart onDismiss={props.onDismiss} /> : 
                authContextHook.cart.length === 0 ? 
                    <EmptyCart onDismiss={props.onDismiss} /> :
                    <OrderCart onDismiss={props.onDismiss} cart={authContextHook.cart}/> 
            }
        </div>
    );
}

function EmptyCart(props) {
    return (
        <div className='EmptyCart'>
            <img className='State' src={ EmptyCartState } alt='Cart is empty' />
            <p>Your shopping cart is empty.<br/>Try adding some items first.</p>
            <button onClick={props.onDismiss}>
                <SlideEffect height='1rem'>Back to browse</SlideEffect>
            </button>
        </div>
    );
}

function AddUserCart(props) {

    const authContextHook = useContext(AuthContext);

    return (
        <div className='AddUserCart'>
            <img className='State' src={ AddUserState } alt='Add user' />
            <p>To use the shopping cart, you must sign in on this site first.</p>
            <button onClick={props.onDismiss}>
                <SlideEffect height='1rem'>Back to browse</SlideEffect>
            </button>
        </div>
    );
}

function OrderCart(props) {

    const [total, setTotal] = useState(0);
    const authContextHook = useContext(AuthContext);

    const calcTotal = async () => {
        let total = 0
        if(authContextHook.menu.length === 0){   
            authContextHook.getMenu();   
            return;
        }
        console.log("Menu:");
        for(let j=0; j<props.cart.length; j++){
            for(let i=0; i<authContextHook.menu.length; i++){
                if(authContextHook.menu[i]._id === props.cart[j]._id){
                    total += authContextHook.menu[i].price * props.cart[j].amount;
                }
            }
        }
        setTotal(total);
    }

    const onClickPlaceOrder = () => {
        const host = process.env.REACT_APP_API_HOST
        axios.post(`http://${host}/api/orders/`, {}, {withCredentials: true}).then((response) => {
            props.onDismiss();
        }).catch((error) => {
            alert(error);
        });
    }

    // calculate the total amount if the menu is ready of as soon as it is ready, or when the cart changes
    useEffect(() => {
        calcTotal();
    }, [authContextHook.menu, authContextHook.cart]);

    return (
        <div className='OrderCart'>
            <div className='List'>
                {props.cart.map((item, i) => <CartItem key={i} item={authContextHook.menu.length > 0 ? 
                    authContextHook.menu.filter((product, i) => product._id === item._id)[0]: null} amount={item.amount} />) /** TODO: Pass props */}
            </div>
            <div className='Summary'>
                <p>Total</p>
                <h4>{total.toFixed(2)} €</h4>
            </div>
            <button onClick={onClickPlaceOrder}>
                <SlideEffect height='1rem'>Place order</SlideEffect>
            </button>
        </div>
    );
}

function CartItem(props) {

    const authContextHook = useContext(AuthContext);

    const deleteCartItem = () => {
        const host = process.env.REACT_APP_API_HOST
        axios.delete(`http://${host}/api/orders/cart/${props.item._id}`, {withCredentials: true}).then((response) => {
            authContextHook.getCart();
        }).catch(error => {
            alert(error);
        });
    }

    return (
        <div className='Item'>
            <div className='IconPreview'>
                <img src={props.item != null ? props.item.image : ''} alt='Preview' /> {/** Replace with item.icon */}
                <div className='Amount button'>{props.amount}</div> {/** Replace with item.amount */}
            </div>
            <div className='Description'>
                <p className='Title'>{props.item != null ? props.item.name : ''}</p>
                <p className='Price caption'>{`${props.item != null ? props.item.price : ''} €`}</p>
            </div>
            <button className='Tertiary RemoveItem' onClick={deleteCartItem}>
                <SlideEffect height='1.5rem'>
                    <Delete />
                </SlideEffect>
            </button>
        </div>
    );
}

export { CartView };