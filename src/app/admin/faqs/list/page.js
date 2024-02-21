import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import FaqTable from "../components/FaqTable";
import LayoutAuth from "@/components/Layout/LayoutAuth";

export const metadata = {
    title: "Faqs",
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
                <section className="faqs-section mb-10">
                    <div className="container mx-auto mt-5">
                        <LayoutAuth>
                            <div>
                                <div className="border-b-2 pb-3 flex justify-between items-center">
                                    <div className="card-title">Faqs</div>

                                    <div>
                                        <Link href={'/admin/faqs/create'} className="btn btn-primary">Add New</Link>
                                    </div>
                                </div>

                                <FaqTable />
                            </div>
                        </LayoutAuth>
                    </div>
                </section>
            </Layout>
        </>
    );
}