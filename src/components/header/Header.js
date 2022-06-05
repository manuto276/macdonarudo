import './Header.css';

import MediaQuery from 'react-responsive'

import logo from '../../resources/logo.svg';
import { Menu, ShoppingCart } from '../icon/Icon';

export function Header(props) {
    return (
        <header>
            <div className='LogoContainer'>
                <img className='Logo' src={logo} />
            </div>
            <MediaQuery minWidth={1024}>
                <div className='Navigation'>
                    <h6>Home</h6>
                    <h6>Our menu</h6>
                    <h6>About us</h6>
                </div>
            </MediaQuery>
            <div className='Actions'>
                <ShoppingCart color='white' />
                <Menu color='white' />
            </div>
        </header>
    );
}