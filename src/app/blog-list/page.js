import Layout from "@/components/Layout/Layout";
import Blog from "../home/components/Blog";
import BlogCard from "@/components/UI/BlogCard";
import Link from "next/link";

export const metadata = {
    title: "Blogs",
    description: "Blog list page",
  };

async function getData() {
    let res = await fetch('https://dev.to/api/articles?per_page=28');

    return res.json();
}

export default async function BlogList() {
    let blogs = await getData();

    return (
        <>
            <Layout>
                <section className="blog-list-section mb-10">
                    <div className="container mx-auto mt-5">
                        <div className="text-sm breadcrumbs mb-3">
                            <ul>
                                <li><Link href={"/"}>Home</Link></li>
                                <li>Blogs</li>
                            </ul>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {blogs.map((blog, index) => (
                                <BlogCard
                                    key={`blog-${index}`}
                                    id={blog.id}
                                    image={blog.social_image}
                                    title={blog.title}
                                    description={blog.description}
                                />
                            ))}
                        </div>

                        <div className="flex justify-center mt-8 mb-5">
                            <div className="flex gap-3">
                                <a className="btn btn-primary px-10">Previous</a>
                                <Link href="/blog-list" className="btn btn-primary px-10">Next</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}