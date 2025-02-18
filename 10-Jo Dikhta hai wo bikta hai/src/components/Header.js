import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router";
import useOnlineStatus from "../hooks/useOnlineStatus";

const Header = () => {
    const onlineStatus = useOnlineStatus();

    return (
        <header className="flex items-center justify-between bg-black text-white py-3 px-5">
            <div>
                <Link to="/">
                    <img
                        className="h-16 rounded-full"
                        src={LOGO_URL}
                        alt="logo"
                    />
                </Link>
            </div>

            <nav>
                <ul className="flex items-center gap-10">
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
