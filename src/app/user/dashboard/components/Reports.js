'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import classNames from "classnames";
import { useEffect, useState } from "react";

export default function Reports() {
    let [loading, setLoading] = useState(false);
    let [events, setEvents] = useState([]);
    let [finalReports, setFinalReports] = useState({
        totalAmount: 0,
        membersReports: [],
    });

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

    const getReports = async (eventId) => {
        setLoading(true);

        let totalAmount = 0;
        let membersReports = [];

        const {data, error} = await supabase
        .from('transactions')
        .select('*, transaction_members(*, event_members(*))')
        .eq('event_id', eventId);

        if (error) throw error.message;

        data.map((transaction) => {
            totalAmount += transaction.amount;

            let totalAmountPerMember = transaction.amount / transaction.transaction_members.length;
            transaction.transaction_members.map((transactionMember) => {
                let member = transactionMember.event_members;

                let membersReportObj = membersReports[member.id];

                membersReports[member.id] = {
                    member: member,
                    amount: (membersReportObj?.amount ?? 0) + totalAmountPerMember,
                };
            });
        });

        setFinalReports({
            totalAmount: totalAmount,
            membersReports: membersReports,
        });

        setLoading(false);
    };

    return (
        <>
            <h1 className="mb-3 text-xl font-bold">Reports</h1>

            <div className={classNames({"app-loading": loading})}>
                <div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-bold required">Select Event</span>
                        </div>

                        <select
                            name="event_id"
                            id="event_id"
                            className="select select-bordered w-full"
                            required
                            onChange={(e) => getReports(e.target.value)}
                        >
                            <option value="">---</option>
                            {events.map((event) => (
                                <option key={`event-${event.id}`} value={event.id}>{event.name}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="mt-3">
                {finalReports.membersReports.map((memberReport) => (
                        <div className="card shadow border-2 mb-3" key={`member-report-${memberReport.member.id}`}>
                            <div className="card-body p-3">
                                <div className="flex justify-between items-center">
                                    <div>{memberReport.member.name}</div>
                                    <div>${memberReport.amount}</div>
                                </div>                       
                        </div>
                    </div>
                ))}

                        {finalReports.membersReports.length ? (
                        <div className="card shadow bg-primary text-primary-content border-2 mb-3">
                            <div className="card-body p-3">
                                <div className="flex justify-between items-center">
                                    <div>Total</div>
                                    <div>${finalReports.totalAmount}</div>
                                </div>
                            </div>
                    </div>
) : ''}
                </div>
            </div>
        </>
    );
};