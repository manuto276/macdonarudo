import './Header.css';
import { AccountCircle, ShoppingCart } from '../icon/Icon';
import Logo from '../../resources/logo.svg';
import { Link } from '../link/Link';

function Header(props) {
    return (
        <header>
            <Link id='logo' >
                <img src={ Logo } alt='Mc Donarudo' />
            </Link>
            <ul className='Navigation'>
                <li className='Button'>home</li>
                <li className='Button'>menu</li>
                <li className='Button'>about us</li>
            </ul>
            <div className='More'>
                <p>1 800 675 75 75</p>
                <ShoppingCart id='cart' />
                <AccountCircle id='account' />
            </div>
        </header>
    );
}

export { Header };