import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import HowItWorkTable from "../components/HowItWorkTable";
import LayoutAuth from "@/components/Layout/LayoutAuth";

export const metadata = {
    title: "How it works",
};

export default async function List() {
    const supabase = createServerComponentClient({cookies});

    const { data: { user } } = await supabase.auth.getUser();

    if (! user) {
        return redirect("/login");
    }

    return (
        <>
            <Layout>
                <section className="how-it-works-section mb-10">
                    <div className="container mx-auto mt-5">
                        <LayoutAuth>
                            <div>
                                <div className="border-b-2 pb-3 flex justify-between items-center">
                                    <div className="card-title">How it works</div>

                                    <div>
                                        <Link href={'/admin/how-it-works/create'} className="btn btn-primary">Add New</Link>
                                    </div>
                                </div>

                                <HowItWorkTable />
                            </div>
                        </LayoutAuth>
                    </div>
                </section>
            </Layout>
        </>
    );
}