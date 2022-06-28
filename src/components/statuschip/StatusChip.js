import './StatusChip.css';

function StatusChip(props) {
    return (
        <div className={'caption StatusChip ' + props.status}>
            {props.status === 'rejected' ? 
                'Rejected' : props.status === 'complete' ?
                    'Complete' : props.status === 'accepted' ?
                        'Accepted' : 'Pending'}
        </div>
    );
}

export { StatusChip };