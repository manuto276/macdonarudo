import './DrawerLayout.css';

import React from 'react';
import { DrawerSection } from '../drawersection/DrawerSection';
import { BoxLink } from '../../link/Link';
import { useMediaQuery } from 'react-responsive';

function DrawerLayout(props) {
    return (
        useMediaQuery({minWidth: 1024}) ? props.children :
        <div className={'DrawerLayout' + (props.active ? ' Active' : '')}>
            <div className='Shelf'>
                <DrawerSection>
                    <div className='DrawerHeader'>
                        <div className='ProPic'></div>
                        <h5>Hello there</h5>
                        <h3>{props.user ?? 'User'}</h3>
                    </div>
                </DrawerSection>
                {props.items.map((section, i1) => {
                    return <DrawerSection key={i1}>{section.map((item, i2) => {
                        return <BoxLink key={i2} onClick={() => {
                            if (props.onDismiss != null)
                                props.onDismiss();
                            if (item.onClick != null)
                                item.onClick();
                        }}><div className='Button'>{item.title}</div></BoxLink>
                    })}</DrawerSection>
                })}
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