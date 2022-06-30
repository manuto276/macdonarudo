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
    const [eventSource, setEventSource] = useState(null);

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
        const host = process.env.REACT_APP_API_HOST
        // check orders every minute
        getOrders().then((result) => {
            setOrders(result);
        });
        setEventSource(new EventSource(`http://${host}/api/orders/updates/`, {withCredentials: true}));
        /*const interval = setInterval(() => {getOrders().then((result) => {
            setOrders((oldOrders) => result);
        })}, 30000);*/
        return () => {
            //clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        
        if(eventSource !== null){
            eventSource.onmessage = (event) => {
                try{
                    const updates = JSON.parse(event.data);
                    console.log(updates);
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
                                setOrders(ordersCopy)
                            }
                        }
                    }
                }catch(error){}
            }
            eventSource.onerror = (event) => {
                if(event.eventPhase === EventSource.CLOSED){
                    that.eventSource.close();
                    alert('Connection lost.')
                }
            }
        }
    }, [orders]);

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

    return (
        <div className='MyOrdersList'>
            {props.orders == null || props.orders.length === 0 ? 
                <NoTasks /> : 
                <table>
                    <thead>
                        <td>Order ID</td>
                        <td>Date</td>
                        <td>Price</td>
                        <td>Details</td>
                        <td>Status</td>
                    </thead>
                    <tbody>
                        {props.orders.map((order, i) => {
                            const orderDetails = order.products
                            return (
                                <tr>
                                    <td>{order._id}</td>
                                    <td>{String(new Date(order.date))}</td>
                                    <td>{order.totalAmount + ' €'}</td>
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