import Link from "next/link";
import Menu from "./Menu";
import { cookies } from 'next/headers';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Logout from "../Auth/Logout";
export default async function Header() {
  const supabase = createServerComponentClient({cookies});
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <>
      <header className="main-nav clearfix is-ts-sticky `position: sticky` fade_down_effect">
        <div className="container max-auto">
          <div className="navbar bg-base-100">
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-Linecap="round"
                      stroke-linejoin="round"
                      stroke-Width="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>
                <Menu
                  device="mobile"
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                />
              </div>
              <a className="btn btn-ghost text-2xl">Money Divider</a>
            </div>
            <div className="navbar-center hidden lg:flex">
              <Menu device="desktop" className="menu menu-horizontal px-1 text-base font-bold hover:text-indigo-900" />
            </div>
            <div className="navbar-end hidden sm:inline-flex">
            {user ? <Logout />  : <Link href={"/register"} className="btn btn-primary">Register</Link>}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
