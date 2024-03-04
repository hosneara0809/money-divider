'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import classNames from 'classnames';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TransactionTable() {
    let [loading, setLoading] = useState(false);
    let [transactions, setTransactions] = useState([]);
    const supabase = createClientComponentClient();

    useEffect(() => {
        getTransactions();
    }, []);

    const getTransactions = async () => {
        setLoading(true);

        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase
            .from('transactions')
            .select('*, events(*), transaction_members(*, event_members(*))')
            .eq('user_id', user?.id)
            .order('id', { ascending: false });

        if (error) throw error.message;

        setTransactions(data);

        setLoading(false);
    };

    const destroy = async (id) => {
        setLoading(true);

        const { error } = await supabase
            .from('transactions')
            .delete()
            .eq('id', id);

        if (error) throw error.message;

        getTransactions();
    }

    return (
        <>
            <div className={classNames({"app-loading": loading, "overflow-x-auto": true})}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Event</th>
                            <th>Members</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th className="text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr key={`transaction-${transaction.id}`}>
                                <th>{index + 1}</th>
                                <td>{transaction.events.name}</td>
                                <td dangerouslySetInnerHTML={{__html: transaction.transaction_members
                                        ? transaction.transaction_members.map((member) => member.event_members.name).join('<br /> ')
                                        : ''
                                    }}
                                ></td>
                                <td>{transaction.title}</td>
                                <td>{transaction.description ?? 'N/A'}</td>
                                <td>{transaction.amount ?? '0'}</td>
                                <td>{dayjs(transaction.transaction_date).format('DD-MM-YYYY')}</td>
                                <td>
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/user/transactions/edit/${transaction.id}`} className="btn btn-xs btn-info">Edit</Link>
                                        <button onClick={() => destroy(transaction.id)} className="btn btn-xs btn-secondary">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}