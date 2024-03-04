import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import LayoutAuth from "@/components/Layout/LayoutAuth";
import TransactionForm from "../components/TransactionForm";

export const metadata = {
    title: "Add Transactions",
};

export default async function Create() {
    
    return (
        <>
            <Layout>
                <section className="feature-section mb-10">
                    <div className="container mx-auto mt-5">
                        <LayoutAuth>
                            <div>
                                <div className="border-b-2 pb-3 flex justify-between items-center">
                                    <div className="card-title">Add Transactions</div>

                                    <div>
                                        <Link href={'/user/transactions/list'} className="btn btn-secondary">Cancel</Link>
                                    </div>
                                </div>

                                <div>
                                    <TransactionForm />
                                </div>
                            </div>
                        </LayoutAuth>
                    </div>
                </section>
            </Layout>
        </>
    );
}