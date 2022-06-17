import './Header.css';
import { AccountCircle, ShoppingCart } from '../icon/Icon';
import Logo from '../../resources/logo.svg';
import { AnimatedLink, Link } from '../link/Link';

function Header(props) {
    return (
        <header>
            <Link id='logo' >
                <img src={ Logo } alt='Mc Donarudo' />
            </Link>
            <div className='More'>
                <p>1 800 675 75 75</p>
                <ShoppingCart id='cart' />
                <AccountCircle id='account' />
            </div>
        </header>
    );
}

export { Header };