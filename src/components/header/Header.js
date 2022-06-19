import './Header.css';
import { AccountCircle, ShoppingCart } from '../icon/Icon';
import { Logo } from '../logo/Logo'
import { Link, SlideEffect } from '../link/Link';

function Header(props) {
    return (
        <header>
            <Logo />
            <nav>
                <Link>
                    <SlideEffect height='16px'>
                        <p className='btn'>Home</p>
                    </SlideEffect>
                </Link>
                <Link>
                    <SlideEffect height='16px'>
                        <p className='btn'>Menu</p>
                    </SlideEffect>
                </Link>
                <Link>
                    <SlideEffect height='16px'>
                        <p className='btn'>About us</p>
                    </SlideEffect>
                </Link>
            </nav>
            <div className='More'>
                <p id='phone-number'>1 800 675 75 75</p>
                <Link>
                    <SlideEffect height='24px'>
                        <ShoppingCart id='cart' />
                    </SlideEffect>
                </Link>
                <Link>
                    <SlideEffect height='24px'>
                        <AccountCircle id='account' />
                    </SlideEffect>
                </Link>
            </div>
        </header>
    );
}

export { Header };