import './ShoppingCartView.css';

import EmptyCartState from '../../resources/mt-cart-state.svg';
import { SlideEffect } from '../link/Link';
import { Close } from '../icon/Icon';

function ShoppingCartView(props) {
    return (
        <div className={'ShoppingCart' + (props.isVisible ? ' Visible' : '')}>
            <div className='Overlay' onClick={props.onDismiss}></div>
            <div className='Cart'>
                <button className='Tertiary CloseButton' onClick={props.onDismiss}>
                    <SlideEffect height='1.5rem'>
                        <Close />
                    </SlideEffect>
                </button>
                { props.list == null || props.list.length == 0 ? <EmptyCart onDismiss={props.onDismiss} /> : <div /> }
            </div>
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

export { ShoppingCartView };