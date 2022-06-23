import { useState } from 'react';
import { FloatingActionButton } from '../../floatingactionbutton/FloatingActionButton';
import { Footer } from '../../footer/Footer';
import { Header } from '../../header/Header';
import { Add } from '../../icon/Icon';
import { SlideEffect } from '../../link/Link';
import './Menu.css';

const FOOD_TYPES = ['Burgers', 'Pizzas', 'Salads', 'French Fries', 'Drinks', 'Desserts'];

function Menu() {
    const [activeIndex, setActiveIndex] = useState(0);

    // TODO: Update this bool whether the user is an admin or not.
    let isAdmin = true; // Testing value

    return (
        <section id='menu'>
            <Header />
            <div className='Content'>
                <hgroup>
                    <h1>Explore<br/>Our Menu</h1>
                </hgroup>
                <FoodTypeList activeIndex={activeIndex} onItemClick={(index) => setActiveIndex(index)} />
                <div className='Grid'></div>
                {isAdmin ? 
                    <FloatingActionButton id='add-food'>
                        <SlideEffect height='1.5rem'>
                            <Add />
                        </SlideEffect>
                    </FloatingActionButton> : null }
            </div>
            <Footer />
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
                <div className={'Chip' + (activeIndex == i ? ' Active' : '')} onClick={() => props.onItemClick(i)}>{item}</div>)}
        </div>
    );
}

export { Menu };