import './Header.css';
import { AccountCircle, ShoppingCart } from '../icon/Icon';
import { Logo } from '../logo/Logo';
import { Link, SlideEffect } from '../link/Link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PopupMenu } from '../popupmenu/PopupMenu';
import { ShoppingCartView } from '../shoppingcartview/ShoppingCartView';

function Header(props) {
    const [showPopupMenu, setShowPopupMenu] = useState(false);
    const [showShoppingCart, setShowShoppingCart] = useState(false);
    const [isUserLogged, setIsUserLogged] = useState(false);
    const [to, setTo] = useState('/user/login');

    const checkAuthentication = () => {
        axios.get('http://localhost:3001/api/user/authenticated',{
            withCredentials: true, 
        }).then(
            (response) => {
                if(response.status === 200){
                    setIsUserLogged(true);
                    setTo(null)
                }
            }
        ).catch((reason) => console.log(reason));
    }

    const logout = () => {
        axios.get('http://localhost:3001/api/user/logout/', {withCredentials: true}).then((response) => {
            if(response.status == 200){
                setIsUserLogged(false);
                setTo('/user/login/');
            }
        })
    }

    useEffect(checkAuthentication, []);

    const defaultItems = [
        { 'title': 'My Account', 'onClick': null },
        { 'title': 'My Orders', 'onClick': null },
        { 'title': 'Logout', 'onClick': logout }
    ]

    return (
        <div className='HeaderContainer'>
            <header>
                <div className='Main'>
                    <Logo />
                    <div className='More'>
                        <Link onClick={() => {
                            console.log('Showing cart');
                            setShowShoppingCart(true)
                            }}>
                            <SlideEffect height='24px'>
                                <ShoppingCart id='cart' />
                            </SlideEffect>
                        </Link>
                        <Link to={to} onClick={() => {
                            if(isUserLogged){
                                console.log('Showing menu');
                                setShowPopupMenu(true);
                            }
                            }}>
                            <SlideEffect height='24px'>
                                <AccountCircle id='account' />
                            </SlideEffect>
                        </Link>
                    </div>
                </div>
                <nav className='Navigation'>
                    <div className='NavItem'>
                        <Link>
                            <SlideEffect height='1rem'>Home</SlideEffect>
                        </Link>
                    </div>
                    <div className='NavItem'>
                        <Link>
                            <SlideEffect height='1rem'>Menu</SlideEffect>
                        </Link>
                    </div>
                    <div className='NavItem'>
                        <Link>
                            <SlideEffect height='1rem'>About us</SlideEffect>
                        </Link>
                    </div>
                </nav>
            </header>
            <PopupMenu isVisible={showPopupMenu} onDismiss={() => setShowPopupMenu(false)} menuItems={defaultItems} />
            <ShoppingCartView isVisible={showShoppingCart} onDismiss={() => setShowShoppingCart(false)} />
        </div>
    );
}

export { Header };