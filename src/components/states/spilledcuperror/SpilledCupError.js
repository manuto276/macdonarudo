import '../State.css';

import SpilledCupState from '../../../resources/states/spilled-cup-error.svg';

function SpilledCupError(props) {
    return (
        <div className='State'>
            <img className='Icon' src={SpilledCupState} alt='Error' />
            <p>{props.message}</p>
        </div>
    );
}

export { SpilledCupError };