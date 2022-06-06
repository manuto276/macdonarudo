import React from 'react';
import './DrawerLayout.css';

function DrawerLayout(props) {
    let view = null;
    let shelf = null;

    React.Children.forEach(props.children, (child) => {
        // It actually works, but it would've been way better
        // if those elements were classes instead of function components.
        if(child.type.name === 'DrawerView')
            view = child;
        if(child.type.name === 'DrawerShelf')
            shelf = child;
    });

    return (
        <div className={'DrawerLayout' + (props.active ? ' Active' : '')}>
            { shelf }
            <div className='Slide' onClick={ props.dismiss }>
                <div className='Scale' style={{pointerEvents: props.active ? 'none' : 'initial'}}>
                    { view }
                </div>
            </div>
        </div>
    );
}

export { DrawerLayout };