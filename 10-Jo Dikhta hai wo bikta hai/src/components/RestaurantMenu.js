import { useParams } from "react-router";
import { RESTAURANT_MENU_IMG } from "../utils/constants";
import useRestaurantMenu from "../hooks/useRestaurantMenu";
import { truncateString } from "../utils/utility";
import ShimmerMenu from "./ShimmerMenu";

const RestaurantMenu = () => {
    const { resId } = useParams();

    const { resInfo, resMenu } = useRestaurantMenu(resId);

    if (resInfo === null) return <ShimmerMenu />;

    const { name, areaName, cuisines, costForTwoMessage } = resInfo;

    return (
        <div className="max-w-2xl w-full mx-auto my-10">
            {/* Restaurant Info */}
            <div className="mb-10">
                <h2 className="text-2xl font-bold">{name}</h2>
                <p>
                    Outlet: <span className="font-semibold">{areaName}</span>
                </p>
                <p>
                    {cuisines?.join(", ")} - {costForTwoMessage}
                </p>
            </div>

            <div>
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

const MenuCategory = (props) => {
    const { category } = props;
    return (
        <div>
            <h3 className="flex items-center justify-between border h-16 px-5 rounded-lg cursor-pointer font-bold text-lg">
                {category?.title} ({category?.itemCards?.length})<span>▼</span>
            </h3>
            <div className="space-y-10 my-7 divide-gray-300 divide-y rounded-lg px-3">
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

const NestedMenuCategory = (props) => {
    const { category } = props;
    return (
        <div>
            <h3 className="font-bold mb-5">{category?.title}</h3>
            {category?.categories?.map((subcategory) => (
                <div key={subcategory?.title}>
                    <h4 className="flex items-center justify-between border h-16 px-5 rounded-lg cursor-pointer font-bold text-lg">
                        <div>
                            {subcategory?.title} (
                            {subcategory?.itemCards?.length})
                        </div>
                        <span>▼</span>
                    </h4>
                    <div className="space-y-10 my-7 divide-gray-300 divide-y rounded-lg px-3">
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

const MenuItem = ({ item }) => {
    const { name, description, price, defaultPrice, imageId } = item;

    return (
        <div className="flex justify-between pb-10">
            <div className="w-1/2 space-y-2">
                {name && <h4 className="font-semibold">{name}</h4>}
                {description && (
                    <p className="text-gray-600">
                        {truncateString(description, 100)}
                    </p>
                )}
                {price && (
                    <p className="font-semibold">₹{(price / 100).toFixed(2)}</p>
                )}
                {defaultPrice && (
                    <p className="font-semibold">
                        ₹{(defaultPrice / 100).toFixed(2)}
                    </p>
                )}
            </div>

            <div className="w-40 h-36">
                {imageId && (
                    <img
                        className="w-full h-full object-cover rounded-lg"
                        src={RESTAURANT_MENU_IMG + imageId}
                        alt={name}
                    />
                )}
            </div>
        </div>
    );
};

export default RestaurantMenu;
