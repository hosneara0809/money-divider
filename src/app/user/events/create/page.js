import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import LayoutAuth from "@/components/Layout/LayoutAuth";
import EventForm from "../components/EventForm";

export const metadata = {
    title: "Add Events",
};

export default async function Create() {
    return (
        <>
            <Layout>
                <section className="event-section mb-10">
                    <div className="container mx-auto mt-5">
                        <LayoutAuth>
                            <div>
                                <div className="border-b-2 pb-3 flex justify-between items-center">
                                    <div className="card-title">Add Events</div>

                                    <div>
                                        <Link href={'/user/events/list'} className="btn btn-secondary">Cancel</Link>
                                    </div>
                                </div>

                                <div>
                                    <EventForm />
                                </div>
                            </div>
                        </LayoutAuth>
                    </div>
                </section>
            </Layout>
        </>
    );
}