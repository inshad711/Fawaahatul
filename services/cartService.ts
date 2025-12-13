import axiosInstance from "./instances/axiosInstance";

export const cartService = {
  getUserCartData: async (customerId: any) => {
    try {
      const response = await axiosInstance.get(`/cart/all/${customerId}`);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching User Cart Data:", error);
      return {
        success: false,
        data: [],
        error: error.response?.data || "Something went wrong",
        status: error.response?.status || 500,
      };
    }
  },
  validateCart: async (requestedData: any) => {
    try {
      const response = await axiosInstance.post(
        `/validateGuestCart`,
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
  removeSingleItemFromCart: async (cartItemId: any) => {
    try {
      const response = await axiosInstance.delete(
        `/delete_cart_item/${cartItemId}`
      );
      return {
        success: true,
        data: response.data,
      };
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
  manageAbandonedCart: async (
    cart_data: any,
    total_amount: any,
    checkout_source: any
  ) => {
    const requestedData = {
      cart_data,
      total_amount,
      checkout_source,
    };
    try {
      const response = await axiosInstance.post(
        `/manage-abandoned-checkout`,
        requestedData
      );
      return {
        success: true,
        data: response.data.data,
      };
    } catch (error: any) {
      console.error("Error managing abandoned cart:", error);
      return {
        success: false,
        data: [],
        error: error.response?.data || "Something went wrong",
        status: error.response?.status || 500,
      };
    }
  },
};
