
export default function HowItWorkCard(props) {
    return (

        <>
            <div className="card  shadow-xl shadow-indigo-500/50 ">
                <div className="card-body">
                    <div className="w-14 h-14 rounded-full bg-blue-500 text-white text-center flex justify-center items-center text-3xl mb-3">
                        <i className= {props.icon}></i>
                    </div>

                    <div className="card-title hover:text-red-800">{props.name}</div>

                    <div>{props.description}</div>

                </div>

            </div>
        </>
    );
}