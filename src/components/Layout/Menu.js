import Link from 'next/link';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';



export default async function Menu(props) {
  const supabase = createServerComponentClient({cookies});

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <>
        <ul tabIndex={props.tabIndex ?? 1} className={props.className}>
            <li><Link href="/">Home</Link></li>
            <li><a>About</a></li>
            <li><a>How it work</a></li>
            <li><a>FAQ</a></li>
            <li><a>Features</a></li>
            <li><a>Blog</a></li>
            <li><a>Contact</a></li>
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
