import './MyOrders.css';

import { NoTasks } from '../../states/notasks/NoTasks';
import { StatusChip } from '../../statuschip/StatusChip';
import { PopupMenu } from '../../popupmenu/PopupMenu';
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { SlideEffect } from '../../link/Link';
import { MoreVert } from '../../icon/Icon';
import { AuthContext } from '../../../App';
import { SpilledCupError } from '../../states/spilledcuperror/SpilledCupError';
import { UnauthorizedPage } from '../../unauthorizedpage/UnauthorizedPage';
import axios from 'axios';

function MyOrders(props) {
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

    const [refreshInterval, setRefreshInterval] = useState(null)

    useEffect(() => {
        const host = process.env.REACT_APP_API_HOST
        // check orders every minute
        getOrders().then((result) => {
            setOrders(result);
        });
        const interval = setInterval(() => {getOrders().then((result) => {
            setOrders((oldOrders) => result);
        })}, 30000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <section id='my-orders'>
            {authContextHook.role === 'customer' ?
                <div className='Content'>
                    <hgroup>
                        <h1>My Orders</h1>
                        <p>This is a list of all of your orders.</p>
                    </hgroup>
                    <MyOrdersList orders={orders}/>
                </div> : 
                <UnauthorizedPage />
            }
        </section>
    );
}

function MyOrdersList(props) {
    const [showPopupMenus, setShowPopupMenus] = useState(props.orders != undefined ? props.orders.map(() => false) : []);

    const moreItems = [
        {'name': 'Delete Order', 'onClick': null}
    ];

    return (
        <div className='MyOrdersList'>
            {props.orders.length === 0 ? 
                <NoTasks /> : 
                <table>
                    <thead>
                        <td>Order ID</td>
                        <td>Date</td>
                        <td>Price</td>
                        <td>Status</td>
                    </thead>
                    <tbody>
                        {props.orders.map((order, i) => {
                            return (
                                <tr>
                                    <td>{order._id}</td>
                                    <td>{String(new Date(order.date))}</td>
                                    <td>{order.totalAmount + ' €'}</td>
                                    <td>
                                        <StatusChip status={order.status} />
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