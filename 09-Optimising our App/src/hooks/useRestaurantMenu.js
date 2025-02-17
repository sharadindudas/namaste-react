import { useState, useEffect } from "react";
import { RESTAURANT_MENU_API } from "../utils/constants";

const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);
    const [resMenu, setResMenu] = useState([]);

    useEffect(() => {
        // Fetching Restaurant Menu
        const fetchRestaurantMenu = async () => {
            try {
                const response = await fetch(RESTAURANT_MENU_API + resId);
                if (!response.ok) {
                    throw new Error("Failed to fetch restaurant menu");
                } else {
                    const json = await response.json();

                    // Restaurant info data
                    const restaurantInfo = json?.data?.cards?.find((obj) =>
                        obj?.card?.card["@type"]?.includes("food.v2.Restaurant")
                    )?.card?.card?.info;

                    // Restaurant menu data
                    const menuData = json?.data?.cards
                        ?.find((obj) => obj?.groupedCard)
                        ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
                            (obj) =>
                                obj?.card?.card["@type"]?.includes(
                                    "ItemCategory"
                                ) ||
                                obj?.card?.card["@type"]?.includes(
                                    "NestedItemCategory"
                                )
                        );

                    const organisedMenuData = menuData?.map((obj) => {
                        const type = obj?.card?.card["@type"];
                        const title = obj?.card?.card?.title;
                        const itemCards = obj?.card?.card?.itemCards;
                        const categories = obj?.card?.card?.categories;

                        if (type?.includes("Nested")) {
                            return {
                                title,
                                type: "nested",
                                categories: categories?.map((subcategory) => ({
                                    title: subcategory?.title,
                                    itemCards: subcategory?.itemCards
                                }))
                            };
                        } else {
                            return {
                                title,
                                type: "item",
                                itemCards
                            };
                        }
                    });
                    setResInfo(restaurantInfo);
                    setResMenu(organisedMenuData);
                }
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchRestaurantMenu();
    }, []);

    return { resInfo, resMenu };
};

export default useRestaurantMenu;
