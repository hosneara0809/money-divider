'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import classNames from 'classnames';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function EventTable() {
    let [loading, setLoading] = useState(false);
    let [events, setEvents] = useState([]);
    const supabase = createClientComponentClient();

    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        setLoading(true);

        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('user_id', user?.id)
            .order('id', { ascending: false });

        if (error) throw error.message;

        setEvents(data);

        setLoading(false);
    };

    const destroy = async (id) => {
        setLoading(true);

        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', id);

        if (error) throw error.message;

        getEvents();
    }

    return (
        <>
            <div className={classNames({"app-loading": loading, "overflow-x-auto": true})}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Start</th>
                            <th>End</th>
                            <th className="text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {events.map((event, index) => (
                            <tr key={`event-${event.id}`}>
                                <th>{index + 1}</th>
                                <td>{event.type}</td>
                                <td>{event.name}</td>
                                <td>{event.description}</td>
                                <td>{dayjs(event.start_at).format('DD-MM-YYYY')}</td>
                                <td>{dayjs(event.end_at).format('DD-MM-YYYY')}</td>
                                <td>
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/user/events/edit/${event.id}`} className="btn btn-xs btn-info">Edit</Link>
                                        <button onClick={() => destroy(event.id)} className="btn btn-xs btn-secondary">Delete</button>
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