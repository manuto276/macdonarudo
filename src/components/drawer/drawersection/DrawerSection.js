import './DrawerSection.css';

function DrawerSection(props) {
    return (
        <div className='DrawerSection'>{props.children}</div>
    );
}

export { DrawerSection };