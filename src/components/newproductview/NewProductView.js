import './NewProductView.css';
import { useEffect } from 'react';
import { Close, OutlinedPhotoLibrary } from '../icon/Icon';
import { SlideEffect } from '../link/Link';
import { FOOD_TYPES } from '../routes/menu/Menu';

function NewProductView(props) {
    let image = null;

    useEffect(() => {
        if (props.isVisible)
            document.body.style.overflow = 'hidden';
        else
            document.body.style.overflow = 'initial';
    });

    return (
        <div className={'NewProductView' + (props.isVisible ? ' Visible' : '')}>
        <div className='Overlay' onClick={props.onDismiss}></div>
        <div className='MainView'>
            <button className='Tertiary CloseButton' onClick={props.onDismiss}>
                <SlideEffect height='1.5rem'>
                    <Close />
                </SlideEffect>
            </button>
            <form id='newProductForm'>
                <input id='name' type='text' placeholder='Product Name' />
                <select id='category' type='text' required>
                        {FOOD_TYPES.map((item, i) => <option>{item}</option>)}
                </select>
                <input id='price' type='number' placeholder='Price' />
                <input id='icon' type='file' />
                <button id='addProductButton' type='submit' form='newProductForm'>
                    <SlideEffect height='1rem'>Add Product</SlideEffect>
                </button>
            </form>
        </div>
        </div>
    );
}

export { NewProductView };