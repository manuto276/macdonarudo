import './Button.css';

function Button(props) {
    return (
        <div id={props.id} className={'Button ' + (props.type === 'secondary' ? 'Secondary' : 'Primary')}>
            {props.children}
        </div>
    );
}

export { Button };