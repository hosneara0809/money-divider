import Layout from "@/components/Layout/Layout";
import Link from "next/link";

export const metadata = {
  title: "Register",
};

export default function Register() {
  return (
    <>
      <Layout>
        <section className="register-section mb-10">
          <div className="container mx-auto mt-5">
            <div className="text-sm breadcrumbs mb-3">
              <ul>
                <li>
                  <Link href={"/"}>Home</Link>
                </li>
                <li>Register</li>
              </ul>
            </div>

            <div className="flex justify-center">
              <div className="w-full md:w-6/12 card shadow">
                <div className="card-body">
                  <div className="card-title text-2xl font-bold">
                    create your account
                  </div>

                  <form>
                    <div>
                      <label className="form-control w-full">
                        <div className="label">
                          <span className="label-text font-bold required">
                            Full Name 
                          </span>
                        </div>

                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Enter your full name"
                          className="input input-bordered w-full"
                          required
                        />
                      </label>
                    </div>

                    <div>
                      <label className="form-control w-full">
                        <div className="label">
                          <span className="label-text font-bold required">
                            Phone
                          </span>
                        </div>

                        <input
                          type="number"
                          name="phone"
                          id="phone"
                          placeholder="Enter phone"
                          className="input input-bordered w-full"
                          required
                        />
                      </label>
                    </div>

                    <div>
                      <label className="form-control w-full">
                        <div className="label">
                          <span className="label-text font-bold required">
                            Email
                          </span>
                        </div>

                        <input
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

                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Enter your password"
                          className="input input-bordered w-full"
                          required
                        />
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer justify-start gap-3">
                        <input
                          type="checkbox"
                          class="checkbox checkbox-primary"
                          required
                        />
                        <span class="label-text">
                          I agree to Money Divider{" "}
                          <a href="" className="link link-primary">
                            Terms
                          </a>{" "}
                          and{" "}
                          <a href="" className="link link-primary">
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                    <div>
                      <button className="btn btn-primary w-full mt-5">
                        Submit
                      </button>
                    </div>

                    <div className="mt-3">
                      Don't have an account?{" "}
                      <Link className="link link-primary" href={"/login"}>
                        Register
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
