'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EventForm({id}) {
    let [loading, setLoading] = useState(false);
    let [event, setEvent] = useState({});

    const router = useRouter();
    const supabase = createClientComponentClient();

    useEffect(() => {
        const getEvent = async () => {
            setLoading(true);

            const { data: { user } } = await supabase.auth.getUser();

            const { data, error } = await supabase
                .from('events')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error.message;

            if (data.user_id != user?.id) {
                return router.push('/user/events/list');
            }

            setEvent(data);

            setLoading(false);
        };

        id && getEvent();
    }, [id]);

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    id: event?.id,
                    type: event?.type,
                    name: event?.name,
                    description: event?.description,
                    start_at: event?.start_at ? dayjs(event?.start_at).format('YYYY-MM-DD') : '',
                    end_at: event?.end_at ? dayjs(event?.end_at).format('YYYY-MM-DD') : '',
                }}
                onSubmit={async (values, actions) => {
                    const { data: { user } } = await supabase.auth.getUser();

                    let id = values.id;
                    let user_id = user.id;
                    let type = values.type;
                    let name = values.name;
                    let description = values.description;
                    let start_at = values.start_at;
                    let end_at = values.end_at;

                    if (id) {
                        const { error } = await supabase
                            .from('events')
                            .update({ user_id: user_id, type: type, name: name, description: description, start_at: start_at, end_at: end_at, updated_at: new Date() })
                            .eq('id', id);

                            if (error) throw error.message;
                    } else {
                        const { data, error } = await supabase
                            .from('events')
                            .insert({ user_id: user_id, type: type, name: name, description: description, start_at: start_at, end_at: end_at })
                            .select();

                            if (error) throw error.message;

                        const { eventMembersError } = await supabase
                            .from('event_members')
                            .insert({ user_id: user_id, event_id: data[0].id, name: user?.user_metadata?.name, phone: user?.user_metadata?.phone, email: user?.email });

                            if (eventMembersError) throw eventMembersError.message;
                    }

                    actions.setSubmitting(false);

                    router.push('/user/events/list');
                }}
            >
                {(props) => (
                    <Form className={classNames({"app-loading": loading})}>
                        <div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-bold required">Type</span>
                                </div>

                                <Field
                                    as="select"
                                    name="type"
                                    id="type"
                                    className="select select-bordered w-full"
                                    required
                                >
                                    <option value="">---</option>
                                    <option value="Tour">Tour</option>
                                    <option value="Business">Business</option>
                                    <option value="Party">Party</option>
                                    <option value="Get-Together">Get-Together</option>
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
                                    <span className="label-text font-bold required">Description</span>
                                </div>

                                <Field
                                    as="textarea"
                                    type="text"
                                    name="description"
                                    id="description"
                                    className="textarea textarea-bordered w-full"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-bold required">Start</span>
                                </div>

                                <Field
                                    type="date"
                                    name="start_at"
                                    id="start_at"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-bold required">End</span>
                                </div>

                                <Field
                                    type="date"
                                    name="end_at"
                                    id="end_at"
                                    className="input input-bordered w-full"
                                    required
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