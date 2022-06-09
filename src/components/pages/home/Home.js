import './Home.css';

import { Facebook, Instagram, Twitter } from "../../icon/Icon";
import { BoxLink } from '../../link/Link';

function Home(props) {
    return (
        <section id='Home'>
            <div className='LandingTitle'>
                <h4>Mac Donarudo</h4>
                <h1>Taste The<br/>Experience.</h1>
                <div className='SocialIcons'>
                    <BoxLink><Facebook color='white' /></BoxLink>
                    <BoxLink><Instagram color='white' /></BoxLink>
                    <BoxLink><Twitter color='white' /></BoxLink>
                </div>
            </div>
            <div className='LandingImage'>
                
            </div>
        </section>
    );
}

export { Home };