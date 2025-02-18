import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router";
import "../css/header.css";

const Header = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/">
                    <img className="logo" src={LOGO_URL} alt="logo" />
                </Link>
            </div>

            <nav className="nav-items">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About us</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact us</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
