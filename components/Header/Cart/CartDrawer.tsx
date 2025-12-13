"use client";

import { RootState } from "@/store/store";
import { Loader2, ShoppingBag } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import CartList from "./CartList";
import EmptyCart from "./EmptyCart";
import Cookies from "js-cookie";
import LiveCartList from "./LiveCartList";
import { setCartItems } from "@/store/slice/cartItemSlice";

interface Props {
  variation: number;
}

const CartDrawer: React.FC<Props> = ({ variation }) => {
  const token = Cookies.get(process.env.AUTH_TOKEN!);
  const [localCartItems, setLocalCartItems] = useState<any[]>([]);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const isMounted = useRef(false);
  const [loading, setLoading] = useState(true);
  const cartItem = useSelector((state: RootState) => state.cartItem);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showCartDrawer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [showCartDrawer]);

  const noOfQuantityInCart = localCartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const storedCustomerData = useSelector(
    (state: RootState) => state.customerData.customerData
  );
  const cartUpdated = useSelector(
    (state: RootState) => state.cartToggle.cartUpdated
  );
  const toggleCartDrawer = useSelector(
    (state: RootState) => state.cartToggle.toggleCartDrawer
  );

  const cartTotal = useSelector(
    (state: RootState) => state.cartTotal.cartTotal
  );

  async function fetchLoggedInCartData() {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.BACKEND}/api/cart/all/${storedCustomerData?.customer_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      dispatch(
        setCartItems({
          items: result.data,
          grandTotal: result.totalAmount,
        })
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching logged-in cart data:", error);
      return [];
    } finally {
      setLoading(false);
    }
  }

  const fetchCartData = async () => {
    if (!token) {
      // Fetch data from localStorage for guest users
      const guestCartData = JSON.parse(
        localStorage.getItem("guestCart") || "[]"
      );
      setLocalCartItems(guestCartData);
      setLoading(false);
    } else if (token && showCartDrawer) {
      // Fetch cart data for logged-in users
      storedCustomerData && fetchLoggedInCartData();
    }
  };

  const handleCartToggle = () => {
    setShowCartDrawer((prev) => !prev);
  };

  // Initialize user login status and fetch cart data
  useEffect(() => {
    fetchCartData();
  }, []);

  // Update cart data and show the cart drawer when `cartUpdated` or `toggleCartDrawer` changes
  useEffect(() => {
    fetchCartData();
  }, [cartUpdated, showCartDrawer]);

  useEffect(() => {
    if (isMounted.current) {
      // Only execute after the component has mounted
      setShowCartDrawer(true);
    } else {
      // Mark as mounted on the first render
      isMounted.current = true;
    }
  }, [toggleCartDrawer, cartUpdated]);

  return (
    <>
      {/* Cart Icon */}
      <div
        className="max-h-5 max-w-5 cursor-pointer relative"
        onClick={handleCartToggle}
      >
        {token ? (
          <>
            {cartTotal > 0 && (
              <span
                className={`${
                  variation === 1
                    ? "bg-white text-black"
                    : "bg-white text-black"
                } text-[11px] leading-none rounded-full h-5 w-5 flex items-center justify-center absolute -top-3 -right-2`}
              >
                {cartTotal}
              </span>
            )}
          </>
        ) : (
          <>
            {localCartItems.length > 0 && (
              <span
                className="bg-templateText text-black lg:text-[11px] leading-none rounded-full 
            h-5 w-5 flex items-center justify-center absolute -top-2 -right-2"
              >
                {noOfQuantityInCart}
              </span>
            )}
          </>
        )}
        <ShoppingBag
          strokeWidth={1.5}
          color={variation === 1 ? "white" : "white"}
          className={`h-[95%] w-[95%] hover:scale-95 hover:text-templatePrimary 
          text-templateText transition-all ease-in-out`}
        />
      </div>

      {showCartDrawer && (
        <div
          className={`fixed inset-0 bg-white/25 backdrop-blur-sm z-40 transition-opacity ease-in-out duration-500`}
          onClick={handleCartToggle}
        ></div>
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed h-full bottom-0 right-0 w-[90%] text-templateText md:w-[400px] !z-[9999999999999] bg-templateBackground shadow-lg 
        transition-transform duration-500  ease-in-out transform ${
          showCartDrawer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          onClick={handleCartToggle}
          className="cursor-pointer absolute right-5 top-5"
        >
          <IoMdClose size={22} className="text-templateText" />
        </div>
        {loading && (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="animate-spin" size={30} strokeWidth={1.5} />
          </div>
        )}
        {token ? (
          <>
            {cartItem?.items?.length > 0 ? (
              <LiveCartList loading={loading} />
            ) : (
              <EmptyCart handleCartToggle={handleCartToggle} />
            )}
          </>
        ) : (
          <>
            {localCartItems.length > 0 ? (
              <CartList
                cartData={localCartItems}
                fetchCartData={fetchCartData}
              />
            ) : (
              <EmptyCart handleCartToggle={handleCartToggle} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
