import './Header.css';
import { AccountCircle, ShoppingCart } from '../icon/Icon';
import { Logo } from '../logo/Logo';
import { Link, SlideEffect } from '../link/Link';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { PopupMenu } from '../popupmenu/PopupMenu';
import { ShoppingCartView } from '../shoppingcartview/ShoppingCartView';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App'

function Header(props) {
    const [showPopupMenu, setShowPopupMenu] = useState(false);
    const [showShoppingCart, setShowShoppingCart] = useState(false);

    // this hook holds the link "to" of the account icon button on the top right.
    // If the user is not logged in, "to" is set to "/user/login/". Otherwise,
    // it will be null, hence the link won't redirect and only show a popup
    const [to, setTo] = useState('/user/login');
    const navigate = useNavigate();

    // this hook refreshes the UI whenever the value provided by AuthContex changes.
    // See comments in App.js for more explanation
    const authContextHook = useContext(AuthContext);

    const logout = () => {
        const host = process.env.HOST
        axios.get(`${host}api/user/logout`, {withCredentials: true}).then((response) => {
            if(response.status === 200){
                alert('Logout successful.');
                authContextHook.setIsUserLogged(false);
                setTo('/user/login/')
                // if the logout was successful, navigate to "/" in order to
                // reload the components and the isUserLogged state variable
                navigate('/', {replace: true});
            }
        })
    }

    // This effect applies when the shopping cart is visible:
    // if so, then we be removing the mf overflow so it doesn't show
    // weird overlay clips when scrolling.
    // We're passing the scrolling to the cart content.
    useEffect(() => {
        if(authContextHook.isUserLogged){
            setTo(null);
        }
        if (showShoppingCart)
            document.body.style.overflow = 'hidden';
        else
            document.body.style.overflow = 'initial';
    });

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
                                setShowShoppingCart(true);
                            }}>
                            <SlideEffect height='24px'>
                                <ShoppingCart id='cart' />
                            </SlideEffect>
                        </Link>
                        <Link to={to} onClick={() => {
                                if(authContextHook.isUserLogged){
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
                        <Link to='/'>
                            <SlideEffect height='1rem'>Home</SlideEffect>
                        </Link>
                    </div>
                    <div className='NavItem'>
                        <Link to='/menu'>
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