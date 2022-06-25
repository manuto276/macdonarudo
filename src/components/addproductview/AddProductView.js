import './AddProductView.css';
import { useState, useContext } from 'react';
import { Close } from '../icon/Icon';
import { SlideEffect } from '../link/Link';
import { FOOD_TYPES } from '../routes/menu/Menu';
import axios from 'axios';
import { AuthContext } from '../../App';

function AddProductView(props) {
    const [productName, setproductName] = useState('');
    const [productType, setProductType] = useState('burger');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');

    const authContextHook = useContext(AuthContext);

    const uploadProduct = () => {
        const host = process.env.REACT_APP_API_HOST;
        axios.post(`http://${host}/api/products/`, {
            name: productName,
            type: productType,
            price: price,
            image: image
        }).then((response) => {
            authContextHook.setMenu(response);
        }).catch((error) => {
            alert(error);
        });
    }

    const showImage = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        setImage(base64);
      };
      
    const convertBase64 = (file) => {
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
            <h5>Create a product.</h5>
            <p>Fill the form below to create a new menu product.</p>
            <img src={image} style={{width: '100px', height: '100px'}}></img>
            <form id='newProductForm'>
                <input id='name' type='text' value={productName} onChange={e => setproductName(e.target.value)} placeholder='Product Name' required />
                <select id='category' type='text' value={productType} onChange={e => setProductType(e.target.value)} required>
                        {FOOD_TYPES.map((item, i) => <option>{item}</option>)}
                </select>
                <input id='price' type='number' value={price} onChange={e => setPrice(e.target.value)} placeholder='Price' required />
                <input id='icon' onChange={(event) => showImage(event)} type='file' accept='image/png' required />
                <button id='addProductButton' type='submit' onClick={e => {
                    e.preventDefault();
                    uploadProduct();
                    props.onDismiss();
                }} form='newProductForm'>
                    <SlideEffect height='1rem'>Add Product</SlideEffect>
                </button>
            </form>
        </div>
    );
}

export { AddProductView };