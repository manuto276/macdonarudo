import './Transactions.css';

import { NoTasks } from '../../states/notasks/NoTasks';
import { StatusChip } from '../../statuschip/StatusChip';
import { SpilledCupError } from '../../states/spilledcuperror/SpilledCupError';
import { AuthContext } from '../../../App';
import { useContext, useEffect, useState } from 'react';
import { UnauthorizedPage } from '../../unauthorizedpage/UnauthorizedPage';
import axios from 'axios';

function Transactions(props) {
    const authContextHook = useContext(AuthContext);

    const [transactions, setTransactions] = useState([]);

    const getTransactions = async () => {
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
        getTransactions().then((result) => {
            setTransactions(result);
        });
        // check orders every minute
        const interval = setInterval(() => {getTransactions().then((result) => {
            setTransactions((oldTransactions) => result);
        })}, 30000);
        return () => {
            clearInterval(interval);
        }
    }, []);


    return (
        <section id='transactions'>
            {authContextHook.role === 'admin' ?
                <div className='Content'>
                    <hgroup>
                        <h1>Transactions</h1>
                        <p>This is a list of all the orders that ever existed.</p>
                    </hgroup>
                    <TransactionsList transactions={transactions}/>
                </div> : 
                <UnauthorizedPage />
            }
        </section>
    );
}

function TransactionsList(props) {

    return (
        <div className='TransactionsList'>
            {props.transactions.length === 0 ? 
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
                        {props.transactions.map((order) => {
                            return (
                                <tr>
                                    <td>{order._id}</td>
                                    <td>{order.userId}</td>
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

export { Transactions };