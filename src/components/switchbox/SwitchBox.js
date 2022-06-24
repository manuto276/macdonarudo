import './SwitchBox.css';

function SwitchBox(props) {
    return (
        <div id={props.id ?? null} className={'SwitchBox' + (props.value ? ' Active' : '')} onClick={props.onClick ?? null}>
            <div className='Ball' />
        </div>
    );
}

export { SwitchBox };