'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Formik, Field, Form } from 'formik';
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
    const router = useRouter();
    const supabase = createClientComponentClient();

    return (
        <>
        <Formik  
        initialValues={{
                    name: '',
                    phone: '',
                    email: '',
                    password: '',
                }}

            onSubmit={async (values, actions) => {
                    let name = values.name;
                    let phone = values.phone;
                    let email = values.email;
                    let password = values.password;

                    let {data, error} = await supabase.auth.signUp({
                        email,
                        password,
                        options: {
                            // emailRedirectTo: `${location.origin}/auth/callback`,
                            data: {
                                role: email == 'admin@example.com' ? 'admin' : 'user',
                                name: name,
                                phone: phone,
                            }
                        },
                    });

                    if (error) {
                        console.log(error);
                    } else {
                        router.push('/user/dashboard');
                    }

                    actions.setSubmitting(false);
                }}>
    
            {(props) => (
                <Form>
                <div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-bold required">Name</span>
                        </div>

                        <Field
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your name"
                            className="input input-bordered w-full"
                            required
                           
                        />
                    </label>
                </div>

                <div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-bold required">Phone</span>
                        </div>

                        <Field
                            type="number"
                            name="phone"
                            id="phone"
                            placeholder="Enter your phone"
                            className="input input-bordered w-full"
                            required
                            
                        />
                    </label>
                </div>

                <div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-bold required">Email</span>
                        </div>

                        <Field
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                            required
                            
                        />
                    </label>
                </div>

                <div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-bold required">Password</span>
                        </div>

                        <Field
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                            required
                            
                        />
                    </label>
                </div>

                <div>
                    <div className="form-control">
                        <label className="label cursor-pointer justify-start gap-3">
                            <input type="checkbox" className="checkbox checkbox-primary" required />
                            <span className="label-text">I agree to Money Divider <a href="" className="link link-primary">Terms</a> and <a href="" className="link link-primary">Privacy Policy</a></span>
                        </label>
                    </div>
                </div>

                <div>
                    <button type="submit" className={props.isSubmitting ? 'app-loading btn btn-primary w-full mt-5' : '' + 'btn btn-primary w-full mt-5'}>Submit</button>
                </div>

                <div className="mt-3">
                    Already have an account? <Link className="link link-primary" href={"/login"}>Login</Link>
                </div>
            </Form>
            )}
            
            </Formik>
        </>
    );
}