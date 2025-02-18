import { Component } from "react";
import { Link } from "react-router";

class UserClass extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     count: 0
        // };
        this.state = {
            userInfo: null
        };
        console.log(`${this.props.name} Constructor`);
    }

    async componentDidMount() {
        console.log(`${this.props.name} Component Did Mount()`);
        try {
            const response = await fetch(
                "https://api.github.com/users/sharadindudas"
            );
            const json = await response.json();
            this.setState({
                userInfo: json
            });
            // this.timer = setInterval(() => {
            //     console.log("Namaste React OP");
            // }, 1000);
        } catch (err) {
            console.error(err.message);
        }
    }

    componentDidUpdate() {
        console.log(`${this.props.name} Component Did Update()`);
    }

    componentWillUnmount() {
        console.log(`${this.props.name} Component Will Unmount()`);
        // clearInterval(this.timer);
    }

    render() {
        console.log(`${this.props.name} Render`);
        // const { name, location } = this.props;
        // const { count } = this.state;

        const { userInfo } = this.state;

        if (userInfo === null)
            return <div className="font-semibold text-center">Loading...</div>;

        const { name, location, avatar_url, html_url, login } = userInfo;

        return (
            <div className="flex flex-col items-center justify-center gap-1">
                <img
                    src={avatar_url}
                    alt="avatar"
                    className="rounded-full w-40"
                />
                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>{" "}
                <h3>
                    Github:{" "}
                    <Link
                        to={html_url}
                        target="_blank"
                        className="font-semibold"
                    >
                        @{login}
                    </Link>
                </h3>
            </div>
        );
    }
}

export default UserClass;
