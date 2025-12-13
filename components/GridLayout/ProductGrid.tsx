// E:\hutzdiecast.com-main\components\GridLayout\ProductGrid.tsx
"use client";
import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { productService } from "@/services/productService";
import MainProductCard from "../Cards/MainProductCard";

const ProductGrid = ({ text, limit }: { text: string; limit: number }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<any>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const customerData = useSelector(
    (state: RootState) => state.customerData?.customerData
  );
  const validated = useSelector((state: RootState) => state.toggle.validated);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!validated || isFetched) return;

      setIsFetched(true);
      setLoading(true);

      try {
        const token = Cookies.get(process.env.AUTH_TOKEN!);
        const customerId = customerData?.customer_id;
        const url =
          customerId && token
            ? `/products/active_products?pageSize=${limit}&customer_id=${customerId}`
            : `/products/active_products?pageSize=${limit}`;

        const res = await productService.getProducts(url);
        if (res.success) {
          setProducts(res.data);
          // console.log(res.data);
        } else {
          console.error("Failed to fetch products:", res);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [validated, isFetched, customerData]);

  if (!products) return null;

  return (
    <div className="templateContainer bg-templateBackground py-6 space-y-8 md:py-8 lg:py-12">
      <div className="space-y-0.5">
        <h2 data-aos="fade-up" className="sectionHeading">
          {text}
        </h2>
        <p
          data-aos="fade-up"
          className="tracking-wider text-center text-[13px] text-gray-200"
        >
          Handpicked just for you
        </p>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-5 lg:gap-y-8">
        {products?.map((item: any, index: number) => (
          <div
            key={index}
            data-aos="fade-up"
          // data-aos-delay={`${index * 150}`}
          >
            <MainProductCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
