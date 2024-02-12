import Link from 'next/link'
import BlogCard from "@/components/UI/BlogCard";


async function getData () {
    let res = await fetch('https://dev.to/api/articles?per_page=6');

    return res.json();
}



export default async  function Blog(){
    let blogs = await getData();


    return(
        <>
            <section className="Blog-section">
                <div className="container mx-auto p-4 mt-5">
                    <div className="text-center text-5xl font-bold mb-16 text-blue-600">Blogs</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog,index) => (
                                <BlogCard   
                                key={`blog-${index}`}  
                                id={blog.id}
                                image={blog.cover_image}   
                                title={blog.title}  
                                description={blog. description}       
                                />
           
                            ))}
                        </div>

                        <div className="flex justify-center mt-8 mb-5">
                            <Link href="/blog-list"  className="btn btn-primary px-10">Show All</Link>
                        </div>
                </div>

            </section>
        </>
    );
}