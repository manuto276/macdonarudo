import './Menu.css';
import './FoodCategories.css';
import './ProductItem.css';

import bbq from '../../../resources/images/bbq.png';

import { useContext, useState } from 'react';
import { FloatingActionButton } from '../../floatingactionbutton/FloatingActionButton';
import { Footer } from '../../footer/Footer';
import { Header } from '../../header/Header';
import { Add, Delete, Edit, ShoppingCart } from '../../icon/Icon';
import { SlideEffect } from '../../link/Link';
import { AuthContext } from '../../../App';
import { NewProductView } from '../../newproductview/NewProductView';

export const FOOD_TYPES = ['Burgers', 'Pizzas', 'Salads', 'French Fries', 'Drinks', 'Desserts'];

function Menu() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isNewProductVisible, setNewProductVisible] = useState(false);

    const authContextHook = useContext(AuthContext);
    let isAdmin = authContextHook.role === 'admin';

    // testing 
    isAdmin = false;

    return (
        <section id='menu'>
            <Header />
            <div className='Content'>
                <hgroup>
                    <h1>Explore<br/>Our Menu</h1>
                </hgroup>
                <FoodCategories activeIndex={activeIndex} onItemClick={(index) => setActiveIndex(index)} />
                <div id='menuGrid'>
                </div>
                {isAdmin ? 
                    <FloatingActionButton id='addFoodButton' onClick={() => setNewProductVisible(true)}>
                        <SlideEffect height='1.5rem'>
                            <Add />
                        </SlideEffect>
                    </FloatingActionButton> : null }
            </div>
            <Footer />
            {isAdmin ? 
                    <NewProductView isVisible={isNewProductVisible} onDismiss={() => setNewProductVisible(false)} /> : null }
        </section>
    );
}

// This function returns a list of Chips components
// which represent the food categories.
// By clicking on them we change the category.
function FoodCategories(props) {
    let activeIndex = props.activeIndex ?? 0;
    return (
        <div className='FoodCategories'>
            {FOOD_TYPES.map((item, i) => 
                <div className={'Chip' + (activeIndex == i ? ' Active' : '')} onClick={() => props.onItemClick(i)}>
                    <SlideEffect className='button' height='1rem'>{item}</SlideEffect>
                </div>)}
        </div>
    );
}

function ProductItem(props) {
    return (
        <div className='ProductItem'>
            <div className='ProductIcon'>
                <img src={props.icon} alt={props.title} />
            </div>
            <div className='ProductDesc'>
                <h6>{props.title}</h6>
                <p>{props.price}</p>
            </div>
            <div className='Actions'>
                <button>
                    <SlideEffect height='1.5rem'>
                        <ShoppingCart />
                    </SlideEffect>
                </button>
                {props.isAdmin ? 
                <button className='Tertiary'>
                    <SlideEffect height='1.5rem'>
                        <Edit />
                    </SlideEffect>
                </button> : null}
                {props.isAdmin ? 
                <button className='Tertiary'>
                    <SlideEffect height='1.5rem'>
                        <Delete />
                    </SlideEffect>
                </button> : null}
            </div>
        </div>
    );
}

export { Menu };