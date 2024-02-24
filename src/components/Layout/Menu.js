import Link from 'next/link';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export default async function Menu(props) {
  const supabase = createServerComponentClient({cookies});

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <>
        <ul tabIndex={props.tabIndex ?? 1} className={props.className}>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/how-it-work">How it work</a></li>
            <li><a href='/faq'>FAQ</a></li>
            <li><a href='/features'>Features</a></li>
            <li><a href='/blog'>Blog</a></li>
            <li><a href="/contact">Contact</a></li>
            {user
                    ? (
                        <>
                            <li><Link href={"/user/dashboard"}>Dashboard</Link></li>


                        </>
                    )
                    : (
                        <>
                            <li><Link href={"/login"}>Login</Link></li>
                            {props.device == 'mobile' && <li className="sm:hidden"><Link href={"/register"}>Register</Link></li>}
                        </>
                    )
                }
        </ul>

    </>
  )
}
