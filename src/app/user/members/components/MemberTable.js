'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MemberTable() {
    let [loading, setLoading] = useState(false);
    let [members, setMembers] = useState([]);
    const supabase = createClientComponentClient();

    useEffect(() => {
        getMembers();
    }, []);

    const getMembers = async () => {
        setLoading(true);

        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase
            .from('event_members')
            .select('*, events(*)')
            .eq('user_id', user?.id)
            .order('id', { ascending: false });

        if (error) throw error.message;

        setMembers(data);

        setLoading(false);
    };

    const destroy = async (id) => {
        setLoading(true);

        const { error } = await supabase
            .from('event_members')
            .delete()
            .eq('id', id);

        if (error) throw error.message;

        getMembers();
    }

    return (
        <>
            <div className={classNames({"app-loading": loading, "overflow-x-auto": true})}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Event</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th className="text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {members.map((member, index) => (
                            <tr  key={`member-${member.id}`}>
                                <th>{index + 1}</th>
                                <td>{member.events.name}</td>
                                <td>{member.name}</td>
                                <td>{member.phone ?? 'N/A'}</td>
                                <td>{member.email ?? 'N/A'}</td>
                                <td>{member.address ?? 'N/A'}</td>
                                <td>
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/user/members/edit/${member.id}`} className="btn btn-xs btn-info">Edit</Link>
                                        <button onClick={() => destroy(member.id)} className="btn btn-xs btn-secondary">Delete</button>
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