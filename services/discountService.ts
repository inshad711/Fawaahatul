import axiosInstance from "./instances/axiosInstance";

interface DiscountProps {}

export const discountService = {
  applyDiscountCode: async (requestedData: DiscountProps) => {
    try {
      const response = await axiosInstance.post(
        `/applyDiscount`,
        requestedData
      );
      return response.data;
    } catch (error: any) {
      console.error("Error applying discount:", error);
      return {
        success: false,
        data: [],
        error: error.response?.data || "Something went wrong",
        status: error.response?.status || 500,
      };
    }
  },
};
