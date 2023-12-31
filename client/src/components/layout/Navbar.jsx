import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fa-solid fa-paw"></i> Dog club
                </Link>
            </h1>
            <ul>
                <li>
                    <Link to="users">Users</Link>
                </li>
                <li>
                    <Link to="register">Register</Link>
                </li>
                <li>
                    <Link to="login">Login</Link>
                </li>
            </ul>
        </nav>
      );
}

export default Navbar