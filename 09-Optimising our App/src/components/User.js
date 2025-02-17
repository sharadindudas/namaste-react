import { useEffect } from "react";

const User = ({ name }) => {
    useEffect(() => {
        const timer = setInterval(() => {
            console.log("Namaste React OP");
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="user-card">
            <h2>Name: {name}</h2>
            <h3>Location: Kanchrapara</h3>
            <h4>Github: sharadindudas</h4>
        </div>
    );
};

export default User;
