import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import LayoutAuth from "@/components/Layout/LayoutAuth";
import EventTable from "../components/EventTable";

export const metadata = {
    title: "Events",
};

export default async function List() {

    return (
        <>
            <Layout>
                <section className="mb-10">
                    <div className="container mx-auto mt-5">
                        <LayoutAuth>
                            <div>
                                <div className="border-b-2 pb-3 flex justify-between items-center">
                                    <div className="card-title">Events</div>

                                    <div>
                                        <Link href={'/user/events/create'} className="btn btn-primary">Add New</Link>
                                    </div>
                                </div>

                                <EventTable />
                            </div>
                        </LayoutAuth>
                    </div>
                </section>
            </Layout>
        </>
    );
}