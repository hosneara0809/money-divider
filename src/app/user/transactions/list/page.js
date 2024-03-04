import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import LayoutAuth from "@/components/Layout/LayoutAuth";
import TransactionTable from "../components/TransactionTable";

export const metadata = {
    title: "Transactions",
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
                                    <div className="card-title">Transactions</div>

                                    <div>
                                        <Link href={'/user/transactions/create'} className="btn btn-primary">Add New</Link>
                                    </div>
                                </div>

                                <TransactionTable />
                            </div>
                        </LayoutAuth>
                    </div>
                </section>
            </Layout>
        </>
    );
}