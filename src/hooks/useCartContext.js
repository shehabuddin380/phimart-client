import { useContext } from "react";
import CartContext from "../context/CartCotext";

const useCartContext = () => {
  return useContext(CartContext);
};

export default useCartContext;