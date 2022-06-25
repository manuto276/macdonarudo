import './Menu.css';
import './FoodCategories.css';
import './ProductItem.css';

import { useContext, useEffect, useState } from 'react';
import { FloatingActionButton } from '../../floatingactionbutton/FloatingActionButton';
import { Add, Delete, Edit, ShoppingCart } from '../../icon/Icon';
import { SlideEffect } from '../../link/Link';
import { AuthContext } from '../../../App';
import axios from 'axios';

export const FOOD_TYPES = ['burger', 'pizza', 'salad', 'french-fries', 'drink', 'dessert'];

function Menu(props) {
    const [activeIndex, setActiveIndex] = useState(0);

    const authContextHook = useContext(AuthContext);
    let isAdmin = authContextHook.role === 'admin';

    const [menu, setMenu] = useState([]);

    const getMenu = () => {
        const host = process.env.REACT_APP_API_HOST;
        axios.get(`http://${host}/api/products/`).then((response) => {
            setMenu(response.data);            
        }).catch((error) => {
            alert(error);
        });
    }

    useEffect(() => {
        getMenu();
    }, []);

    return (
        <section id='menu'>
            <div className='Content'>
                <hgroup>
                    <h1>Explore<br/>Our Menu</h1>
                </hgroup>
                <FoodCategories activeIndex={activeIndex} onItemClick={(index) => setActiveIndex(index)} />
                <div id='menuGrid'>
                    {menu.map((product, i) => {
                        if(FOOD_TYPES.indexOf(product.type) === activeIndex){
                            return <ProductItem 
                                product={product} 
                                isAdmin={isAdmin} 
                                refreshMenuCallback={getMenu}
                                onDelete={() => this.props.onDeleteClick(product._id, product.name)} />
                        }
                    })}
                </div>
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

// This function returns a list of Chips components
// which represent the food categories.
// By clicking on them we change the category.
function FoodCategories(props) {
    let activeIndex = props.activeIndex ?? 0;
    return (
        <div className='FoodCategories'>
            {FOOD_TYPES.map((item, i) => 
                <div className={'Chip' + (activeIndex == i ? ' Active' : '')} key={item} onClick={() => props.onItemClick(i)}>
                    <SlideEffect className='button' height='1rem'>{item}</SlideEffect>
                </div>)}
        </div>
    );
}

function ProductItem(props) {
    return (
        <div className='ProductItem'>
            <div className='ProductIcon'>
                <img src={props.icon} alt={props.product.name} />
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