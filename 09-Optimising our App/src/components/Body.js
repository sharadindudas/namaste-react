import { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import useRestaurant from "../hooks/useRestaurant";
import "../css/body.css";
import useOnlineStatus from "../hooks/useOnlineStatus";

const Body = () => {
    const [searchText, setSearchText] = useState("");
    const [searchError, setSearchError] = useState(null);
    const onlineStatus = useOnlineStatus();

    const {
        allRestaurants,
        setAllRestaurants,
        filteredRestaurants,
        setFilteredRestaurants
    } = useRestaurant();

    // If no restaurants are present
    if (allRestaurants?.length === 0) {
        return <Shimmer />;
    }

    // If my website is offline (no internet)
    if (onlineStatus === false)
        return <h1>You are offline!! Please check your internet connection</h1>;

    return (
        <div className="body-container">
            <div className="buttons">
                {/* Filter restaurants */}
                <div className="filter">
                    <button
                        onClick={() => {
                            const filteredRestaurants = allRestaurants?.filter(
                                (res) => res?.info?.avgRating?.toFixed(1) > 4.0
                            );
                            setFilteredRestaurants(filteredRestaurants);
                        }}
                        className="filter-btn"
                    >
                        Top Rated Restaurants
                    </button>
                </div>
                {/* Search restaurants */}
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search here"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                    <button
                        onClick={() => {
                            const filteredRestaurants = allRestaurants?.filter(
                                (res) =>
                                    res?.info?.name
                                        ?.toLowerCase()
                                        ?.includes(searchText?.toLowerCase())
                            );
                            setFilteredRestaurants(filteredRestaurants);
                            if (filteredRestaurants?.length > 0) {
                                setSearchError(null);
                            } else {
                                setSearchError(
                                    `Sorry, we couldn't find any results for "${searchText}"`
                                );
                            }
                        }}
                        className="search-btn"
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className="res-container">
                {searchError && <p>{searchError}</p>}
                {filteredRestaurants?.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.info.id}
                        item={restaurant.info}
                    />
                ))}
            </div>
        </div>
    );
};

export default Body;
