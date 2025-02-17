import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router";
import useOnlineStatus from "../hooks/useOnlineStatus";
import "../css/header.css";

const Header = () => {
    const onlineStatus = useOnlineStatus();

    return (
        <header className="header">
            <div className="logo-container">
                <a href="/">
                    <img className="logo" src={LOGO_URL} alt="logo" />
                </a>
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
                    <li>
                        <Link to="/grocery">Grocery</Link>
                    </li>
                    <li>Online Status: {onlineStatus ? "✅" : "❌"}</li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
