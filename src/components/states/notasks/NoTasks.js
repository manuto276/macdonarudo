import '../State.css';

import NoTasksState from '../../../resources/states/no-tasks.svg';

function NoTasks(props) {
    return (
        <div className='State'>
            <img className='Icon' src={NoTasksState} alt='No Products' />
            <p>There are no orders yet.<br/>Come check often to see if an order has been created.</p>
        </div>
    );
}

export { NoTasks };