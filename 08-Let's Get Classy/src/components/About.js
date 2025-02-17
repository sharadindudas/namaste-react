import { Component } from "react";
import UserClass from "./UserClass";
import User from "./User";

// Lifecycle Diagram => https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

class About extends Component {
    constructor(props) {
        super(props);
        // console.log("Parent Constructor");
    }

    componentDidMount() {
        // console.log("Parent Component Did Mount()");
    }

    render() {
        // console.log("Parent Render");

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    margin: "30px 0"
                }}
            >
                <h1
                    style={{
                        margin: "10px 0"
                    }}
                >
                    About us
                </h1>
                <User name={"Sharadindu Das"} />
                {/* <UserClass name={"FirstChild"} location={"Kolkata"} /> */}
                {/* <UserClass name={"SecondChild"} location={"Delhi"} /> */}
            </div>
        );
    }
}

export default About;
