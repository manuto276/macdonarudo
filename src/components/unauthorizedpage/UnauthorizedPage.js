import './UnauthorizedPage.css';

import { SpilledCupError } from "../states/spilledcuperror/SpilledCupError";

function UnauthorizedPage() {
    return (
        <div className='UnauthorizedPage'>
            <hgroup>
                <h1>Unauthorized</h1>
            </hgroup>
            <SpilledCupError message='You do not have the enough privileges to access this page.' />
        </div> 
    );
}

export { UnauthorizedPage };