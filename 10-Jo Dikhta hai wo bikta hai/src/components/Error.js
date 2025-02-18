import { useRouteError } from "react-router";
import { Link } from "react-router";

const Error = () => {
    const { status, statusText, error } = useRouteError();
    console.log(status);
    console.log(statusText);
    console.log(error);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 text-gray-800 p-4">
            <h1 className="text-4xl font-bold text-orange-500 mb-4">
                {status || statusText ? (
                    <span>
                        {status} {statusText}
                    </span>
                ) : (
                    "Oops! Page Not Found"
                )}
            </h1>
            <div className="mb-8">
                <img
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzM5YTBjMzMxZDNjZDUxMzM1MzM1M2JlNDU5NmNiZWM2YzBkZjI3ZiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3o6Zt5TBNnPyQDNVzq/giphy.gif"
                    alt="Confused chef"
                    className="rounded-lg shadow-lg max-w-full h-auto"
                    style={{ maxHeight: "300px" }}
                />
            </div>
            <p className="text-xl mb-5 text-center">
                Looks like this dish isn't on our menu! Let's get you back to
                the main course.
            </p>
            <Link
                to="/"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-5 rounded inline-flex items-center transition duration-300"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default Error;
