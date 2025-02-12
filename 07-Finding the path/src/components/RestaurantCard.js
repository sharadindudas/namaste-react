import { RESTAURANT_IMG, STAR_URL } from "../utils/constants";
import { Link } from "react-router";
import "../css/restaurantcard.css";

const RestaurantCard = (props) => {
    const { id, name, avgRating, cuisines, areaName, cloudinaryImageId } =
        props?.item;

    return (
        <Link to={`/restaurant/menu/${id}`} className="res-card">
            <img
                className="res-logo"
                src={`${RESTAURANT_IMG}/${cloudinaryImageId}`}
                alt="img"
            />
            <h3 className="res-name">{name}</h3>
            <h4 className="res-rating">
                <img className="res-star" src={STAR_URL} alt="star" />
                {avgRating?.toFixed(1)}
            </h4>

            <div className="res-items">{cuisines?.join(", ")}</div>
            <div className="res-location">{areaName}</div>
        </Link>
    );
};

export default RestaurantCard;
