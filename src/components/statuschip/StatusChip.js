import './StatusChip.css';

function StatusChip(props) {
    return (
        <div className={'caption StatusChip ' + props.status}>
            {props.status === 'rejected' ? 
                'Rejected' : props.status === 'completed' ?
                    'Complete' : props.status === 'accepted' ?
                        'Active' : 'Pending'}
        </div>
    );
}

export { StatusChip };