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
        <div className='SlideEffect'>
            <div className='Mask' style={{height: props.height ?? 'initial'}}>
                <div>{props.children}</div>
                <div>{props.children}</div>
            </div>
        </div>
    );
}

export { Link, SlideEffect };