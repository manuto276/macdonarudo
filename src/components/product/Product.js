import { useState, useContext, Fragment } from 'react';
import { Add, Delete, Edit, Remove } from '../icon/Icon';
import { SlideEffect } from '../link/Link';
import './Product.css';
import axios from 'axios';import { AuthContext } from '../../App';


function Product(props) {
    const [quantity, setQuantity] = useState(1);
    const authContextHook = useContext(AuthContext);

    const addToCart = () => {
        const host = process.env.REACT_APP_API_HOST;
        axios.post(`http://${host}/api/orders/cart/`, [{
            _id: props.id,
            amount: quantity
        }],{withCredentials: true}).then((response) => {
            setQuantity(1);
            alert(`${quantity} ${props.name} added to cart.`)
        });
    }

    return (
        <div className='Product'>
            <ProductHead icon={props.icon} name={props.name} price={props.price} />
            {authContextHook.role === 'customer' || authContextHook.role == null ?
            <Fragment>
                <div className='QuantitySelector'>
                    <button className='Tertiary' onClick={() => {
                        if (quantity === 1)
                            return;
                        setQuantity(quantity - 1);
                    }}>
                        <SlideEffect height='1.5rem'><Remove /></SlideEffect>
                    </button>
                    <button className='Tertiary'>
                        <SlideEffect className='button' height='1rem'>{quantity}</SlideEffect>
                    </button>
                    <button className='Tertiary' onClick={() => {
                        if (quantity === 20)
                        setQuantity(quantity + 1);
                    }}>
                        <SlideEffect height='1.5rem'><Add /></SlideEffect>
                    </button>
                </div>
                
                <button id='addToCartButton' onClick={addToCart}>
                    <SlideEffect className='button' height='1rem'>Add to cart</SlideEffect>
                </button>
            </Fragment>
            : null}
        </div>
    );
}

function EditableProduct(props) {
    return (
        <div className='Product'>
            <ProductHead icon={props.icon} name={props.name} price={props.price} />
            <div className='Actions'>
                <button className='Tertiary' onClick={props.onEdit}>
                    <SlideEffect height='1.5rem'><Edit /></SlideEffect>
                </button>
                <button className='Tertiary' onClick={props.onDelete}>
                    <SlideEffect height='1.5rem'>
                        <Delete />
                    </SlideEffect>
                </button>
            </div>
        </div>
    );
}

function ProductHead(props) {
    return (
        <div className='ProductHead'>
            <div className='Icon'>
                <img src={props.icon} alt={props.name} />
            </div>
            <div className='Description'>
                <h6>{props.name}</h6>
                <p>{`${props.price} €`}</p>
            </div>
        </div>
    );
}

export { Product, EditableProduct };