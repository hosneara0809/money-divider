import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import LayoutAuth from "@/components/Layout/LayoutAuth";
import TransactionForm from "../../components/TransactionForm";

export const metadata = {
    title: "Edit Transactions",
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
                                    <div className="card-title">Edit Transactions</div>

                                    <div>
                                        <Link href={'/user/transactions/list'} className="btn btn-secondary">Cancel</Link>
                                    </div>
                                </div>

                                <div>
                                    <TransactionForm id={params.id} />
                                </div>
                            </div>
                        </LayoutAuth>
                    </div>
                </section>
            </Layout>
        </>
    );
}