import './DeleteProductView.css';
import { Close } from '../icon/Icon';
import { SlideEffect } from '../link/Link';
import axios from 'axios';

function DeleteProductView(props) {
    const deleteProduct = () => {
        const host = process.env.REACT_APP_API_HOST;
        axios.delete(`http://${host}/api/products/${props.productId}`).then((response) => {
            props.refreshMenuCallback();
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
                <button id='deleteProductButton' type='submit'>
                    <SlideEffect height='1rem'>Delete Product</SlideEffect>
                </button>
            </form>
        </div>
    );
}

export { DeleteProductView };