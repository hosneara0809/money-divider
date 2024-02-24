
import HowItWorkCard from "@/components/UI/HowItWorkCard";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';

async function getData() {
  const supabase = createServerComponentClient({cookies});

      const { data, error } = await supabase
          .from('how-it-works')
          .select('*')
          .order('id', { ascending: true });

      if (error) throw error;
      return data;
}
export default async function HowItWork() {
  let how_it_works = await getData();



    
    // let HowItWorks = [
    //     {
    //         icon: "ph ph-sign-in",
    //         title: "Sign in and start tracking",            
    //         description: "Sign in and start tracking your expenses. You can add expenses in foreign currencies.",

    //     },
    //     {
    //         icon: "ph ph-notepad",
    //         title: "Manage Events",
    //         description: "Add new expenses to your travel budget. You can add expenses in foreign currencies.",
    //     },
    //     {
    //         icon: "ph ph-currency-dollar-simple",
    //         title: "Manage Transactions",            
    //         description: "Add new expenses to your travel budget. You can add expenses in foreign currencies.",
    //     },
    // ];

    return(
        <>
            <section className="HowItWork-section">
                <div className="container mx-auto p-4 mt-5">
                    <div className="text-center text-5xl font-bold mb-16 text-blue-600">How It Works</div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {how_it_works.map((HowItWork,index) => (
                                <HowItWorkCard   
                                key={`HowItWork-${index}`}  
                                icon={HowItWork.icon}   
                                name={HowItWork.name}  
                                description={HowItWork.description} />
        
                            ))}

                        </div>
                </div>

            </section>
        </>
    );
}