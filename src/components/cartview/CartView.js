import './CartView.css';

import EmptyCartState from '../../resources/empty-cart.svg';
import AddUserState from '../../resources/add-user.svg';

import { SlideEffect } from '../link/Link';
import { Close } from '../icon/Icon';
import { AuthContext } from '../../App';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

function CartView(props) {
    const authContextHook = useContext(AuthContext);

    return (
        <div id='cartView'>
            <button className='Tertiary CloseButton' onClick={props.onDismiss}>
                <SlideEffect height='1.5rem'>
                    <Close />
                </SlideEffect>
            </button>
            { !authContextHook.isUserLogged ? 
                <AddUserCart onDismiss={props.onDismiss} /> : 
                props.list == null || props.list.length === 0 ? 
                    <EmptyCart onDismiss={props.onDismiss} /> : <div /> 
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

export { CartView };