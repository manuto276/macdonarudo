import './Orders.css';

import { Link, SlideEffect } from '../../link/Link';
import { MoreVert } from '../../icon/Icon';

import { NoTasks } from '../../states/notasks/NoTasks';
import { PopupMenu } from '../../popupmenu/PopupMenu';
import { useContext, useEffect, useState } from 'react';
import { StatusChip } from '../../statuschip/StatusChip';
import { AuthContext } from '../../../App';
import { SpilledCupError } from '../../states/spilledcuperror/SpilledCupError';
import { UnauthorizedPage } from '../../unauthorizedpage/UnauthorizedPage';
import axios from 'axios';

function Orders(props) {
    const authContextHook = useContext(AuthContext);

    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        const host = process.env.REACT_APP_API_HOST
        let result;
        await axios.get(`http://${host}/api/orders/`, {withCredentials: true}).then((response) => {
            result = response.data;
        }).catch((error) => {
            alert(error);
        });
        return result;
    }

    useEffect(() => {
        getOrders().then((result) => {
            setOrders(result);
        })
    }, [])

    console.log(orders);

    return (
        <section id='orders'>
            {authContextHook.role === 'cook' ?
                <div className='Content'>
                    <hgroup>
                        <h1>Orders List</h1>
                        <p>This is a list of all the created orders.<br/>You can accept an order, reject it or complete it.</p>
                    </hgroup>
                    <OrdersList refreshCallback={getOrders} orders={orders}/>
                </div> : 
                <UnauthorizedPage />
            }
        </section>
    );
}

function OrdersList(props) {
    
    const [showPopupMenus, setShowPopupMenus] = useState(props.orders != undefined ? props.orders.map(() => false) : []);
    const [orders, setOrders] = useState(props.orders ?? []);

    const upgradeOrderStatus = (newStatus, orderId, updateUiCallback) => {
        const host = process.env.REACT_APP_API_HOST
        axios.put(`http://${host}/api/orders/${orderId}`, {
            status: newStatus
        }, {withCredentials: true}).then((response) => {
            updateUiCallback().then((result) => {
                setOrders(result);
            });
        }).catch((error) => {
            alert(error);
        });
    }

    
    

    // The possible order states are:
    // 1. pending
    // 2. accepted
    // 3. completed
    // 4. rejected

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
                        {orders.map((order, i) => {

                            const acceptedMenuItems = [
                                { 'title': 'Complete order', 'onClick': () => upgradeOrderStatus('completed', order._id, props.refreshCallback)},
                                { 'title': 'Reject order', 'onClick': () => upgradeOrderStatus('rejected', order._id, props.refreshCallback) },
                            ];

                            const pendingMenuItems = [
                                { 'title': 'Accept order', 'onClick': () => upgradeOrderStatus('accepted', order._id, props.refreshCallback) },
                                { 'title': 'Reject order', 'onClick': () => upgradeOrderStatus('rejected', order._id, props.refreshCallback) },
                            ];


                            return (
                                <tr>
                                    <td>{order._id}</td>
                                    <td>{order.userId}</td>
                                    <td>{String(new Date(order.date))}</td>
                                    <td>
                                        <StatusChip status={order.status} />
                                    </td>
                                    <td className='actions'>
                                        {order.status !== 'rejected' && order.status !== 'complete' ? 
                                            <Link onClick={() => setShowPopupMenus((oldShowMenus) => {
                                                return oldShowMenus.map((value, index) => {
                                                    if(index === i){
                                                        return true;
                                                    }else{
                                                        return false;
                                                    }
                                                });
                                            })}>
                                                <SlideEffect height='1.5rem'>
                                                    <MoreVert />
                                                </SlideEffect>
                                            </Link> : null}
                                        {order.status !== 'rejected' && order.status !== 'complete' ? 
                                            <PopupMenu isVisible={showPopupMenus[i]} onDismiss={() => setShowPopupMenus((oldShowMenus) => {
                                                return oldShowMenus.map((value, index) => {
                                                    return false;
                                                });
                                            })} menuItems={order.status === 'pending' ? pendingMenuItems : acceptedMenuItems} /> : null}
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