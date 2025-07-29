import { createContext } from "react";
import {product} from "../assets/assets.js"

export const ShopContext = createContext();

export const ShopContextProvider = ({children}) =>{
    
    const currency = '₹'; 
    const delivery_fee = 10;


    const value = {
        product , currency, delivery_fee

    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;