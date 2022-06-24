import './Menu.css';
import './FoodCategories.css';
import './ProductItem.css';

import { useContext, useEffect, useState } from 'react';
import { FloatingActionButton } from '../../floatingactionbutton/FloatingActionButton';
import { Footer } from '../../footer/Footer';
import { Header } from '../../header/Header';
import { Add, Delete, Edit, ShoppingCart } from '../../icon/Icon';
import { SlideEffect } from '../../link/Link';
import { AuthContext } from '../../../App';
import { NewProductView } from '../../newproductview/NewProductView';
import axios from 'axios';

export const FOOD_TYPES = ['burger', 'pizza', 'salad', 'french-fries', 'drink', 'dessert'];

function Menu() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isNewProductVisible, setIsNewProductVisible] = useState(false);

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
            <Header />
            <div className='Content'>
                <hgroup>
                    <h1>Explore<br/>Our Menu</h1>
                </hgroup>
                <FoodCategories activeIndex={activeIndex} onItemClick={(index) => setActiveIndex(index)} />
                <div id='menuGrid'>
                    {menu.map((product, i) => {
                        if(FOOD_TYPES.indexOf(product.type) === activeIndex){
                            return <ProductItem product={product} isAdmin={isAdmin} refreshMenuCallback={getMenu}/>
                        }
                    })}
                </div>
                {isAdmin ? 
                    <FloatingActionButton id='addFoodButton' onClick={() => setIsNewProductVisible(true)}>
                        <SlideEffect height='1.5rem'>
                            <Add />
                        </SlideEffect>
                    </FloatingActionButton> : null }
            </div>
            <Footer />
            {isAdmin ? 
                    <NewProductView uploadCallback={() => {
                        getMenu();
                        setIsNewProductVisible(false);
                    }} isVisible={isNewProductVisible} onDismiss={() => setIsNewProductVisible(false)} /> : null }
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

    const deleteProduct = () => {
        const host = process.env.REACT_APP_API_HOST;
        axios.delete(`http://${host}/api/products/${props.product._id}`).then((response) => {
            props.refreshMenuCallback();
        }).catch((error) => {
            alert(error);
        });
    }

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
                <button className='Tertiary' onClick={deleteProduct}>
                    <SlideEffect height='1.5rem'>
                        <Delete />
                    </SlideEffect>
                </button> : null}
            </div>
        </div>
    );
}

export { Menu };