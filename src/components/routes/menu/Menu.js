import './Menu.css';
import { useContext, useState } from 'react';
import { FloatingActionButton } from '../../floatingactionbutton/FloatingActionButton';
import { Footer } from '../../footer/Footer';
import { Header } from '../../header/Header';
import { Add } from '../../icon/Icon';
import { SlideEffect } from '../../link/Link';
import { AuthContext } from '../../../App';
import { NewProductView } from '../../newproductview/NewProductView';

const FOOD_TYPES = ['Burgers', 'Pizzas', 'Salads', 'French Fries', 'Drinks', 'Desserts'];

function Menu() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isNewProductVisible, setNewProductVisible] = useState(false);

    const authContextHook = useContext(AuthContext);
    let isAdmin = authContextHook.role === 'admin';

    // testing 
    isAdmin = true;

    return (
        <section id='menu'>
            <Header />
            <div className='Content'>
                <hgroup>
                    <h1>Explore<br/>Our Menu</h1>
                </hgroup>
                <FoodTypeList activeIndex={activeIndex} onItemClick={(index) => setActiveIndex(index)} />
                <div className='MenuGrid'></div>
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
function FoodTypeList(props) {
    let activeIndex = props.activeIndex ?? 0;
    return (
        <div className='FoodTypeList'>
            {FOOD_TYPES.map((item, i) => 
                <div className={'Chip' + (activeIndex == i ? ' Active' : '')} onClick={() => props.onItemClick(i)}>
                    <SlideEffect className='button' height='1rem'>{item}</SlideEffect>
                </div>)}
        </div>
    );
}

export { Menu };