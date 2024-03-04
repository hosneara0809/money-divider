'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

export default function HowItWorkTable() {
    let [loading, setLoading] = useState(false);
    let [faqs, setFaqs] = useState([]);
    const supabase = createClientComponentClient();

    useEffect(() => {
        getFaqs();
    }, []);

    const getFaqs = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from('faqs')
            .select('*')
            .order('id', { ascending: false });

        if (error) throw error;

        setFaqs(data);

        setLoading(false);
    };

    const destroy = async (id) => {
        setLoading(true);

        const { error } = await supabase
            .from('faqs')
            .delete()
            .eq('id', id);

        if (error) throw error;

        getFaqs();
    }

    return (
        <>
            <div className={classNames({"app-loading": loading, "overflow-x-auto": true})}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Question</th>
                            <th>Answer</th>
                            <th className="text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {faqs.map((faq, index) => (
                            <tr  key={`faq-${faq.id}`}>
                                <th>{index + 1}</th>
                                <td>{faq.question }</td>
                                <td>{faq.answer}</td>
                                <td>
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/admin/faqs/edit/${faq.id}`} className="btn btn-xs btn-info">Edit</Link>
                                        <button onClick={() => destroy(faq.id)} className="btn btn-xs btn-secondary">Delete</button>
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