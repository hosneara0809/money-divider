import Layout from "@/components/Layout/Layout";
import BackendMenu from "@/components/Layout/BackendMenu";
import Reports from "./components/Reports";

export const metadata = {
    title: "Dashboard",
};

export default async function Dashboard() {
    return (
        <>
            <Layout>
                <section className="feature-section mb-10">
                    <div className="container mx-auto mt-5">
                        <div className="flex justify-center gap-3">
                            <div className="w-full md:w-3/12">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <BackendMenu />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-9/12">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <Reports />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}