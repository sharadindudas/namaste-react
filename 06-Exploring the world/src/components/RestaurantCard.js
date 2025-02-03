import { RESTAURANT_IMG_URL, STAR_URL } from "../utils/constants";

const RestaurantCard = (props) => {
    const { name, avgRating, cuisines, areaName, cloudinaryImageId } =
        props?.item;

    return (
        <div className="res-card">
            <img
                className="res-logo"
                src={`${RESTAURANT_IMG_URL}/${cloudinaryImageId}`}
                alt="img"
            />
            <h3 className="res-name">{name}</h3>
            <h4 className="res-rating">
                <img className="res-star" src={STAR_URL} alt="star" />
                {avgRating?.toFixed(1)}
            </h4>

            <div className="res-items">{cuisines?.join(", ")}</div>
            <div className="res-location">{areaName}</div>
        </div>
    );
};

export default RestaurantCard;
