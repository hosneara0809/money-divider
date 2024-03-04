import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import LayoutAuth from "@/components/Layout/LayoutAuth";
import EventForm from "../../components/EventForm";

export const metadata = {
    title: "Edit Events",
};

export default async function Edit({params}) {
    return (
        <>
            <Layout>
                <section className="mb-10">
                    <div className="container mx-auto mt-5">
                        <LayoutAuth>
                            <div>
                                <div className="border-b-2 pb-3 flex justify-between items-center">
                                    <div className="card-title">Edit Events</div>

                                    <div>
                                        <Link href={'/user/events/list'} className="btn btn-secondary">Cancel</Link>
                                    </div>
                                </div>

                                <div>
                                    <EventForm id={params.id} />
                                </div>
                            </div>
                        </LayoutAuth>
                    </div>
                </section>
            </Layout>
        </>
    );
}