import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import LayoutAuth from "@/components/Layout/LayoutAuth";
import FaqForm from "../components/FaqForm";

export const metadata = {
    title: "Add FAQs",
};

export default async function Create() {

    return (
        <>
            <Layout>
                <section className="how-it-works-section mb-10">
                    <div className="container mx-auto mt-5">
                        <LayoutAuth>
                            <div>
                                <div className="border-b-2 pb-3 flex justify-between items-center">
                                    <div className="card-title">Add FAQs</div>

                                    <div>
                                        <Link href={'/admin/faqs/list'} className="btn btn-secondary">Cancel</Link>
                                    </div>
                                </div>

                                <div>
                                    <FaqForm />
                                </div>
                            </div>
                        </LayoutAuth>
                    </div>
                </section>
            </Layout>
        </>
    );
}