import { useEffect } from 'react';
import { Close, OutlinedPhotoLibrary } from '../icon/Icon';
import { SlideEffect } from '../link/Link';
import './NewProductView.css';

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
            <div id='newProductImage'>
                { image == null ? <OutlinedPhotoLibrary size='4rem' color='var(--pale-silver)' /> : null}
            </div>
            <form id='newProductForm'>
                <input id='newProductName' type='text' placeholder='Product Name' />
                <input id='newProductCategory' type='text' placeholder='Category' />
                <input id='newProductPrice' type='text' placeholder='Price' />
                <button id='addProductButton' type='submit' form='newProductForm'>
                    <SlideEffect height='1rem'>Add Product</SlideEffect>
                </button>
            </form>
        </div>
        </div>
    );
}

export { NewProductView };