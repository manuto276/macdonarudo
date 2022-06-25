import './DeleteProductView.css';
import { Close } from '../icon/Icon';
import { SlideEffect } from '../link/Link';
import axios from 'axios';
import { AuthContext } from '../../App';
import { useContext } from 'react';

function DeleteProductView(props) {


    const authContextHook = useContext(AuthContext);

    const deleteProduct = () => {
        const host = process.env.REACT_APP_API_HOST;
        axios.delete(`http://${host}/api/products/${props.productId}`).then((response) => {
            authContextHook.getMenu();
        }).catch((error) => {
            alert(error);
        });
    }

    return (
        <div id='deleteProductView'>
            <button className='Tertiary CloseButton' onClick={props.onDismiss}>
                <SlideEffect height='1.5rem'>
                    <Close />
                </SlideEffect>
            </button>
            <h5>Delete product.</h5>
            <p>Are you sure you want to delete {props.productName} from the menu?</p>
            <form id='deleteProductForm'>
                <button id='deleteProductButton' type='submit' onClick={(event) => {
                    event.preventDefault();
                    deleteProduct();
                    props.onDismiss();
                }}>
                    <SlideEffect height='1rem'>Delete Product</SlideEffect>
                </button>
            </form>
        </div>
    );
}

export { DeleteProductView };