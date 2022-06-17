import { Hamburger } from '../../hamburger/Hamburger';
import { Facebook, Instagram, Twitter } from '../../icon/Icon';

import './Home.css';

function Home(props) {
    return (
        <section id='home'>
            <hgroup>
                <h4>The One. The Only. The Burger.</h4>
                <h1>Taste The Experience.</h1>
                <div className='Social'><Facebook /><Instagram /><Twitter /></div>
            </hgroup>
            <Hamburger />
        </section>
    );
}

export { Home };