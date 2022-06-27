import './Menu.css';
import './FoodCategories.css';

import { NoProductsError } from '../../states/noproductserror/NoProductsError';

import { useContext, useEffect, useState } from 'react';
import { FloatingActionButton } from '../../floatingactionbutton/FloatingActionButton';
import { Add } from '../../icon/Icon';
import { SlideEffect } from '../../link/Link';
import { AuthContext } from '../../../App';
import { EditableProduct, Product } from '../../product/Product';

export const FOOD_TYPES = ['burger', 'pizza', 'salad', 'french-fries', 'drink', 'dessert'];

function Menu(props) {
    const [category, setCategory] = useState(0);

    const authContextHook = useContext(AuthContext);
    let isAdmin = authContextHook.role === 'admin';

    useEffect(() => {
        authContextHook.getMenu();
    }, [authContextHook]);

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
                    </div> : <NoProductsError />
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

export { Menu };