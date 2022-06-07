import './Home.css';

import { Facebook, Instagram, Twitter } from "../../icon/Icon";
import { Link } from '../../link/Link';

function Home(props) {
    return (
        <section id='Home'>
            <div className='LandingTitle'>
                <h4>Mac Donarudo</h4>
                <h1>Taste The<br/>Experience.</h1>
                <div className='SocialIcons'>
                    <Link><Facebook color='white' /></Link>
                    <Link><Instagram color='white' /></Link>
                    <Link><Twitter color='white' /></Link>
                </div>
            </div>
            <div className='LandingImage'>
                
            </div>
        </section>
    );
}

export { Home };