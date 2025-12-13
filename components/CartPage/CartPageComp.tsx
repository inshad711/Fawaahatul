"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LinkButton from "../Button/LinkButton";
import CartProductList from "./CartProductList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";
import CartPageSkeleton from "../Skeletons/CartPageSkeleton";
import { cartService } from "@/services/cartService";
import { setCartData } from "@/store/slice/CheckoutPage/checkoutSlice";
import FormatAmount from "./FormatAmount";

const renderEmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-4 gap-2">
      <div className="flex items-center justify-center">
        <Image
          src={"/assets/placeholders/emptycart.webp"}
          alt="empty cart"
          height={150}
          sizes="150px"
          className="h-auto object-contain"
          width={150}
        />
      </div>
      <h3 className="text-xl tracking-wider font-medium">
        Your cart is currently empty
      </h3>
      <LinkButton link="/collections" text="Return to shop" />
    </div>
  );
};

interface CartData {
  cart_id: number;
  title: string;
  sellingPrice: number;
  itemTotal: number;
  quantity: number;
  image: {
    url: string;
    alt: string;
  };
}

const renderCartDetail = (
  cartData: CartData[],
  grandTotal: Number,
  setRefetch: any
) => {
  return (
    <div className="space-y-10 lg:space-y-16">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium tracking-wide">Cart</h2>
        <h3 className="border-b border-gray-500 text-sm tracking-wide">
          <Link href={"/collections"}>Return to shop</Link>
        </h3>
      </div>
      {/* ------------- */}
      <div>
        <div className="grid grid-cols-2 lg:grid-cols-[40%,20%,20%,20%] gap-2 py-5 border-b">
          <div className="uppercase  text-xs text-gray-500 font-medium tracking-wider">
            Product
          </div>
          <div className="hidden lg:block  uppercase text-right text-xs text-gray-500 font-medium tracking-wider">
            Price
          </div>
          <div className="hidden lg:block  uppercase text-xs text-right text-gray-500 font-medium tracking-wider">
            Quantity
          </div>
          <div className="uppercase text-right  text-xs  text-gray-500 font-medium tracking-wider">
            Total
          </div>
        </div>
        {/* --------- */}
        <div>
          {cartData?.map((item, index) => (
            <div key={index}>
              <CartProductList cartData={item} setRefetch={setRefetch} />
            </div>
          ))}
        </div>
        {/* ---------- */}
        {/* SUBTOTAL */}
        <div className="flex flex-col items-center lg:items-end space-y-4 pt-8">
          <div className="flex items-center  gap-5">
            <p className="capitalize text-sm mt-1 font-medium tracking-wider">
              Subtotal
            </p>
            <p className="text-lg font-medium">
              <FormatAmount price={grandTotal} />
            </p>
          </div>
          <p className="text-xs text-gray-500 font-medium tracking-wider">
            Tax &{" "}
            <Link className="underline" href={"/policies/shipping-policy"}>
              Shipping
            </Link>{" "}
            calculated at checkout.
          </p>

          <Link href={"/checkout"}>
            <button className="w-full lg:w-[300px] hover:opacity-90 text-sm py-3 bg-templatePrimary text-white">
              CHECK OUT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartPageComp = () => {
  const [refetch, setRefetch] = useState(false);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState<any[] | null>(null);
  const validated = useSelector((state: RootState) => state.toggle.validated);
  const customerData = useSelector(
    (state: RootState) => state.customerData?.customerData
  );

  const isLoggedIn = Boolean(customerData?.customer_id);

  const loadGuestCart = (): any[] => {
    try {
      const storedCart = localStorage.getItem("guestCart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to load guest cart:", error);
      return [];
    }
  };

  const loadUserCart = async () => {
    try {
      const response = await cartService.getUserCartData(
        customerData?.customer_id
      );
      if (response?.success) {
        setCartItems(response.data);
        // dispatch( setCartData({
        //   cart: res.data,
        //   totalDiscount: "",
        //   discount_value: 0,
        //   discountType: "",
        //   totalAmount: res.totalAmount || 0,
        //   totalTax: res.totalTax || 0,
        //   totalTaxableAmount: res.totalTaxableAmount || 0,
        // }))
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    if (!validated) return;

    if (isLoggedIn) {
      loadUserCart();
    } else {
      const guestCart = loadGuestCart();
      const totalAmount =
        guestCart?.reduce(
          (total: number, item: any) =>
            total + item.sellingPrice * item.quantity,
          0
        ) || 0;

      dispatch(
        setCartData({
          cart: guestCart,
          totalDiscount: "",
          discount_value: 0,
          discountType: "",
          totalAmount: totalAmount,
          totalTax: 0,
          totalTaxableAmount: 0,
        })
      );
      setCartItems(guestCart);
    }
  }, [validated, refetch]);

  const totalAmount = cartItems?.reduce(
    (total: number, item: any) => total + item.sellingPrice * item.quantity,
    0
  );

  if (cartItems === null) {
    return <CartPageSkeleton />;
  }

  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="templateContainer lg:!px-20 space-y-10 lg:space-y-14 py-4 md:py-8 lg:py-12">
      {isCartEmpty
        ? renderEmptyCart()
        : renderCartDetail(cartItems, Number(totalAmount), setRefetch)}
    </div>
  );
};

export default CartPageComp;
