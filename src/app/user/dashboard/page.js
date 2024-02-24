import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import BackendMenu from "@/components/Layout/BackendMenu";

export const metadata = {
    title: "Dashboard",
};

export default async function Dashboard() {
    const supabase = createServerComponentClient({cookies});

    const { data: { user } } = await supabase.auth.getUser();

    if (! user) {
        return redirect("/login");
    }

    return (
        <>
            <Layout>
                <section className="feature-section mb-10">
                    <div className="container mx-auto mt-5">
                        <div className="flex justify-center gap-3">
                            <div className="w-full md:w-3/12">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <BackendMenu />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-9/12">
                                <div className="card shadow">
                                    <div className="card-body">
                                        Welcome to dashboard
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}