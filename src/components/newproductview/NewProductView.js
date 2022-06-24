import './NewProductView.css';
import { useEffect, useState } from 'react';
import { Close, OutlinedPhotoLibrary } from '../icon/Icon';
import { SlideEffect } from '../link/Link';
import { FOOD_TYPES } from '../routes/menu/Menu';
import axios from 'axios';

function NewProductView(props) {

    useEffect(() => {
        if (props.isVisible)
            document.body.style.overflow = 'hidden';
        else
            document.body.style.overflow = 'initial';
    });

    const [productName, setproductName] = useState('');
    const [productType, setProductType] = useState('burger');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState(null);

    const uploadProduct = () => {
        const host = process.env.REACT_APP_API_HOST;
        axios.post(`http://${host}/api/products/`, {
            name: productName,
            type: productType,
            price: price,
            image: image
        }).then((response) => {
            props.uploadCallback();
        }).catch((error) => {
            alert(error);
        });
    }

    return (
        <div className={'NewProductView' + (props.isVisible ? ' Visible' : '')}>
        <div className='Overlay' onClick={props.onDismiss}></div>
        <div className='MainView'>
            <button className='Tertiary CloseButton' onClick={props.onDismiss}>
                <SlideEffect height='1.5rem'>
                    <Close />
                </SlideEffect>
            </button>
            <h5>Create a product.</h5>
            <p>Fill the form below to create a new menu product.</p>
            <form id='newProductForm'>
                <input id='name' type='text' value={productName} onChange={e => setproductName(e.target.value)} placeholder='Product Name' required />
                <select id='category' type='text' value={productType} onChange={e => setProductType(e.target.value)} required>
                        {FOOD_TYPES.map((item, i) => <option>{item}</option>)}
                </select>
                <input id='price' type='number' value={price} onChange={e => setPrice(e.target.value)} placeholder='Price' required />
                <input id='icon' onChange={(event) => {
                    console.log(event.target.files[0]);
                    setImage(event.target.files[0]);
                }} type='file' accept='image/png' required />
                <button id='addProductButton' type='submit' onClick={e => {
                    e.preventDefault();
                    uploadProduct();
                }} form='newProductForm'>
                    <SlideEffect height='1rem'>Add Product</SlideEffect>
                </button>
            </form>
        </div>
        </div>
    );
}

export { NewProductView };