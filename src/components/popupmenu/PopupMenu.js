import './PopupMenu.css';
import { SlideEffect } from "../link/Link";
import { useEffect, useRef } from 'react';

function PopupMenu(props) {
    const node = useRef();
    const pointerEvent = (e) => {
        if(!node.current.contains(e.target)) {
            props.onDismiss();
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
        <div ref={node} className={'PopupMenu' + (props.isVisible ? ' Show' : '')}>
            { props.menuItems.map((item, index) => 
                <div 
                    key={index} 
                    className='Item' 
                    onClick={() => {
                        if (item.onClick)
                            item.onClick(); 
                        props.onDismiss()}}>
                    <SlideEffect height='16px'><p className='btn'>{item.title}</p></SlideEffect>
                </div>
            ) }
        </div>
    );
}

export { PopupMenu };