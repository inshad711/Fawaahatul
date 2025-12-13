// "use client";
// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import toast from "react-hot-toast";
// import { Loader2Icon } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { toggleCartDrawer } from "@/store/slice/CartToggle";

// interface Props {
//   productData: {
//     id: number;
//     name: string;
//     slug: string;
//     gallery: { url: string; alt: string }[];
//     regularPrice: number;
//     sellingPrice: number;
//     combination: any;
//   };
// }
// const AddToCart: React.FC<Props> = ({ productData }) => {
//   const reStructuredProductData = {
//     id: productData.id,
//     title: productData.name,
//     image: productData.gallery[0],
//     regularPrice: productData.regularPrice,
//     sellingPrice: productData.sellingPrice,
//     slug: productData.slug,
//     combination: productData.combination || null,
//   };

//   const isLogged = Cookies.get(process.env.AUTH_TOKEN!);
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);

//   const handleCart = () => {
//     if (isLogged) {
//       // Add to cart logic
//     } else {
//       // Guest checkout logic
//       setLoading(true);
//       setTimeout(() => {
//         try {
//           const guestCart = JSON.parse(
//             localStorage.getItem("guestCart") || "[]"
//           );
//           const productIndex = guestCart.findIndex(
//             (item: { productData: { id: number } }) =>
//               item.productData.id === productData?.id
//           );
//           if (productIndex !== -1) {
//             guestCart[productIndex].quantity += 1;
//             setLoading(false);
//             dispatch(toggleCartDrawer());
//           } else {
//             guestCart.push({ ...reStructuredProductData, quantity: 1 });
//             dispatch(toggleCartDrawer());
//             setLoading(false);
//           }
//           localStorage.setItem("guestCart", JSON.stringify(guestCart));
//         } catch (error) {
//           toast.error("An error occured. Please try again");
//         } finally {
//           setLoading(false);
//         }
//       }, 500);
//     }
//   };

//   return (
//     <div
//       onClick={handleCart}
//       className={`bg-templateBlack border w-full cursor-pointer border-templateBlack flex items-center justify-center gap-2 text-templateBackground text-[0.8rem] py-2.5 hover:opacity-90 text-center tracking-wider `}
//     >
//       {loading && <Loader2Icon size={14} className="animate-spin" />}
//       <span>Add To Cart</span>
//     </div>
//   );
// };

// export default AddToCart;
import React from "react";

const AddToCart = () => {
  return <div>AddToCart</div>;
};

export default AddToCart;
