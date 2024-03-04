'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

export default function HowItWorkTable() {
    let [loading, setLoading] = useState(false);
    let [works, setWorks] = useState([]);
    const supabase = createClientComponentClient();

    useEffect(() => {
        getWorks();
    }, []);

    const getWorks = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from('how-it-works')
            .select('*')
            .order('id', { ascending: false });

        if (error) throw error;

        setWorks(data);

        setLoading(false);
    };

    const destroy = async (id) => {
        setLoading(true);

        const { error } = await supabase
            .from('how-it-works')
            .delete()
            .eq('id', id);

        if (error) throw error;

        getWorks();
    }

    return (
        <>
            <div className={classNames({"app-loading": loading, "overflow-x-auto": true})}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Icon</th>
                            <th>Name</th>
                            <th>Descriptoin</th>
                            <th className="text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {works.map((work, index) => (
                            <tr  key={`work-${work.id}`}>
                                <th>{index + 1}</th>
                                <td><i className={`${work.icon} text-2xl`}></i></td>
                                <td>{work.name}</td>
                                <td>{work.description}</td>
                                <td>
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/admin/how-it-works/edit/${work.id}`} className="btn btn-xs btn-info">Edit</Link>
                                        <button onClick={() => destroy(work.id)} className="btn btn-xs btn-secondary">Delete</button>
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