import './Header.css';

import logo from '../../resources/logo.svg';
import { Menu, ShoppingCart, AccountCircle } from '../icon/Icon';
import { BoxLink, UnderlineLink } from '../link/Link';

export function Header(props) {
    return (
        <header>
            <BoxLink className='MenuButton' onClick={props.onMenuClick}><Menu color='white' /></BoxLink>
            <div className='LogoContainer'>
                <img className='Logo' src={logo} alt='Mac Donarudo' />
            </div>
            <div className='Navigation'>
                {props.navItems.map((item, index) => {
                    return <UnderlineLink key={index} onClick={item.onClick}><div className='Button'>{item.title}</div></UnderlineLink>
                })}
            </div>
            <div className='Actions'>
                <BoxLink className='CartButton'><ShoppingCart color='white' /></BoxLink>
                <BoxLink className='AccountButton'><AccountCircle className='AccountIcon' color='white' /></BoxLink>
            </div>
        </header>
    );
}