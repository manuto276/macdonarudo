import './About.css';

import Emanuele from '../../../resources/emanuele.svg';
import Giuseppe from '../../../resources/giuseppe.svg';

function About(props) {
    return (
        <section id='About'>
            <h1>Something<br/>About Us</h1>
            <p>We’re sorry! We were unable to fill up this page with content related to fast food.<br/>You can still find out something about the creators of this web app.</p>
            <div className='Portraits'>
                <img src={Emanuele} alt='Emanuele Frascella' />
                <img src={Giuseppe} alt='Giuseppe Bosa' />
            </div>
        </section>
    );
}

export { About };