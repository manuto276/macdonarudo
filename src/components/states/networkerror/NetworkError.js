import '../State.css';

import NetworkErrorState from '../../../resources/states/network-error.svg';

function NetworkError() {
    return (
        <div className='State'>
            <img className='Icon' src={NetworkErrorState} alt='Network Error' />
            <p>Looks like there is a connection problem.</p>
        </div>
    );
}

export { NetworkError };