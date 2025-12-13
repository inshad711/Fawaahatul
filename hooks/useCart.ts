// "use client";
// import useCartStore from "@/store/useCartStore";
// import { useToggleStore } from "@/store/useToggleStore";
// import Cookies from "js-cookie";
// import { useState } from "react";

// const GUEST_CART_KEY = process.env.GUEST_CART_KEY!;
// const AU_AUTH = process.env.AU_AUTH!;

// export const useCart = () => {
//   const token = Cookies.get(AU_AUTH);
//   const [addingCart, setAddingCart] = useState(false);
//   const { toggleCartDrawer, setUpdatingCart } = useToggleStore();
//   const { cartItems, setCart } = useCartStore();

//   const getLocalCart = () => {
//     if (typeof window !== "undefined") {
//       const localCart = localStorage.getItem(GUEST_CART_KEY);
//       return localCart ? JSON.parse(localCart) : [];
//     }
//     return [];
//   };

//   const saveLocalCart = (items: any[]) => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
//     }
//   };

//   const loadCart = async () => {
//     if (token) {
//       console.log("Loading cart from DB");
//       // Fetch from backend and setCart(response.data)
//     } else {
//       console.log("Loading cart from LOCAL");
//       setCart(getLocalCart());
//     }
//   };

//   const addItem = (item: any) => {
//     setAddingCart(true);

//     if (token) {
//       console.log("Send item to DB", item);
//       toggleCartDrawer();
//       setAddingCart(false);
//     } else {
//       const items = getLocalCart();
//       const index = items.findIndex(
//         (i: any) =>
//           i.item_id === item.item_id && i.variant_name === item.variant_name
//       );

//       if (index !== -1) {
//         items[index].item_quantity += item.item_quantity;
//       } else {
//         items.push(item);
//       }

//       saveLocalCart(items);
//       setCart(items);
//       toggleCartDrawer();
//       setAddingCart(false);
//     }
//   };

//   const updateQuantity = (item: any, operation: "increment" | "decrement") => {
//     setUpdatingCart(true);

//     if (token) {
//       console.log(`${operation} item in DB`, item);
//       // TODO: send request to backend here
//       setUpdatingCart(false);
//     } else {
//       const items = getLocalCart();
//       const index = items.findIndex(
//         (i: any) =>
//           i.item_id === item.item_id && i.variant_name === item.variant_name
//       );

//       if (index !== -1) {
//         if (operation === "increment") {
//           items[index].item_quantity += 1;
//         } else if (operation === "decrement") {
//           if (items[index].item_quantity > 1) {
//             items[index].item_quantity -= 1;
//           } else {
//             items.splice(index, 1);
//           }
//         }

//         saveLocalCart(items);
//         setCart(items);
//       }

//       setUpdatingCart(false);
//     }
//   };

//   const removeItem = (item: any) => {
//     setUpdatingCart(true);

//     if (token) {
//       console.log("Remove item from DB", item);
//       // TODO: send remove request to backend
//       setUpdatingCart(false);
//     } else {
//       const items = getLocalCart().filter(
//         (i: any) =>
//           !(i.item_id === item.item_id && i.variant_name === item.variant_name)
//       );

//       saveLocalCart(items);
//       setCart(items);
//       setUpdatingCart(false);
//     }
//   };

//   const clearCart = () => {
//     setUpdatingCart(true);

//     if (token) {
//       console.log("Clear all items from DB cart");
//       // TODO: send clear request to backend
//       setUpdatingCart(false);
//     } else {
//       if (typeof window !== "undefined") {
//         localStorage.removeItem(GUEST_CART_KEY);
//       }
//       setCart([]);
//       setUpdatingCart(false);
//     }
//   };

//   const totalItems = (() => {
//     const items = token ? cartItems : getLocalCart();
//     return items.reduce(
//       (sum: number, item: any) => sum + item.item_quantity,
//       0
//     );
//   })();

//   const totalPrice = (() => {
//     const items = token ? cartItems : getLocalCart();
//     return items.reduce(
//       (sum: number, item: any) => sum + item.item_price * item.item_quantity,
//       0
//     );
//   })();

//   return {
//     addingCart,
//     updateQuantity,
//     removeItem,
//     clearCart,
//     loadCart,
//     addItem,
//     totalItems,
//     totalPrice,
//   };
// };
