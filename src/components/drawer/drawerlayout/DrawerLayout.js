import './DrawerLayout.css';

import React, { useEffect, useRef } from 'react';
import { DrawerSection } from '../drawersection/DrawerSection';
import { BoxLink } from '../../link/Link';

function DrawerLayout(props) {
    const node = useRef();
    
    const resizeEvent = (e) => {
        props.onDismiss();
        return;
    }

    useEffect(() => {
        window.addEventListener('resize', resizeEvent);
    
        return () => {
            window.removeEventListener('resize', resizeEvent);
        }
    }, [node]);

    return (
        <div ref={node} className={'DrawerLayout' + (props.active ? ' Active' : '')}>
            <div className='Shelf'>
                <DrawerSection>
                    <div className='DrawerHeader'>
                        <div className='ProPic'></div>
                        <h5>Hello there</h5>
                        <h3>{props.user ?? 'User'}</h3>
                    </div>
                </DrawerSection>
                <DrawerSection>
                <BoxLink to='/' onClick={props.onDismiss ?? null}><div className='Button'>Home</div></BoxLink>
                <BoxLink to='/menu' onClick={props.onDismiss ?? null}><div className='Button'>Menu</div></BoxLink>
                <BoxLink to='/about' onClick={props.onDismiss ?? null}><div className='Button'>About us</div></BoxLink>
                </DrawerSection>
            </div>
            <div className='Slide' onClick={ props.active ? props.onDismiss : null }>
                <div className='Scale' style={{pointerEvents: props.active ? 'none' : 'initial'}}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

function DrawerView(props) {
    return (
        <div className={'DrawerView ' + props.className} onClick={props.onClick}>{props.children}</div>
    );
}

export { DrawerLayout, DrawerView };