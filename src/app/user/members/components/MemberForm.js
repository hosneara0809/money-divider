'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import classNames from 'classnames';
import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MemberForm({id}) {
    let [loading, setLoading] = useState(false);
    let [events, setEvents] = useState([]);
    let [member, setMember] = useState({});

    const router = useRouter();
    const supabase = createClientComponentClient();

    useEffect(() => {
        getEvents();

        const getMember = async () => {
            setLoading(true);

            const { data: { user } } = await supabase.auth.getUser();

            const { data, error } = await supabase
                .from('event_members')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error.message;

            if (data.user_id != user?.id) {
                return router.push('/user/members/list');
            }

            setMember(data);

            setLoading(false);
        };

        id && getMember();
    }, [id]);

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

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    id: member?.id,
                    event_id: member?.event_id,
                    name: member?.name,
                    phone: member?.phone,
                    email: member?.email,
                    address: member?.address,
                }}
                onSubmit={async (values, actions) => {
                    const { data: { user } } = await supabase.auth.getUser();

                    let id = values.id;
                    let user_id = user.id;
                    let event_id = values.event_id;
                    let name = values.name;
                    let phone = values.phone;
                    let email = values.email;
                    let address = values.address;

                    if (id) {
                        const { error } = await supabase
                            .from('event_members')
                            .update({ user_id: user_id, event_id: event_id, name: name, phone: phone, email: email, address: address, updated_at: new Date() })
                            .eq('id', id);

                            if (error) throw error.message;
                    } else {
                        const { error } = await supabase
                            .from('event_members')
                            .insert({ user_id: user_id, event_id: event_id, name: name, phone: phone, email: email, address: address, });

                            if (error) throw error.message;
                    }

                    actions.setSubmitting(false);

                    router.push('/user/members/list');
                }}
            >
                {(props) => (
                    <Form className={classNames({"app-loading": loading})}>
                        <div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-bold required">Select Event</span>
                                </div>

                                <Field
                                    as="select"
                                    name="event_id"
                                    id="event_id"
                                    className="select select-bordered w-full"
                                    required
                                >
                                    <option value="">---</option>
                                    {events.map((event) => (
                                        <option key={event.id} value={event.id}>{event.name}</option>
                                    ))}
                                </Field>
                            </label>
                        </div>

                        <div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-bold required">Name</span>
                                </div>

                                <Field
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-bold">Phone</span>
                                </div>

                                <Field
                                    number="number"
                                    name="phone"
                                    id="phone"
                                    className="input input-bordered w-full"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-bold">Email</span>
                                </div>

                                <Field
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="input input-bordered w-full"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-bold">Address</span>
                                </div>

                                <Field
                                    as="textarea"
                                    type="text"
                                    name="address"
                                    id="address"
                                    className="textarea textarea-bordered w-full"
                                />
                            </label>
                        </div>

                        <div>
                            <button type="submit" className={classNames({"app-loading": props.isSubmitting, 'btn btn-primary w-full mt-5': true})}>Submit</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}