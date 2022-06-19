import Image from '../../resources/logo.svg';
import { Link } from '../link/Link';

function Logo() {
    return (
        <Link to='/'>
            <img className='Logo' src={ Image } alt='McDonarudo' />
        </Link>
    );
}

export { Logo };