import './Header.css';

import logo from '../../resources/logo.svg';
import { Menu, ShoppingCart, AccountCircle } from '../icon/Icon';
import { BoxLink, UnderlineLink } from '../link/Link';
import { PopupMenu } from '../popupmenu/PopupMenu';
import { useState } from 'react';

export function Header(props) {
    const [isMenuVisible, setMenuVisible] = useState(false);

    return (
        <header>
            <BoxLink className='MenuButton' onClick={props.onMenuClick}><Menu color='white' /></BoxLink>
            <div className='LogoContainer'>
                <img className='Logo' src={logo} alt='Mac Donarudo' />
            </div>
            <div className='Navigation'>
                <UnderlineLink to='/'><div className='Button'>Home</div></UnderlineLink>
                <UnderlineLink to='/menu'><div className='Button'>Our menu</div></UnderlineLink>
                <UnderlineLink to='/about'><div className='Button'>About us</div></UnderlineLink>
            </div>
            <div className='Actions'>
                <BoxLink className='CartButton'><ShoppingCart color='white' /></BoxLink>
                <BoxLink className='AccountButton' onClick={() => setMenuVisible(true)}><AccountCircle className='AccountIcon' color='white' /></BoxLink>
            </div>
            <PopupMenu active={isMenuVisible} dismiss={() => setMenuVisible(false)} items={props.menuItems} />
        </header>
    );
}