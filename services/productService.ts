import axiosInstance from "./instances/axiosInstance";

export const productService = {
  getProducts: async (url: string) => {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching products from ${url}:`, error);
      return {
        success: false,
        error: error.response?.data || "Something went wrong",
        status: error.response?.status || 500,
      };
    }
  },
  getProductsBySlug: async (slug: string, variants: string) => {
    try {
      const response = await axiosInstance.get(
        `/getProductBySlug/${slug}?variants=${variants}`
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error(`Error fetching product:`, error);
      return {
        success: false,
        error: error.response?.data || "Something went wrong",
        status: error.response?.status || 500,
      };
    }
  },
  getProductsSEOFields: async (slug: string) => {
    try {
      const response = await axiosInstance.get(
        `/getProductsSEOFields?slug=${slug}`
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error(`Error fetching product:`, error);
      return {
        success: false,
        error: error.response?.data || "Something went wrong",
        status: error.response?.status || 500,
      };
    }
  },
};
