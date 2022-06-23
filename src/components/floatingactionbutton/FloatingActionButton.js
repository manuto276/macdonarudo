import './FloatingActionButton.css';

function FloatingActionButton(props) {
    return (
        <div id={props.id ?? ''} className={'FloatingActionButton' + (props.className ? ' ' + props.className : '')} onClick={props.onClick ?? null}>{props.children}</div>
    );
}

export { FloatingActionButton };