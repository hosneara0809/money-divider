export default function Menu(props) {
  return (
    <>
        <ul tabIndex={props.tabIndex ?? 1} className={props.className}>
            <li><a>Home</a></li>
            <li><a>About</a></li>
            <li><a>How it work</a></li>
            <li><a>FAQ</a></li>
            <li><a>Features</a></li>
            <li><a>Blog</a></li>
            <li><a>Contact</a></li>
            
            {props.device == 'mobile' && <li className="sm:hidden"><a>Login / Register</a></li>}
        </ul>

    </>
  )
}
