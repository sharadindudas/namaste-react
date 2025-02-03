import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { RESTAURANT_API_URL } from "../utils/constants";

const Body = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchError, setSearchError] = useState("");

    useEffect(() => {
        // Fetching all restaurants
        const fetchRestaurants = async () => {
            try {
                const response = await fetch(RESTAURANT_API_URL);
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

    // Filtering top rated restaurants logic
    const handleTopRatedRestaurants = () => {
        const filteredRestaurants = allRestaurants?.filter(
            (res) => res?.info?.avgRating?.toFixed(1) > 4.0
        );
        setFilteredRestaurants(filteredRestaurants);
    };

    // Filtering search restaurants logic
    const handleSearchRestaurants = () => {
        const filteredRestaurants = allRestaurants?.filter((res) =>
            res?.info?.name?.toLowerCase()?.includes(searchText?.toLowerCase())
        );
        setFilteredRestaurants(filteredRestaurants);
        if (filteredRestaurants?.length > 0) {
            setSearchError("");
        } else {
            setSearchError(
                `Sorry, we couldn't find any results for "${searchText}"`
            );
        }
    };

    // If no restaurants are present
    if (allRestaurants?.length === 0) {
        return <Shimmer />;
    }

    return (
        <div className="container">
            <div className="buttons">
                <div className="filter">
                    <button
                        onClick={handleTopRatedRestaurants}
                        className="filter-btn"
                    >
                        Top Rated Restaurants
                    </button>
                </div>
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
                        onClick={handleSearchRestaurants}
                        className="search-btn"
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className="res-container">
                {searchError && <p>{searchError}</p>}
                {filteredRestaurants?.map((restaurant) => {
                    return (
                        <RestaurantCard
                            key={restaurant.info.id}
                            item={restaurant.info}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Body;
