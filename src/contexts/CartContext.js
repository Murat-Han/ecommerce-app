import { useState, createContext, useContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("cartItems"))||[]);

  useEffect(() => {
    localStorage.setItem("cartItems",JSON.stringify(items));
  }, [items]);
  
  const addToCart = (product,findCartItem) => {
    if(!findCartItem){
      return setItems((prevState)=>[...prevState,product]);
    }
    const filtered=items.filter(item=>item._id!==product._id);
    setItems(filtered);
  };
  const removeFromCart=(productId)=>{
    const filtered=items.filter(item=>item._id!==productId);
    setItems(filtered);
  }
  const emptyCart=()=>setItems([]);

  const values = {
    items,
    setItems,
    addToCart,
    removeFromCart,
    emptyCart
  };
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
