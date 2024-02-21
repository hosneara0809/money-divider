

import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import HowItWorkForm from "../../components/HowItWorkForm";
import LayoutAuth from "@/components/Layout/LayoutAuth";

export const metadata = {
    title: "Edit How it works",
};

export default async function Edit({params}) {
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
                                    <div className="card-title">Edit How it works</div>

                                    <div>
                                        <Link href={'/admin/how-it-works/list'} className="btn btn-secondary">Cancel</Link>
                                    </div>
                                </div>

                                <div>
                                    <HowItWorkForm id={params.id} />
                                </div>
                            </div>
                        </LayoutAuth>
                    </div>
                </section>
            </Layout>
        </>
    );
}