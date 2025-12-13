import axiosInstance from "./instances/axiosInstance";

export const checkoutService = {
  valideCheckoutCart: async (requestedData: any) => {
    try {
      const response = await axiosInstance.post(
        `/validCheckoutCart`,
        requestedData
      );
      return response.data;
    } catch (error: any) {
      console.error("Error validating cart:", error);
      return {
        success: false,
        data: [],
        error: error.response?.data || "Something went wrong",
        status: error.response?.status || 500,
      };
    }
  },
};
