"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { RootState } from "@/store/store";
import ProductTab from "./ProductTab";
import { productService } from "@/services/productService";

const TabWrapper: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<any>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const customerData = useSelector(
    (state: RootState) => state.customerData?.customerData
  );
  const validated = useSelector((state: RootState) => state.toggle.validated);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!validated || isFetched) return; // Prevent duplicate fetch calls

      setIsFetched(true);
      setLoading(true);

      try {
        const token = Cookies.get(process.env.AUTH_TOKEN!);
        const customerId = customerData?.customer_id;
        const url =
          customerId && token
            ? `/products/active_products?pageSize=12&customer_id=${customerId}`
            : `/products/active_products?pageSize=12`;

        const res = await productService.getProducts(url);

        if (res.success) {
          setProducts(res.data);
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

  return <ProductTab loading={loading} products={products} />;
};

export default TabWrapper;
