import './Header.css';
import { AccountCircle, ListAlt, ShoppingCart } from '../icon/Icon';
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

    /*  this hook refreshes the UI whenever the value provided by AuthContex changes.
        See comments in App.js for more explanation
        properties:
        - authContextHook.isUserLogged
        - authContextHook.role
        methods:
        - authContextHook.setIsUserLogged
        - authContextHook.setRole  */

    const authContextHook = useContext(AuthContext);

    const logout = () => {
        const host = process.env.REACT_APP_API_HOST
        axios.get(`http://${host}/api/user/logout`, {withCredentials: true}).then((response) => {
            if(response.status === 200){
                alert('Logout successful.');
                authContextHook.setIsUserLogged(false);
                authContextHook.setRole(null);
                // if the logout was successful, navigate to "/" in order to
                // reload the components and the isUserLogged state variable
                navigate('/', {replace: true});
            }
        })
    }

    useEffect(() => {
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

    // TODO: We need to update this value whether the user is a cook or not.
    let isCook = false; // Testing value.

    return (
        <div className='HeaderContainer'>
            <header>
                <div className='Main'>
                    <Logo />
                    <div className='More'>
                        {isCook ? 
                            <Link>
                                <SlideEffect height='1.5rem'>
                                    <ListAlt id='orders' />
                                </SlideEffect>
                            </Link> : 
                            <Link onClick={() => {
                                console.log('Showing cart');
                                setShowShoppingCart(true);
                                }}>
                                <SlideEffect height='24px'>
                                    <ShoppingCart id='cart' />
                                </SlideEffect>
                            </Link>}
                        <Link to={authContextHook.isUserLogged ? null : '/user/login'} onClick={() => {
                                if(authContextHook.isUserLogged){
                                    setShowPopupMenu(true);
                                }
                            }}>
                            <SlideEffect height='1.5rem'>
                                <AccountCircle id='account' />
                            </SlideEffect>
                        </Link>
                    </div>
                </div>
                <nav className='Navigation'>
                    <div className='NavItem'>
                        <Link to='/'>
                            <SlideEffect className='button' height='1rem'>Home</SlideEffect>
                        </Link>
                    </div>
                    <div className='NavItem'>
                        <Link to='/menu'>
                            <SlideEffect className='button' height='1rem'>Menu</SlideEffect>
                        </Link>
                    </div>
                    <div className='NavItem'>
                        <Link>
                            <SlideEffect className='button' height='1rem'>About us</SlideEffect>
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