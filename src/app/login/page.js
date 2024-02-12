import Layout from "@/components/Layout/Layout";
import Link from "next/link";

export const metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <>
      <Layout>
        <section className="login-section mb-10">
          <div className="container mx-auto mt-5">
            <div className="text-sm breadcrumbs mb-3">
              <ul>
                <li>
                  <Link href={"/"}>Home</Link>
                </li>
                <li>Login</li>
              </ul>
            </div>

            <div className="flex justify-center">
              <div className="w-full md:w-6/12 card shadow">
                <div className="card-body">
                  <div className="card-title text-2xl font-bold">
                    Log in to your account
                  </div>

                  <form>
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

                    <div>
                      <button className="btn btn-primary w-full mt-5">
                        Submit
                      </button>
                    </div>

                    <div className="mt-3">
                      Don't have an account?{" "}
                      <Link className="link link-primary" href={"/register"}>
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
