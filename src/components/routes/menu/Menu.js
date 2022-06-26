import './Menu.css';
import './FoodCategories.css';

import NoProductState from '../../../resources/no-products.svg';

import { useContext, useEffect, useState } from 'react';
import { FloatingActionButton } from '../../floatingactionbutton/FloatingActionButton';
import { Add, Delete, Edit, ShoppingCart } from '../../icon/Icon';
import { SlideEffect } from '../../link/Link';
import { AuthContext } from '../../../App';
import { EditableProduct, Product } from '../../product/Product';
import axios from 'axios';

export const FOOD_TYPES = ['burger', 'pizza', 'salad', 'french-fries', 'drink', 'dessert'];

function Menu(props) {
    const [category, setCategory] = useState(0);

    const authContextHook = useContext(AuthContext);
    let isAdmin = authContextHook.role === 'admin';

    useEffect(() => {
        authContextHook.getMenu();
    }, []);

    const menuSubset = createMenuSubset(authContextHook.menu, category);

    return (
        <section id='menu'>
            <div className='Content'>
                <hgroup>
                    <h1>Explore<br/>Our Menu</h1>
                </hgroup>
                <FoodCategories activeIndex={category} onItemClick={(index) => setCategory(index)} />
                {
                    // If the menu has items for the current category,
                    // then show a grid of items for those items.
                    // Otherwise we shall show an empty state illustration.
                    menuSubset.length > 0 ?
                    <div id='menuGrid'>{
                        authContextHook.menu.map((product, i) => {
                            if(FOOD_TYPES.indexOf(product.type) === category){
                                return !isAdmin ? 
                                    <Product id={product._id} icon={product.image} name={product.name} price={product.price} /> : 
                                    <EditableProduct id={product._id} icon={product.image} name={product.name} price={product.price} onDelete={() => props.onDeleteClick(product._id, product.name)} />
                                /*return <ProductItem 
                                    product={product} 
                                    isAdmin={isAdmin} 
                                    refreshMenuCallback={authContextHook.getMenu}
                                    onDelete={() => props.onDeleteClick(product._id, product.name)} />*/
                            }
                            return null;
                        })}
                    </div> : 
                    <EmptyMenuList />
                }
                {isAdmin ? 
                    <FloatingActionButton id='addFoodButton' onClick={props.onAddClick}>
                        <SlideEffect height='1.5rem'>
                            <Add />
                        </SlideEffect>
                    </FloatingActionButton> : null }
            </div>
        </section>
    );
}

function createMenuSubset(menu, category) {
    if (menu === null || menu.length === 0)
        return [];
    
    return menu.filter((item) => FOOD_TYPES.indexOf(item.type) === category);
}

function EmptyMenuList() {
    return (
        <div className='EmptyMenuList'>
            <img className='State' src={NoProductState} alt='Empty Menu State' />
            <p>Looks like there are no items for this category yet.</p>
        </div>
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
                <div className={'Chip' + (activeIndex === i ? ' Active' : '')} key={item} onClick={() => props.onItemClick(i)}>
                    <SlideEffect className='button' height='1rem'>{item}</SlideEffect>
                </div>)}
        </div>
    );
}

function ProductItem(props) {
    return (
        <div className='ProductItem'>
            <div className='ProductIcon'>
                <img src={props.product.image} alt={props.product.name} />
            </div>
            <div className='ProductDesc'>
                <h6>{props.product.name}</h6>
                <p>{`${props.product.price} €`}</p>
            </div>
            <div className='Actions'>
                <button>
                    <SlideEffect height='1.5rem'><ShoppingCart /></SlideEffect>
                </button>
                {props.isAdmin ? 
                <button className='Tertiary'>
                    <SlideEffect height='1.5rem' onClick={props.onEdit}><Edit /></SlideEffect>
                </button> : null}
                {props.isAdmin ? 
                <button className='Tertiary' onClick={props.onDelete}>
                    <SlideEffect height='1.5rem'>
                        <Delete />
                    </SlideEffect>
                </button> : null}
            </div>
        </div>
    );
}

export { Menu };