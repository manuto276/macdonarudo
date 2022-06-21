import './Header.css';
import { AccountCircle, ShoppingCart } from '../icon/Icon';
import { Logo } from '../logo/Logo';
import { Link, SlideEffect } from '../link/Link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PopupMenu } from '../popupmenu/PopupMenu';

function Header(props) {
    const [showPopupMenu, setShowPopupMenu] = useState(false);
    const [isUserLogged, setIsUserLogged] = useState(false);
    const [to, setTo] = useState('/user/login')

    useEffect(() => {
        axios.get('http://localhost:3001/api/user/authenticated').then(
            (response) => {
                if(response.status === 200){
                    setIsUserLogged(true);
                    setTo(null)
                }
            }
        ).catch((reason) => null);
    }, []);

    const defaultItems = [
        { 'title': 'My Account', 'onClick': null },
        { 'title': 'My Orders', 'onClick': null },
        { 'title': 'Logout', 'onClick': null }
    ]

    return (
        <header>
            <div className='Main'>
                <Logo />
                <div className='More'>
                    <Link>
                        <SlideEffect height='24px'>
                            <ShoppingCart id='cart' />
                        </SlideEffect>
                    </Link>
                    <Link to={to} onClick={() => {
                        console.log('Showing menu')
                        setShowPopupMenu(true)
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
            <PopupMenu isVisible={showPopupMenu} onDismiss={() => setShowPopupMenu(false)} menuItems={defaultItems} />
        </header>
    );
}

export { Header };