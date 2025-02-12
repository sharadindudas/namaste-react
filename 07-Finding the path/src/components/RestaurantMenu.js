import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { RESTAURANT_MENU_API, RESTAURANT_MENU_IMG } from "../utils/constants";
import { useParams } from "react-router";
import "../css/menu.css";

const RestaurantMenu = () => {
    const [resInfo, setResInfo] = useState(null);
    const [resMenu, setResMenu] = useState([]);
    const { resId } = useParams();

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
                    setResInfo(
                        json?.data?.cards?.find((item) =>
                            item?.card?.card["@type"]?.includes(
                                "food.v2.Restaurant"
                            )
                        )?.card?.card?.info
                    );

                    // Restaurant menu data
                    const menuData = json?.data?.cards
                        ?.find((item) => item?.groupedCard)
                        ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
                            (item) =>
                                item?.card?.card["@type"]?.includes(
                                    "ItemCategory"
                                ) ||
                                item?.card?.card["@type"]?.includes(
                                    "NestedItemCategory"
                                )
                        );
                    const organisedMenuData = menuData?.map((item) => {
                        const type = item?.card?.card["@type"];
                        const title = item?.card?.card?.title;
                        const itemCards = item?.card?.card?.itemCards || [];
                        const categories = item?.card?.card?.categories || [];

                        if (type?.includes("NestedItemCategory")) {
                            return {
                                title,
                                type: "nested",
                                categories: categories?.map((category) => ({
                                    title: category?.title,
                                    itemCards: category?.itemCards || []
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
                    setResMenu(organisedMenuData);
                }
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchRestaurantMenu();
    }, []);

    if (resInfo === null) return <Shimmer />;

    const { name, areaName, cuisines, costForTwoMessage } = resInfo || {};

    return (
        <div
            className="menu-container"
            style={{
                margin: "30px auto"
            }}
        >
            <div
                style={{
                    margin: "0 0 20px 0"
                }}
            >
                <h2>{name}</h2>
                <p>
                    Outlet: <span>{areaName}</span>
                </p>
                <p>
                    {cuisines?.join(", ")} - {costForTwoMessage}
                </p>
            </div>

            <div className="menu-categories">
                {resMenu?.map((category) =>
                    category?.type === "nested" ? (
                        <NestedMenuCategory
                            key={category?.title}
                            category={category}
                        />
                    ) : (
                        <MenuCategory
                            key={category?.title}
                            category={category}
                        />
                    )
                )}
            </div>
        </div>
    );
};

const NestedMenuCategory = (props) => {
    const { category } = props;
    return (
        <div className="nested-menu-category">
            <h3 className="nested-category-name">{category?.title}</h3>
            {category?.categories?.map((subcategory) => (
                <div key={subcategory?.title}>
                    <h4 className="category-name">
                        <div>
                            {subcategory?.title} (
                            {subcategory?.itemCards?.length})
                        </div>
                        <span>▼</span>
                    </h4>
                    <div className="menu-items">
                        {subcategory?.itemCards?.map((item) => (
                            <MenuItem
                                key={item?.card?.info?.id}
                                item={item?.card?.info}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const MenuCategory = (props) => {
    const { category } = props;
    return (
        <div className="menu-category">
            <h3 className="category-name">
                <div>
                    {category?.title} ({category?.itemCards?.length})
                </div>
                <span>▼</span>
            </h3>
            <div className="menu-items">
                {category?.itemCards?.map((item) => (
                    <MenuItem
                        key={item?.card?.info?.id}
                        item={item?.card?.info}
                    />
                ))}
            </div>
        </div>
    );
};

const MenuItem = ({ item }) => {
    const { name, description, price, imageId } = item;

    return (
        <div className="menu-item">
            <div className="left">
                {name && <h4>{name}</h4>}
                {description && <p>{description}</p>}
                {price && <p>Price: ₹{(price / 100).toFixed(2)}</p>}
            </div>
            <div className="right">
                {imageId && (
                    <img src={RESTAURANT_MENU_IMG + imageId} alt={name} />
                )}
            </div>
        </div>
    );
};

export default RestaurantMenu;
