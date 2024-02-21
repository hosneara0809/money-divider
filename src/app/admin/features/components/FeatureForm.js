'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import classNames from 'classnames';
import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FeatureForm({id}) {
    let [loading, setLoading] = useState(false);
    let [feature, setFeature] = useState({});
    const router = useRouter();
    const supabase = createClientComponentClient();

    useEffect(() => {
        const getFeature = async () => {
            setLoading(true);

            const { data, error } = await supabase
                .from('features')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;

            setFeature(data);

            setLoading(false);
        };

        id && getFeature();
    }, [id]);

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    id: feature?.id,
                    icon: feature?.icon,
                    name: feature?.name,
                    description: feature?.description,
                }}
                onSubmit={async (values, actions) => {
                    let id = values.id;
                    let icon = values.icon;
                    let name = values.name;
                    let description = values.description;

                    if (id) {
                        const { error } = await supabase
                            .from('features')
                            .update({ icon: icon, name: name, description: description, updated_at: new Date() })
                            .eq('id', id);

                            if (error) throw error;
                    } else {
                        const { error } = await supabase
                            .from('features')
                            .insert({ icon: icon, name: name, description: description });

                            if (error) throw error;
                    }

                    actions.setSubmitting(false);

                    router.push('/admin/features/list');
                }}
            >
                {(props) => (
                    <Form className={classNames({"app-loading": loading})}>
                        <div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-bold required">Icon</span>
                                </div>

                                <Field
                                    type="text"
                                    name="icon"
                                    id="icon"
                                    className="input input-bordered w-full"
                                    required
                                />
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
                            <button type="submit" className={classNames({"app-loading": props.isSubmitting, 'btn btn-primary w-full mt-5': true})}>Submit</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}