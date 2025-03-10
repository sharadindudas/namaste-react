import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { RESTAURANT_API } from "../utils/constants";
import Shimmer from "./Shimmer";
import "../css/body.css";

const Body = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchError, setSearchError] = useState(null);

    useEffect(() => {
        // Fetching all restaurants
        const fetchRestaurants = async () => {
            try {
                const response = await fetch(RESTAURANT_API);
                const json = await response.json();
                setAllRestaurants(
                    json?.data?.cards?.find((item) =>
                        item?.card?.card?.id?.includes("restaurant_grid")
                    )?.card?.card?.gridElements?.infoWithStyle?.restaurants
                );
                setFilteredRestaurants(
                    json?.data?.cards?.find((item) =>
                        item?.card?.card?.id?.includes("restaurant_grid")
                    )?.card?.card?.gridElements?.infoWithStyle?.restaurants
                );
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchRestaurants();
    }, []);

    // If no restaurants are present
    if (allRestaurants?.length === 0) {
        return <Shimmer />;
    }

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
