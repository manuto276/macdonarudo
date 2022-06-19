import './Link.css';
import './SlideEffect.css';

function Link(props) {
    return (
        <a id={props.id} 
           className={'Link' + (props.className ? ' ' + props.className : '')} 
           href={props.to}>{props.children}</a>
    );
}

function SlideEffect(props) {
    return (
        <div className='SlideEffect' style={{height: props.height ?? 'fit-content'}}>
            <div>{props.children}</div>
            <div>{props.children}</div>
        </div>
    );
}

export { Link, SlideEffect };