import './MyOrders.css';

import { NoTasks } from '../../states/notasks/NoTasks';
import { StatusChip } from '../../statuschip/StatusChip';
import { PopupMenu } from '../../popupmenu/PopupMenu';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SlideEffect } from '../../link/Link';
import { MoreVert } from '../../icon/Icon';

function MyOrders(props) {
    return (
        <section id='my-orders'>
            <div className='Content'>
                <hgroup>
                    <h1>My Orders</h1>
                    <p>This is a list of all of your orders.</p>
                </hgroup>
                <MyOrdersList />
            </div>
        </section>
    );
}

function MyOrdersList() {
    const [showPopupMenu, setShowPopupMenu] = useState(false);

    const orders = [];

    const moreItems = [
        {'name': 'Delete Order', 'onClick': null}
    ];

    return (
        <div className='MyOrdersList'>
            {orders.length === 0 ? 
                <NoTasks /> : 
                <table>
                    <thead>
                        <td>Order ID</td>
                        <td>Date</td>
                        <td>Price</td>
                        <td>Status</td>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            return (
                                <tr>
                                    <td>{order._id}</td>
                                    <td>{order._userId}</td>
                                    <td>{order.date}</td>
                                    <td>{order.price}</td>
                                    <td>
                                        <StatusChip status={order.status} />
                                    </td>
                                    <td className='actions'>
                                        {order.status === 'pending' ? 
                                            <Link onClick={() => setShowPopupMenu(true)}>
                                                <SlideEffect height='1.5rem'>
                                                    <MoreVert />
                                                </SlideEffect>
                                            </Link> : null}
                                        {order.status === 'pending' ? 
                                            <PopupMenu isVisible={showPopupMenu} onDismiss={() => setShowPopupMenu(false)} menuItems={moreItems} /> : null}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            }
        </div>
    );
}

export { MyOrders };