import './Transactions.css';

import { NoTasks } from '../../states/notasks/NoTasks';
import { StatusChip } from '../../statuschip/StatusChip';

function Transactions(props) {
    return (
        <section id='transactions'>
            <div className='Content'>
                <hgroup>
                    <h1>Transactions</h1>
                    <p>This is a list of all the orders that ever existed.</p>
                </hgroup>
                <OrdersList />
            </div>
        </section>
    );
}

function TransactionsList() {
    const orders = [];

    return (
        <div className='OrdersList'>
            {orders.length === 0 ? 
                <NoTasks /> : 
                <table>
                    <thead>
                        <td>Order ID</td>
                        <td>User ID</td>
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
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            }
        </div>
    );
}

export { Transactions };