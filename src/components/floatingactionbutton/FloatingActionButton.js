import './FloatingActionButton.css';

function PrimaryButton(props) {
    return (
        <div className='FAB Primary' onClick={props.onClick}>{props.children}</div>
    );
}

function SecondaryButton(props) {
    return (
        <div className='FAB Secondary' onClick={props.onClick}>{props.children}</div>
    );
}

function TertiaryButton(props) {
    return (
        <div className='FAB Tertiary' onClick={props.onClick}>{props.children}</div>
    );
}

export { PrimaryButton, SecondaryButton, TertiaryButton };