import './ProductCategories.css'
import { SlideEffect } from '../link/Link';
import { FOOD_TYPES } from '../routes/menu/Menu';

// This component returns a list of Chips components
// which represent the food categories.
// By clicking on them we change the category.
function ProductCategories(props) {
    let activeIndex = props.activeIndex ?? 0;
    return (
        <div className='ProductCategories'>
            {FOOD_TYPES.map((item, i) => 
                <div className={'Chip' + (activeIndex === i ? ' Active' : '')} key={item} onClick={() => props.onItemClick(i)}>
                    <SlideEffect className='button' height='1rem'>{item}</SlideEffect>
                </div>)}
        </div>
    );
}

export { ProductCategories };