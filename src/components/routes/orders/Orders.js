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

    const host = process.env.REACT_APP_API_HOST;
    const [eventSource, setEventSource] = useState(null);

    const updateOrdersUI = () => getOrders().then((result) => {
        setOrders((oldOrders) => result);
    });

    useEffect(() => {
        const host = process.env.REACT_APP_API_HOST
        updateOrdersUI();
        setEventSource(new EventSource(`http://${host}/api/orders/updates/`, {withCredentials: true}));
    }, []);

    useEffect(() => {
        if(eventSource !== null){
            eventSource.onmessage = (event) => {
                try{
                    const updates = JSON.parse(event.data);
                    for(let i=0; i<updates.length; i++){
                        let update = updates[i];
                        
                        if(update.type === 'new'){
                            let order = {
                                _id: update.order._id,
                                date: update.order.date,
                                totalAmount: update.order.totalAmount,
                                userId: update.order.userId,
                                status: update.order.status,
                                products: update.order.products.map((product, i) => {
                                    return {
                                        _id: product._id,
                                        name: product.name,
                                        amount: product.amount
                                    }})};
                            setOrders([order,...orders]);
                        }else if(update.type === 'update'){
                            const updates = JSON.parse(event.data);
                            for(let i=0; i<updates.length; i++){
                                let update = updates[i];
                                let newOrderData = {
                                    orderId: update.orderId,
                                    status: update.status
                                };
                                let ordersCopy = [...orders];
                                for(let j=0; j<ordersCopy.length; j++){
                                    let order = ordersCopy[j];
                                    if(order._id === newOrderData.orderId){
                                        order.status = newOrderData.status;
                                        break;
                                    }
                                }
                                setOrders(ordersCopy);
                            }
                        }
                    }
                }catch(error){}
            }
            eventSource.onerror = (event) => {
                if(event.eventPhase === EventSource.CLOSED){
                    eventSource.close();
                    alert('Connection lost.')
                }
            }
        }
        
    }, [orders]);


    return (
        <section id='orders'>
            {authContextHook.role === 'cook' ?
                <div className='Content'>
                    <hgroup>
                        <h1>Orders List</h1>
                        <p>This is a list of all the created orders.<br/>You can accept an order, reject it or complete it.</p>
                    </hgroup>
                    <OrdersList refreshCallback={updateOrdersUI} orders={orders}/>
                </div> : 
                <UnauthorizedPage />
            }
        </section>
    );
}

function OrdersList(props) {
    
    const [showPopupMenus, setShowPopupMenus] = useState([]);

    const upgradeOrderStatus = (newStatus, orderId, updateUiCallback) => {
        const host = process.env.REACT_APP_API_HOST
        axios.put(`http://${host}/api/orders/${orderId}`, {
            status: newStatus
        }, {withCredentials: true}).then((response) => {
            //updateUiCallback();
        }).catch((error) => {
            alert(error);
        });
    }
    
    useEffect(() => {
        setShowPopupMenus(props.orders != undefined ? props.orders.map(() => false) : [])
    }, [props.orders]);

    console.log(showPopupMenus);
    

    // The possible order states are:
    // 1. pending
    // 2. accepted
    // 3. completed
    // 4. rejected

    return (
        <div className='OrdersList'>
            {props.orders.length === 0 ? 
                <NoTasks /> : 
                <table>
                    <thead>
                        <td>Order ID</td>
                        <td>User ID</td>
                        <td>Date</td>
                        <td>Details</td>
                        <td>Status</td>
                    </thead>
                    <tbody>
                        {props.orders.map((order, i) => {

                            const acceptedMenuItems = [
                                { 'title': 'Complete order', 'onClick': () => upgradeOrderStatus('completed', order._id, props.refreshCallback)},
                                { 'title': 'Reject order', 'onClick': () => upgradeOrderStatus('rejected', order._id, props.refreshCallback) },
                            ];

                            const pendingMenuItems = [
                                { 'title': 'Accept order', 'onClick': () => upgradeOrderStatus('accepted', order._id, props.refreshCallback) },
                                { 'title': 'Reject order', 'onClick': () => upgradeOrderStatus('rejected', order._id, props.refreshCallback) },
                            ];

                            const orderDetails = order.products

                            return (
                                <tr>
                                    <td>{order._id}</td>
                                    <td>{order.userId}</td>
                                    <td>{String(new Date(order.date))}</td>
                                    <td>
                                        <ul className='DetailsList'>
                                        {
                                            orderDetails.map((item, i) => <li className='button'>{item.amount} × {item.name}</li>)
                                        }
                                        </ul>
                                    </td>
                                    <td>
                                        <StatusChip status={order.status} />
                                    </td>
                                    <td className='actions'>
                                        {order.status !== 'rejected' && order.status !== 'completed' ? 
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
                                        {order.status !== 'rejected' && order.status !== 'completed' ? 
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