'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TransactionForm({id}) {
    let [loading, setLoading] = useState(false);
    let [events, setEvents] = useState([]);
    let [members, setMembers] = useState([]);
    let [transaction, setTransaction] = useState({});

    const router = useRouter();
    const supabase = createClientComponentClient();

    useEffect(() => {
        getEvents();

        const getTransaction = async () => {
            setLoading(true);

            const { data: { user } } = await supabase.auth.getUser();

            const { data, error } = await supabase
                .from('transactions')
                .select('*, events(*), transaction_members(*)')
                .eq('id', id)
                .single();

            if (error) throw error.message;

            if (data.user_id != user?.id) {
                return router.push('/user/transactions/list');
            }

            getMembers(data?.event_id);

            setTransaction(data);

            setLoading(false);
        };

        id && getTransaction();
    }, [id]);

    const getEvents = async () => {
        setLoading(true);

        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('user_id', user?.id)
            .order('id', { ascending: true });

        if (error) throw error.message;

        setEvents(data);

        setLoading(false);
    };

    const getMembers = async (event_id) => {
        setLoading(true);

        const { data, error } = await supabase
            .from('event_members')
            .select('*')
            .eq('event_id', event_id)
            .order('id', { ascending: false });

        if (error) throw error.message;

        setMembers(data);

        setLoading(false);
    };

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    id: transaction?.id,
                    event_id: transaction?.event_id,
                    member_ids: transaction?.transaction_members ? transaction.transaction_members.map((member) => member.member_id) : null,
                    title: transaction?.title,
                    description: transaction?.description,
                    amount: transaction?.amount,
                    transaction_date: transaction?.transaction_date ? dayjs(transaction?.transaction_date).format('YYYY-MM-DD') : '',
                }}
                onSubmit={async (values, actions) => {
                    const { data: { user } } = await supabase.auth.getUser();

                    let id = values.id;
                    let user_id = user.id;
                    let event_id = values.event_id;
                    let member_ids = values.member_ids;
                    let title = values.title;
                    let description = values.description;
                    let amount = values.amount;
                    let transaction_date = values.transaction_date;

                    if (id) {
                        const { error } = await supabase
                            .from('transactions')
                            .update({ user_id: user_id, event_id: event_id, title: title, description: description, amount: amount, transaction_date: transaction_date, updated_at: new Date() })
                            .eq('id', id);

                            if (error) throw error.message;
                    } else {
                        const { data, error } = await supabase
                            .from('transactions')
                            .insert({ user_id: user_id, event_id: event_id, title: title, description: description, amount: amount, transaction_date: transaction_date, })
                            .select();

                        if (error) throw error.message;

                        id = data[0].id;
                    }

                    const { transactionMembersDeleteError } = await supabase
                        .from('transaction_members')
                        .delete()
                        .eq('transaction_id', id);

                    if (transactionMembersDeleteError) throw transactionMembersDeleteError.message;

                    const { transactionMembersError } = await supabase
                            .from('transaction_members')
                            .insert(member_ids.map((member_id) => ({ transaction_id: id, member_id: member_id })));

                    if (transactionMembersError) throw transactionMembersError.message;

                    actions.setSubmitting(false);

                    router.push('/user/transactions/list');
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
                                    onChange={(e) => {
                                        props.setFieldValue('event_id', e.target.value);
                                        getMembers(e.target.value);
                                    }}
                                >
                                    <option value="">---</option>
                                    {events.map((event) => (
                                        <option key={`event-${event.id}`} value={event.id}>{event.name}</option>
                                    ))}
                                </Field>
                            </label>
                        </div>

                        <div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-bold required">Select Members</span>
                                </div>

                                <Field
                                    as="select"
                                    name="member_ids"
                                    id="member_ids"
                                    className="select select-bordered w-full"
                                    required
                                    multiple
                                >
                                    <option value="">---</option>
                                    {members.map((member) => (
                                        <option key={`member-${member.id}`} value={member.id}>{member.name}</option>
                                    ))}
                                </Field>
                            </label>
                        </div>

                        <div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-bold required">Date</span>
                                </div>

                                <Field
                                    type="date"
                                    name="transaction_date"
                                    id="transaction_date"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-bold required">Title</span>
                                </div>

                                <Field
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-bold required">Amount</span>
                                </div>

                                <Field
                                    number="number"
                                    name="amount"
                                    id="amount"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-bold">Description</span>
                                </div>

                                <Field
                                    as="textarea"
                                    name="description"
                                    id="description"
                                    className="input input-bordered w-full"
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