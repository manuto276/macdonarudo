import './Menu.css';

function Menu() {
    return (
        <section id='menu'>
            <div className='Content'>
                <hgroup>
                    <h1>Explore<br/>Our Menu</h1>
                </hgroup>
                <div className='TagsContainer'>
                    <div className='Chip Active'>Burgers</div>
                    <div className='Chip'>Pizzas</div>
                    <div className='Chip'>Salads</div>
                    <div className='Chip'>French Fries</div>
                    <div className='Chip'>Drinks</div>
                    <div className='Chip'>Desserts</div>
                </div>
                <div className='Grid'></div>
            </div>
        </section>
    );
}

export { Menu };