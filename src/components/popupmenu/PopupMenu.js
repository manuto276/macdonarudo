import { useEffect, useRef } from 'react';
import { Link } from '../link/Link';
import './PopupMenu.css';

// TODO: Style menu via css to add animations.
function PopupMenu(props) {
    const node = useRef();

    const pointerEvent = (e) => {
        if(!node.current.contains(e.target)) {
            props.dismiss();
            return;
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', pointerEvent);
        document.addEventListener('scroll', pointerEvent);
    
        return () => {
            document.removeEventListener('mousedown', pointerEvent);
            document.removeEventListener('scroll', pointerEvent);
        }
    }, [node]);

    return (
        <div 
            ref={node}
            id={props.id} 
            className={'PopupMenu ' + (props.active ? 'Active ' : '') + (props.className ?? '')}>
            {
                props.items != null ? props.items.map((item, i) => {
                    return <Link key={i} onClick={() => {props.dismiss(); item.onClick();}}><p>{item.title}</p></Link>
                }) : null
            }
        </div>
    );
}

export { PopupMenu };