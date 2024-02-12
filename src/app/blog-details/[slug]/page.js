import Layout from "@/components/Layout/Layout";

import Link from "next/link";

export const metadata = {
    title: "Blogs",
    description: "Blog list page",
  };

async function getData(slug) {
    let res = await fetch('https://dev.to/api/articles/' + slug);

    return res.json();
}

export default async function BlogDetails({params}) {
    let blog = await getData(params.slug);

    return (
        <>
            <Layout>
                <section className="blogdetails-section mb-10">
                    <div className="container mx-auto mt-5">
                        <div className="text-sm breadcrumbs mb-3">
                            <ul>
                                <li><Link href={"/"}>Home</Link></li>
                                <li>Blog Details</li>
                            </ul>
                        </div>

                            <div>
                            <div className="mb-3">
                                <img src={blog.social_image} width="100%" height={450} />
                            </div>
                            <div className="card-title mb-2">{blog.title}</div>
                            <div className="props" dangerouslySetInnerHTML={{__html: blog.body_html}}></div>
                            </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}