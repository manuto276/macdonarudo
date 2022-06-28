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

    useEffect(() => {
        getOrders().then((result) => {
            setOrders(result);
        })
    }, [])

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
    const [showPopupMenu, setShowPopupMenu] = useState(false);

    const [orders, setOrders] = useState(props.orders ?? [  ])

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