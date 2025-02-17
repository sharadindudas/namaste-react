import { useState, useEffect } from "react";
import { RESTAURANT_API } from "../utils/constants";

const useRestaurant = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

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

    return { allRestaurants, setAllRestaurants, filteredRestaurants, setFilteredRestaurants };
};

export default useRestaurant;
