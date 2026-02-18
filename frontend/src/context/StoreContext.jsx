import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';


export const StoreContext = createContext(null);

export default function StoreContextProvider(props) {

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const url = "https://foodadda-42kg.onrender.com";

    const addToCart = async (itemID) => {
        if (!cartItems[itemID]) {
            setCartItems((prev) => ({ ...prev, [itemID]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] + 1 }))
        }
        if (token) {
            const response = await axios.post(url + "/api/cart/add", { itemID }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
        }

    }

    const removeFromCart = async (itemID) => {
        setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] - 1 }))

        if (token) {
            const response = await axios.post(url + "/api/cart/remove", { itemID }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
        }
    }

    const clearCart = async () => {
        setCartItems({})
    }

    const getTotalOfItems = () => {
        let totalAmount = 0;

        for (let item in cartItems) {
            if (cartItems[item] > 0) {
                let foodInfo = food_list.find((product) => product._id === item);
                // totalAmount += foodInfo.price * cartItems[item];
                if (foodInfo) {   
                    totalAmount += foodInfo.price * cartItems[item];
                }
            }
        }

        return totalAmount;
    }

    const fetchFoodData = async () => {
        const response = await axios.get(url + "/api/foods/show");
        setFoodList(response.data.data);
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
        if (response.data.success) {
            setCartItems(response.data.cartData)
        }
    }

    useEffect(() => {
        const loadData = async () => {
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
            await fetchFoodData();
        }
        loadData();
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalOfItems,
        url,
        token,
        setToken,
        clearCart,
    }

    return (
        <StoreContext value={contextValue}>
            {props.children}
        </StoreContext>
    )
}
