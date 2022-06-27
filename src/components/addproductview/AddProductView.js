import './AddProductView.css';
import { useState, useContext } from 'react';
import { Close } from '../icon/Icon';
import { Link, SlideEffect } from '../link/Link';
import { FOOD_TYPES } from '../routes/menu/Menu';
import axios from 'axios';
import { AuthContext } from '../../App';

import AddImageState from '../../resources/add-photo.svg';

function AddProductView(props) {
    const [image, setImage] = useState(props.icon ?? '');

    const authContextHook = useContext(AuthContext);

    const uploadProduct = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const type = formData.get('type');
        const price = formData.get('price');
        if(name.length === 0 || type.length === 0 || price <= 0 || image.length === 0){
            return;
        }
        const host = process.env.REACT_APP_API_HOST;
        axios.post(`http://${host}/api/products/`, {
            name: name,
            type: type,
            price: price,
            image: image
        }, {withCredentials: true}).then((response) => {
            authContextHook.getMenu();
            props.onDismiss();
        }).catch((error) => {
            alert(error);
        });
    }

    const showImage = async (event) => {
        const file = event.target.files[0];
        const base64 = await imageToBase64(file);
        setImage(base64);
    };
      
    const imageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
        
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
        
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return (
        <div id='addProductView'>
            <button className='Tertiary CloseButton' onClick={props.onDismiss}>
                <SlideEffect height='1.5rem'>
                    <Close />
                </SlideEffect>
            </button>
            <div className='PreviewContainer'>
                <Link onClick={() => {
                    const input = document.getElementById('icon-input');
                    input.click();
                }}>
                    <img id='preview' src={image !== '' ? image : AddImageState} alt='Product' />
                </Link>
                <p>Tap to add a photo</p>
            </div>
            <form id='newProductForm' onSubmit={uploadProduct}>
                <input style={{display: 'none'}} id='icon-input' onChange={(event) => showImage(event)} type='file' accept='image/png' required />
                <input id='name' type='text' name='name' value={props.name ?? null} placeholder='Product Name' required />
                <select id='category' type='text' name='type' value={props.category ?? null} required>
                        {FOOD_TYPES.map((item, i) => <option>{item}</option>)}
                </select>
                <input id='price' type='number' min='0.50' step='0.01' name='price' value={props.price ?? null} placeholder='Price' required />
                <button id='addProductButton' type='submit' form='newProductForm'>
                    <SlideEffect height='1rem'>{props.edit ? 'Edit Product' : 'Add Product'}</SlideEffect>
                </button>
            </form>
        </div>
    );
}

export { AddProductView };