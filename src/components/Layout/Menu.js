import Link from 'next/link';
export default function Menu(props) {
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
            <li><Link href={"/login"}>Login </Link></li>

            
          {props.device == 'mobile' && <li className="sm:hidden text-lg"><Link href={"/register"}>Register</Link></li>}
        </ul>

    </>
  )
}
