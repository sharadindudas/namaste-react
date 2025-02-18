import { Component } from "react";
import UserClass from "./UserClass";

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
            <div className="container mx-auto my-5">
                <h1 className="text-center text-3xl font-bold mb-5">
                    About us
                </h1>
                <UserClass name={"FirstChild"} location={"Kolkata"} />
            </div>
        );
    }
}

export default About;
