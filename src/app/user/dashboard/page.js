import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import Logout from "@/components/Auth/Logout";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";

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
                        <div className="text-sm breadcrumbs mb-3">
                            <ul>
                                <li><Link href={"/"}>Home</Link></li>
                                <li>Dashboard</li>
                            </ul>
                        </div>

                        <div className="flex justify-center">
                            <div>
                                <div className="text-2xl font-bold">Welcome to Dashboard</div>

                                <Logout />
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}