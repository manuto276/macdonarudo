import './Home.css';

import { Facebook, Instagram, Twitter } from "../../icon/Icon";

function Home(props) {
    return (
        <section id='Home'>
            <div className='LandingTitle'>
                <h4>Mac Donarudo</h4>
                <h1>Taste The<br/>Experience.</h1>
                <div className='SocialIcons'>
                    <Facebook color='white' />
                    <Instagram color='white' />
                    <Twitter color='white' />
                </div>
            </div>
            <div className='LandingImage'>
                
            </div>
        </section>
    );
}

export { Home };