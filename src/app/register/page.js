import RegisterForm from "@/components/Auth/RegisterForm";
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

                 <RegisterForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
