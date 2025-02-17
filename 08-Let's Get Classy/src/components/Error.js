import { useRouteError } from "react-router";
import { Link } from "react-router";
import "../css/error.css";

const Error = () => {
    const { status, statusText, error } = useRouteError();

    return (
        <div className="error-container">
            <h2 className="error-type">
                <span className="error-status">{status}</span> {statusText}!
            </h2>
            <p className="error-msg">{error?.message}</p>
            <Link to="/" className="error-button">
                Home
            </Link>
        </div>
    );
};

export default Error;
