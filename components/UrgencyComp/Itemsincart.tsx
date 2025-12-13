"use client";
import React, { useEffect, useState } from "react";
import SlidesPerView from "../Embla/SlidesPerView/SlidesPerView";
import { EmblaOptionsType } from "embla-carousel";
import Cookies from "js-cookie";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const OPTIONS: EmblaOptionsType = { align: "start" };
const Itemsincart = () => {
  const [items, setItems] = useState([]);
  const token = Cookies.get(process.env.AUTH_TOKEN!);
  const validated = useSelector((state: RootState) => state.toggle.validated);
  const storedCustomerData = useSelector(
    (state: RootState) => state.customerData.customerData
  );
  const cartUpdated = useSelector(
    (state: RootState) => state.cartToggle.cartUpdated
  );
  const toggleCartDrawer = useSelector(
    (state: RootState) => state.cartToggle.toggleCartDrawer
  );

  const fetchCartData = async () => {
    if (token) {
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
        const result = await response.json();

        setItems(result.data);
      } catch (error) {
        console.error("Internal Server Error", error);
      }
    } else {
      const guestCartData = JSON.parse(
        localStorage.getItem("guestCart") || "[]"
      );
      setItems(guestCartData);
    }
  };

  useEffect(() => {
    validated && fetchCartData();
  }, [validated, token, toggleCartDrawer, storedCustomerData]);

  if (items.length === 0) return null;

  return (
    <div className="templateContainer space-y-5 lg:space-y-8 py-6 md:py-8 lg:py-12">
      <h2 className="text-lg text-left lg:text-[1.75rem] !leading-[1.1] font-medium tracking-wide text-templateText">
        Items in your cart 🛍️
      </h2>
      <div>
        <SlidesPerView
          showCartCard={true}
          options={OPTIONS}
          loading={false}
          productCardData={items}
        />
      </div>
    </div>
  );
};

export default Itemsincart;
