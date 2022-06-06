import './Header.css';

import MediaQuery from 'react-responsive'

import logo from '../../resources/logo.svg';
import { Menu, ShoppingCart, AccountCircle } from '../icon/Icon';

export function Header(props) {
    return (
        <header>
            <Menu className='DrawerIcon' color='white' />
            <div className='LogoContainer'>
                <img className='Logo' src={logo} />
            </div>
            <div className='Tabs'>
                <h6>Home</h6>
                <h6>Our menu</h6>
                <h6>About us</h6>
            </div>
            <div className='Actions'>
                <ShoppingCart color='white' />
                <AccountCircle className='AccountIcon' color='white' />
            </div>
        </header>
    );
}