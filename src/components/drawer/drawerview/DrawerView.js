import './DrawerView.css';

function DrawerView(props) {
    return (
        <div className='DrawerView'>{props.children}</div>
    );
}

export { DrawerView };