'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

export default function FeatureTable() {
    let [loading, setLoading] = useState(false);
    let [features, setFeatures] = useState([]);
    const supabase = createClientComponentClient();

    useEffect(() => {
        getFeatures();
    }, []);

    const getFeatures = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from('features')
            .select('*')
            .order('id', { ascending: false });

        if (error) throw error;

        setFeatures(data);

        setLoading(false);
    };

    const destroy = async (id) => {
        setLoading(true);

        const { error } = await supabase
            .from('features')
            .delete()
            .eq('id', id);

        if (error) throw error;

        getFeatures();
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
                        {features.map((feature, index) => (
                            <tr>
                                <th>{index + 1}</th>
                                <td><i className={`${feature.icon} text-2xl`}></i></td>
                                <td>{feature.name}</td>
                                <td>{feature.description}</td>
                                <td>
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/admin/features/edit/${feature.id}`} className="btn btn-xs btn-info">Edit</Link>
                                        <button onClick={() => destroy(feature.id)} className="btn btn-xs btn-secondary">Delete</button>
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