import './StatusChip.css';

function StatusChip(props) {
    return (
        <div className={'caption StatusChip ' + props.status}>
            {props.status === 'rejected' ? 
                'Rejected' : props.status === 'completed' ?
                    'Completed' : props.status === 'accepted' ?
                        'Accepted' : 'Pending'}
        </div>
    );
}

export { StatusChip };