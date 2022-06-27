import '../State.css';

import NoProductsState from '../../../resources/states/no-products.svg';

function NoProductsError() {
    return (
        <div className='State'>
            <img className='Icon' src={NoProductsState} alt='No Products' />
            <p>We're sorry, there are no products for this category yet.</p>
        </div>
    );
}

export { NoProductsError };