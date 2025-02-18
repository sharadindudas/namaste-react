import { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import useRestaurant from "../hooks/useRestaurant";
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
        <div className="container mx-auto my-14">
            <div className="flex items-center justify-center gap-20 mb-10">
                {/* Filter restaurants */}
                <button
                    className="bg-black text-white w-72 h-14 cursor-pointer"
                    onClick={() => {
                        const filteredRestaurants = allRestaurants?.filter(
                            (res) => res?.info?.avgRating?.toFixed(1) > 4.0
                        );
                        setFilteredRestaurants(filteredRestaurants);
                    }}
                >
                    Top Rated Restaurants
                </button>

                {/* Search restaurants */}
                <div className="h-14 border">
                    <input
                        type="text"
                        placeholder="Search here"
                        className="h-full px-4"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                    <button
                        className="bg-black text-white h-full w-32 cursor-pointer"
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
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-10">
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
