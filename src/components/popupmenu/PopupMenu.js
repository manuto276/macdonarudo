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

    const resizeEvent = (e) => {
        props.dismiss();
        return;
    }

    useEffect(() => {
        document.addEventListener('mousedown', pointerEvent);
        document.addEventListener('scroll', pointerEvent);
        window.addEventListener('resize', resizeEvent);
    
        return () => {
            document.removeEventListener('mousedown', pointerEvent);
            document.removeEventListener('scroll', pointerEvent);
            window.removeEventListener('resize', resizeEvent);
        }
    }, [node]);

    return (
        <div 
            ref={node}
            id={props.id} 
            className={'PopupMenu ' + (props.active ? 'Active ' : '') + (props.className ?? '')}>
            {
                props.items != null ? props.items.map((item, i) => {
                    return <Link key={i} className='Button' onClick={() => {props.dismiss(); item.onClick();}}>{item.title}</Link>
                }) : null
            }
        </div>
    );
}

export { PopupMenu };