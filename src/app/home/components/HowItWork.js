
import HowItWorkCard from "@/components/UI/HowItWorkCard";

export default function HowItWork(){
    let HowItWorks = [
        {
            icon: "ph ph-sign-in",
            title: "Sign in and start tracking",            
            description: "Sign in and start tracking your expenses. You can add expenses in foreign currencies.",

        },
        {
            icon: "ph ph-notepad",
            title: "Manage Events",
            description: "Add new expenses to your travel budget. You can add expenses in foreign currencies.",
        },
        {
            icon: "ph ph-currency-dollar-simple",
            title: "Manage Transactions",            
            description: "Add new expenses to your travel budget. You can add expenses in foreign currencies.",
        },
    ];

    return(
        <>
            <section className="HowItWork-section">
                <div className="container mx-auto p-4 mt-5">
                    <div className="text-center text-5xl font-bold mb-16 text-blue-600">How It Works</div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {HowItWorks.map((HowItWork,index) => (
                                <HowItWorkCard   key={`HowItWork-${index}`}  icon={HowItWork.icon}   title={HowItWork.title}  description={HowItWork. description} />
                               
                              
                               
                      
                                  
                            ))}

                        </div>
                </div>

            </section>
        </>
    );
}