import './SwitchBox.css';

function SwitchBox(props) {
    return (
        <div className='SwitchBoxContainer'>
            {props.label ? <p>{props.label}</p> : null}
            <div id={props.id ?? null} className={'SwitchBox' + (props.value ? ' Active' : '')} onClick={props.onClick ?? null}>
                <div className='Ball' />
            </div>
        </div>
    );
}

export { SwitchBox };