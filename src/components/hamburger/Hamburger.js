import './Hamburger.css';

import Top from '../../resources/images/bread-top.png';
import Bottom from '../../resources/images/bread-bottom.png';
import Egg from '../../resources/images/egg.png';
import Burger from '../../resources/images/burger.png';
import Salad from '../../resources/images/salad.png';

function Hamburger() {
    return (
        <div className='Hamburger'>
            <img className='Bottom' src={Bottom} />  
            <img className='Top' src={Top} /> 
            <img className='Salad' src={Salad} />
            <img className='Burger' src={Burger} /> 
            <img className='Egg' src={Egg} /> 
        </div>
    );
}

export { Hamburger };