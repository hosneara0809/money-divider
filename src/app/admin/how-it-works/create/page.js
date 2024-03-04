import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import LayoutAuth from "@/components/Layout/LayoutAuth";
import HowItWorkForm from "../components/HowItWorkForm";

export const metadata = {
    title: "Add  How it works",
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
                                    <div className="card-title">Add  How it works</div>

                                    <div>
                                        <Link href={'/admin/how-it-works/list'} className="btn btn-secondary">Cancel</Link>
                                    </div>
                                </div>

                                <div>
                                    <HowItWorkForm />
                                </div>
                            </div>
                        </LayoutAuth>
                    </div>
                </section>
            </Layout>
        </>
    );
}