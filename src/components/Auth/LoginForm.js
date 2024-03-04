"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Formik, Field, Form } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values, actions) => {
          let email = values.email;
          let password = values.password;

          await supabase.auth.signInWithPassword({
            email,
            password,
          });

          actions.setSubmitting(false);

          router.push("/user/dashboard");
        }}
      >
        {(props) => (
          <Form>
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
                  <span className="label-text font-bold required">
                    Password
                  </span>
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
              <button
                type="submit"
                className={
                  props.isSubmitting
                    ? "app-loading btn btn-primary w-full mt-5"
                    : "" + "btn btn-primary w-full mt-5"
                }
              >
                Submit
              </button>
            </div>

            <div className="mt-3">
               {`Don't have an account?`} 
               <Link className="link link-primary" href={"/register"}>Register</Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
