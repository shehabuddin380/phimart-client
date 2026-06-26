import { useCallback, useEffect, useState } from "react";
import authApiClient from "../services/auth-api-client";

const useCart = () => {
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
  const [loading, setLoading] = useState(false);

  const createOrGetCart = useCallback(async () => {
    setLoading(true);
    try {
      // cart POST করো — backend get_or_create করবে
      const response = await authApiClient.post("/carts/");
      const newCartId = response.data.id;
      localStorage.setItem("cartId", newCartId);
      setCartId(newCartId);
      setCart(response.data);
      return newCartId;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const AddCartItems = useCallback(
    async (product_id, quantity) => {
      setLoading(true);
      try {
        let currentCartId = cartId;
        if (!currentCartId) {
          currentCartId = await createOrGetCart();
        }
        const response = await authApiClient.post(
          `/carts/${currentCartId}/items/`,
          { product_id, quantity }
        );
        return response.data;
      } catch (error) {
        console.log("Error adding Items", error);
      } finally {
        setLoading(false);
      }
    },
    [cartId, createOrGetCart]
  );

  const updateCartItemQuantity = useCallback(
    async (itemId, quantity) => {
      try {
        await authApiClient.patch(`/carts/${cartId}/items/${itemId}/`, {
          quantity,
        });
      } catch (error) {
        console.log("Error updating cart items", error);
      }
    },
    [cartId]
  );

  const deleteCartItems = useCallback(
    async (itemId) => {
      try {
        await authApiClient.delete(`/carts/${cartId}/items/${itemId}/`);
      } catch (error) {
        console.log(error);
      }
    },
    [cartId]
  );

  useEffect(() => {
    const initializeCart = async () => {
      setLoading(true);
      await createOrGetCart();
      setLoading(false);
    };
    initializeCart();
  }, []);

  return {
    cart,
    loading,
    cartId,
    createOrGetCart,
    AddCartItems,
    updateCartItemQuantity,
    deleteCartItems,
  };
};

export default useCart;