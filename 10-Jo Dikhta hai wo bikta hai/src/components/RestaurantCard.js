import { RESTAURANT_IMG, STAR_URL } from "../utils/constants";
import { Link } from "react-router";
import { truncateString } from "../utils/utility";

const RestaurantCard = (props) => {
    const {
        id,
        name,
        avgRating,
        cuisines,
        areaName,
        cloudinaryImageId,
        sla: { slaString }
    } = props?.item;

    return (
        <Link
            to={`/restaurant/menu/${id}`}
            className="block w-80 transition-all duration-300 hover:scale-95 cursor-pointer"
        >
            <img
                src={`${RESTAURANT_IMG}/${cloudinaryImageId}`}
                alt={name}
                className="w-full h-52 rounded-lg object-cover"
            />
            <div className="pt-1 pl-1">
                <h3 className="font-semibold">{name}</h3>
                <div className="flex items-center gap-1">
                    <img className="w-5" src={STAR_URL} alt="star" />
                    <div className="flex items-center gap-1 font-semibold">
                        <span>{avgRating?.toFixed(1)} • </span>
                        <span>{slaString}</span>
                    </div>
                </div>

                <div className="text-gray-500">
                    {truncateString(cuisines?.join(", "), 24)}
                </div>
                <div className="text-gray-500">{areaName}</div>
            </div>
        </Link>
    );
};

export default RestaurantCard;
