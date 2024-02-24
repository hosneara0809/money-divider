
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';

async function getData() {
  const supabase = createServerComponentClient({cookies});

      const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .order('id', { ascending: true });

      if (error) throw error;
      return data;
}



export default async function FAQ() {
  let faqs = await getData();


    // let faqs = [
    //     {
    //         question: "How can Namecheap help me make more online for less?",
    //         answer: "Namecheap exists to help EVERYONE get, make, and achieve more online with less cost, hassle, and headaches. We offer everything you need to get online and thrive, from domains to hosting to security to specialist services and products — all with value built in. Great prices, world-beating customer support, and extra resources come as standard.",
    //     },
    //     {
    //         question: "Why buy a domain name from Namecheap?",
    //         answer: "Above all else, we strive to deliver outstanding customer experiences. When you buy a domain name from Namecheap, we guarantee it will be handed over to you with superior standards of service and support. Our primary goal is to build a customer-focused atmosphere filled with the happiest customers in the galaxy. The Namecheap guarantee is our mark of excellence.",
    //     },
    //     {
    //         question: "How do I get started with Namecheap?",
    //         answer: "Namecheap is a global provider of domain name registration, domain name hosting, and web hosting. The service is available in 30+ countries. You can get started with Namecheap today.",
    //     },
    // ];


    return (
      <>
        <section className="faq-section">
          <div className="container mx-auto p-4 mt-5">
            <div className="text-center text-5xl font-bold mb-16 text-blue-500">Frequently asked questions
            </div>
            
            <div>
                <div>
                    {faqs.map((faq,index) => (
                        <div key={`faq-${index}`} className="mb-3">
                        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200 mb-3">
                            <input type="checkbox" />

                            <div className="collapse-title text-xl font-medium">{faq.question}</div>

                            <div className="collapse-content"><p>{faq.answer}</p></div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  