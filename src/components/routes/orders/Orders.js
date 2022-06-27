import './Orders.css';

import { Link, SlideEffect } from '../../link/Link';
import { Delete, Done } from '../../icon/Icon';

function Orders(props) {
    return (
        <section id='orders'>
            <div className='Content'>
                <ActiveOrders />
            </div>
        </section>
    );
}

function ActiveOrders() {
    const orders = [];

    return (
        <div className='ActiveOrders'>
            <hgroup>
                <h1>Active Orders</h1>
            </hgroup>
            <div className='table-container'>
                <table>
                    <thead>
                        <td>Order ID</td>
                        <td>User ID</td>
                        <td>Date</td>
                        <td>Actions</td>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            <tr>
                                <td>{order._id}</td>
                                <td>{order._userId}</td>
                                <td>{order.date}</td>
                                <td className='actions'>
                                    <Link>
                                        <SlideEffect height='1.5rem'>
                                            <Done />
                                        </SlideEffect>
                                    </Link>
                                    <Link>
                                        <SlideEffect height='1.5rem'>
                                            <Delete />
                                        </SlideEffect>
                                    </Link>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export { Orders };