'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import classNames from 'classnames';
import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FaqForm({id}) {
    let [loading, setLoading] = useState(false);
    let [faq, setFaq] = useState({});
    const router = useRouter();
    const supabase = createClientComponentClient();

    useEffect(() => {
        const getFaq = async () => {
            setLoading(true);

            const { data, error } = await supabase
                .from('faqs')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;

            setFaq(data);

            setLoading(false);
        };

        id && getFaq();
    }, [id]);

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    id: faq?.id,
                    question : faq?.question ,
                    answer: faq?.answer,
                }}
                onSubmit={async (values, actions) => {
                    let id = values.id;
                    let question  = values.question ;
                    let answer = values.answer;

                    if (id) {
                        const { error } = await supabase
                            .from('faqs')
                            .update({ question : question , answer: answer, updated_at: new Date() })
                            .eq('id', id);

                            if (error) throw error;
                    } else {
                        const { error } = await supabase
                            .from('faqs')
                            .insert({ question : question , answer: answer });

                            if (error) throw error;
                    }

                    actions.setSubmitting(false);

                    router.push('/admin/faqs/list');
                }}
            >
                {(props) => (
                    <Form className={classNames({"app-loading": loading})}>

                        <div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-bold required">Question </span>
                                </div>

                                <Field
                                    type="text"
                                    name="question"
                                    id="question"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-bold required">Answer</span>
                                </div>

                                <Field
                                    as="textarea"
                                    type="text"
                                    name="answer"
                                    id="answer"
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