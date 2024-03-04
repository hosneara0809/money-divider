

import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import FaqForm from "../../components/FaqForm";
import LayoutAuth from "@/components/Layout/LayoutAuth";

export const metadata = {
    title: "Edit Faqs",
};

export default async function Edit({params}) {

    return (
        <>
            <Layout>
                <section className="faqs-section mb-10">
                    <div className="container mx-auto mt-5">
                        <LayoutAuth>
                            <div>
                                <div className="border-b-2 pb-3 flex justify-between items-center">
                                    <div className="card-title">Edit Faqs</div>

                                    <div>
                                        <Link href={'/admin/faqs/list'} className="btn btn-secondary">Cancel</Link>
                                    </div>
                                </div>

                                <div>
                                    <FaqForm id={params.id} />
                                </div>
                            </div>
                        </LayoutAuth>
                    </div>
                </section>
            </Layout>
        </>
    );
}