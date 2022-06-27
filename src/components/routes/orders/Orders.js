import './Orders.css';

import { Link, SlideEffect } from '../../link/Link';
import { MoreVert } from '../../icon/Icon';

import { NoTasks } from '../../states/notasks/NoTasks';
import { PopupMenu } from '../../popupmenu/PopupMenu';
import { useContext, useState } from 'react';
import { StatusChip } from '../../statuschip/StatusChip';
import { AuthContext } from '../../../App';
import { SpilledCupError } from '../../states/spilledcuperror/SpilledCupError';
import { UnauthorizedPage } from '../../unauthorizedpage/UnauthorizedPage';

function Orders(props) {
    const authContextHook = useContext(AuthContext);

    return (
        <section id='orders'>
            {authContextHook.role === 'cook' ?
                <div className='Content'>
                    <hgroup>
                        <h1>Orders List</h1>
                        <p>This is a list of all the created orders.<br/>You can accept an order, reject it or complete it.</p>
                    </hgroup>
                    <OrdersList />
                </div> : 
                <UnauthorizedPage />
            }
        </section>
    );
}

const acceptedMenuItems = [
    { 'title': 'Complete order', 'onClick': null },
    { 'title': 'Reject order', 'onClick': null },
];

const pendingMenuItems = [
    { 'title': 'Accept order', 'onClick': null },
    { 'title': 'Reject order', 'onClick': null },
];

function OrdersList() {
    const [showPopupMenu, setShowPopupMenu] = useState(false);

    const orders = [];
    orders[0] = {_id: 'asdsanvajfsd', _userId: 'sadcfvsdbmgdfakemanuele', date: 'Today', status: 'active'}

    // The possible order states are:
    // 1. Pending
    // 2. Accepted
    // 3. Completed
    // 4. Rejected

    return (
        <div className='OrdersList'>
            {orders.length === 0 ? 
                <NoTasks /> : 
                <table>
                    <thead>
                        <td>Order ID</td>
                        <td>User ID</td>
                        <td>Date</td>
                        <td>Status</td>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            return (
                                <tr>
                                    <td>{order._id}</td>
                                    <td>{order._userId}</td>
                                    <td>{order.date}</td>
                                    <td>
                                        <StatusChip status={order.status} />
                                    </td>
                                    <td className='actions'>
                                        {order.status !== 'rejected' && order.status !== 'complete' ? 
                                            <Link onClick={() => setShowPopupMenu(true)}>
                                                <SlideEffect height='1.5rem'>
                                                    <MoreVert />
                                                </SlideEffect>
                                            </Link> : null}
                                        {order.status !== 'rejected' && order.status !== 'complete' ? 
                                            <PopupMenu isVisible={showPopupMenu} onDismiss={() => setShowPopupMenu(false)} menuItems={order.status === 'pending' ? pendingMenuItems : acceptedMenuItems} /> : null}
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

export { Orders };