
import FeatureCard from "@/components/UI/FeatureCard";

export default function Feature(){
    let features = [
        {
            icon: "ph ph-navigation-arrow",
            title: "Add expenses on the go",
            description: "Adding new entries in TravelSpend is quick and easy. It works offline and foreign currencies are automatically converted.",

        },
        {
            icon: "ph ph-currency-dollar",
            title: " Stick to your trip budget",
            description: "Keep track of your travel budget and all your expenses. This will help you cut your costs and save money.",

        },
        {
            icon: "ph ph-trend-up",
            title: "Gain insights from your spending ",
            description: "Keep track of your travel budget and all your expenses. This will help you cut your costs and save money.",

        },
        {
            icon: "ph ph-users-three",
            title: "Sync & share ",
            description: "Invite friends or family and organize your budget together. Your data syncs in real-time across multiple devices.",

        },
        {
            icon: "ph ph-receipt",
            title: " Split Costs ",
            description: "Share your trip with your partner or a group of friends and keep track of who owes whom. Split bills, check your balances and settle debts all within TravelSpend.",

        },
        {
            icon: "ph ph-swap",
            title: "Don't worry about currencies exchange rates ",
            description: "Add expenses in any currency. They will automatically convert to your home currency.",

        },
        {
            icon: "ph ph-map-trifold",
            title: " Follow your expenses on a map ",
            description: "You can link places and your expenses will be displayed on a map.",

        },
        {
            icon: "ph ph-floppy-disk-back",
            title: "Export your data ",
            description: "To create expense reports you can easily export your spending data to a CSV file anytime.",

        },
        {
            icon: "ph ph-credit-card",
            title: "Unlimited no. accounts",
            description: "Easily adding and editing your accounts. Edit distribution percentage. Edit account balance. Offline access. Transaction history.",

        },
    ];

    return(
        <>
            <section className="feature-section">
                <div className="container mx-auto p-4">
                    <div className="text-center text-5xl font-bold mb-16 text-blue-600">Features</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {features.map((feature,index) => (
                                <FeatureCard   key={`feature-${index}`}  icon={feature.icon}   title={feature.title}  description={feature. description}       />
                               
                              
                               
                      
                                  
                            ))}

                        </div>
                </div>

            </section>
        </>
    );
}