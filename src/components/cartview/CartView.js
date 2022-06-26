import './CartView.css';

import EmptyCartState from '../../resources/empty-cart.svg';
import AddUserState from '../../resources/add-user.svg';

import { SlideEffect } from '../link/Link';
import { Close, Delete } from '../icon/Icon';
import { AuthContext } from '../../App';
import { useContext } from 'react';

import bbq from '../../resources/images/bbq.png';

function CartView(props) {
    const authContextHook = useContext(AuthContext);

    return (
        <div id='cartView'>
            <button className='Tertiary CloseButton' onClick={props.onDismiss}>
                <SlideEffect height='1.5rem'>
                    <Close />
                </SlideEffect>
            </button>
            { /*!authContextHook.isUserLogged ? 
                <AddUserCart onDismiss={props.onDismiss} /> : 
                props.list == null || props.list.length === 0 ? 
                    <EmptyCart onDismiss={props.onDismiss} /> : */
                    <OrderCart onDismiss={props.onDismiss} /> 
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
    let list = [];
    let total = 0;

    return (
        <div className='OrderCart'>
            <div className='List'>
                {list.map((item) => <CartItem />) /** TODO: Pass props */}
            </div>
            <div className='Summary'>
                <p>Total</p>
                <h4>{total} €</h4>
            </div>
            <button onClick={props.onDismiss}>
                <SlideEffect height='1rem'>Place order</SlideEffect>
            </button>
        </div>
    );
}

function CartItem(props) {
    return (
        <div className='Item'>
            <div className='IconPreview'>
                <img src={bbq} alt='Preview' /> {/** Replace with item.icon */}
                <div className='Amount button'>{1024}</div> {/** Replace with item.amount */}
            </div>
            <div className='Description'>
                <p className='Title'>McChicken BBQ</p>
                <p className='Price caption'>3.99 €</p>
            </div>
            <button className='Tertiary RemoveItem'>
                <SlideEffect height='1.5rem'>
                    <Delete />
                </SlideEffect>
            </button>
        </div>
    );
}

export { CartView };