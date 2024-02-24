'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EventForm({id}) {
    let [user, setUser] = useState({});
    let [loading, setLoading] = useState(false);
    let [event, setEvent] = useState({});

    const router = useRouter();
    const supabase = createClientComponentClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        }

        getUser();


        const getEvent = async () => {
            setLoading(true);

            const { data, error } = await supabase
                .from('events')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;

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
                    user_id: user?.id,
                    type: event?.type,
                    name: event?.name,
                    description: event?.description,
                    start_at: event?.start_at ? dayjs(event?.start_at).format('YYYY-MM-DD') : '',
                    end_at: event?.end_at ? dayjs(event?.end_at).format('YYYY-MM-DD') : '',

                }}
                onSubmit={async (values, actions) => {
                    let id = values.id;
                    let user_id = values.user_id;
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

                            if (error) throw error;
                    } else {
                        const { error } = await supabase
                            .from('events')
                            .insert({ user_id: user_id, type: type, name: name, description: description, start_at: start_at, end_at: end_at });

                            if (error) throw error;
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
                                    <span className="label-text font-bold required">type</span>
                                </div>

                                <Field
                                    as="select"
                                    name="type"
                                    id="type"
                                    className="input input-bordered w-full"
                                    required >
                                        <option value="">---</option>
                                        <option value="tour">Tour</option>
                                        <option value="business">Business</option>
                                        <option value="party">Party</option>
                                        <option value="get-together">Get-Together</option>

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
                                    className="input input-bordered w-full"
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
                                    name="End_at"
                                    id="End_at"
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