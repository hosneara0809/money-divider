

import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import FeatureForm from "../../components/FeatureForm";
import LayoutAuth from "@/components/Layout/LayoutAuth";

export const metadata = {
    title: "Edit Features",
};

export default async function Edit({params}) {
    return (
        <>
            <Layout>
                <section className="feature-section mb-10">
                    <div className="container mx-auto mt-5">
                        <LayoutAuth>
                            <div>
                                <div className="border-b-2 pb-3 flex justify-between items-center">
                                    <div className="card-title">Edit Features</div>

                                    <div>
                                        <Link href={'/admin/features/list'} className="btn btn-secondary">Cancel</Link>
                                    </div>
                                </div>

                                <div>
                                    <FeatureForm id={params.id} />
                                </div>
                            </div>
                        </LayoutAuth>
                    </div>
                </section>
            </Layout>
        </>
    );
}