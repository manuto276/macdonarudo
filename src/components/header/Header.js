import './Header.css'
import { AccountCircle, ListAlt, ShoppingCart } from '../icon/Icon';
import { Logo } from '../logo/Logo';
import { Link, SlideEffect } from '../link/Link';
import { useState, useContext } from 'react';
import axios from 'axios';
import { PopupMenu } from '../popupmenu/PopupMenu';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App'

function Header(props) {
    const [showPopupMenu, setShowPopupMenu] = useState(false);

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
        axios.get(`http://${host}/api/users/logout`, {withCredentials: true}).then((response) => {
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

    const userItems = [
        { 'title': 'My Account', 'onClick': null },
        { 'title': 'My Orders', 'to': '/user/orders'},
    ]

    const logoutItem = [
        { 'title': 'Logout', 'onClick': logout }
    ]

    return (
        <div className='HeaderContainer'>
            <header>
                <div className='Main'>
                    <Logo />
                    <div className='More'>
                        {authContextHook.role === 'admin' || authContextHook.role === 'cook' ? // TODO: Put the right role values
                            <Link to={authContextHook.role === 'admin' ? '/transactions' : '/orders'}>
                                <SlideEffect height='1.5rem'>
                                    <ListAlt id='transaction' />
                                </SlideEffect>
                            </Link> :
                            <Link onClick={props.onCartClick ?? null}>
                                <SlideEffect height='1.5rem'>
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
            <PopupMenu isVisible={showPopupMenu} onDismiss={() => setShowPopupMenu(false)} menuItems={authContextHook.role === 'customer' ? userItems.concat(logoutItem) : logoutItem} />
        </div>
    );
}

export { Header };