import Menu from "./Menu";
export default function Header() {
    return (
        <>
            <header>
                <div className="container max-auto">
                    <div className="navbar bg-base-100">
                        <div className="navbar-start">
                            <div className="dropdown">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost lg:hidden"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>

                                </div>
                              <Menu device="mobile" tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52" />
                            </div>
                            <a className="btn btn-ghost text-xl">Money Divider</a>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <Menu device="desktop" className="menu menu-horizontal px-1" />
                        </div>
                        <div className="navbar-end hidden sm:inline-flex">
                            <a className="btn  btn-outline btn-secondary">Login/Register</a>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
