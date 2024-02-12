import Link from "next/link";

export default function BlogCard(props) {
  
    return (

        <>
            <div className="card shadow-xl overflow-hidden">
                <div className="card-body p-0">
                    <div>
                    <img src={props.image} width="100%" height={250} />
                    </div>
                    <div className="p-3">
                        <div className="card-title mb-3">{props.title} </div>
                       
                        <div>{props.description}</div>
                        <div className="my-3">
                            <Link href={`blog-details/${props.id}`} className="text-blue-500">Read More...</Link>
                        

                        </div>

                    </div>
                </div>

            </div>
        </>
    );
}