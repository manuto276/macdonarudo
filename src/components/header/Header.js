import './Header.css';

import logo from '../../resources/logo.svg';
import { Menu, ShoppingCart, AccountCircle } from '../icon/Icon';
import { BoxLink, Link } from '../link/Link';
import { PopupMenu } from '../popupmenu/PopupMenu';
import { useState } from 'react';

export function Header(props) {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const defaultItems = 
        [
            {'name': 'My Account', 'to': '/'},
            {'name': 'Sign in', 'to': '/login'}
        ]

    return (
        <header>
            <BoxLink className='MenuButton' onClick={props.onMenuClick}><Menu color='white' /></BoxLink>
            <Link className='LogoContainer' to='/'>
                <img className='Logo' src={logo} alt='Mac Donarudo' />
            </Link>
            <div className='Actions'>
                <BoxLink className='CartButton'><ShoppingCart color='white' /></BoxLink>
                <BoxLink className='AccountButton' onClick={() => setMenuVisible(true)}><AccountCircle className='AccountIcon' color='white' /></BoxLink>
            </div>
            <PopupMenu active={isMenuVisible} dismiss={() => setMenuVisible(false)} items={defaultItems} />
        </header>
    );
}