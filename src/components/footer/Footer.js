import { Link, SlideEffect } from '../link/Link';
import { Logo } from '../logo/Logo';
import { SocialRow } from '../socialrow/SocialRow';
import './Footer.css';

function Footer() {
    return (
        <footer>
            <div className='div1'>
                <Link to='/'>
                    <Logo />
                </Link>
                <p>The One. The Only. The Burger.<br/>Taste The Experience.<br/><br/>&#169; Copyright Ema & Peppe</p>
            </div>
            <div className='div2'>
                <h6>Navigate</h6>
                <Link to='/'>
                    <SlideEffect className='button' height='1rem'>Home</SlideEffect>
                </Link>
                <Link to='/'>
                    <SlideEffect className='button' height='1rem'>Menu</SlideEffect>
                </Link>
                <Link to='/'>
                    <SlideEffect className='button' height='1rem'>About us</SlideEffect>
                </Link>
            </div>
            <div className='div3'>
                <h6>Contacts</h6>
                <Link to='mailto:emanuele.frascella256@gmail.com'>
                    <SlideEffect className='button' height='1rem'>emanuele.frascella256@gmail.com</SlideEffect>
                </Link>
                <Link to='mailto:bosius00@gmail.com'>
                    <SlideEffect className='button' height='1rem'>bosius00@gmail.com</SlideEffect>
                </Link>
                <Link>
                    <SlideEffect className='button' height='1rem'>1 800 675 75 75</SlideEffect>
                </Link>
            </div>
            <SocialRow />
        </footer>
    );
}

export { Footer };