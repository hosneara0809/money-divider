import LoginForm from "@/components/Auth/LoginForm";
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

                  <LoginForm />               
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
