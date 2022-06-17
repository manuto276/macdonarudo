import './Link.css';

function Link(props) {
    return (
        <a id={props.id} 
           className={'Link' + (props.className ? ' ' + props.className : '')} 
           href={props.to}>{props.children}</a>
    );
}

export { Link };