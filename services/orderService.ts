import axiosInstance from "./instances/axiosInstance";

export const orderService = {
  getCustomerOrder: async () => {
    try {
      const response = await axiosInstance.get("/getCustomerOrder");
      return response.data;
    } catch (error: any) {
      console.error("Error fetching customer order:", error);
      return {
        success: false,
        error: error.response?.data || "Something went wrong",
        status: error.response?.status || 500,
      };
    }
  },
  getSingleOrder: async (orderId: number) => {
    try {
      const response = await axiosInstance.get(`/getSingleOrder/${orderId}`);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching customer order:", error);
      return {
        success: false,
        error: error.response?.data || "Something went wrong",
        status: error.response?.status || 500,
      };
    }
  },
};
