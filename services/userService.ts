import axiosInstance from "./instances/axiosInstance";

export const userService = {
  getUserDetails: async (customer_id: any) => {
    try {
      const response = await axiosInstance.get(
        `/GetUserDetailById`,
        customer_id
      );
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      }
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
  updateUserDetails: async (requestedData: any) => {
    try {
      const response = await axiosInstance.put(
        `/updateCustomerDetail`,
        requestedData
      );
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      }
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
  outOfStockNotifyMe: async (requestedData: any) => {
    try {
      const response = await axiosInstance.post(
        `/notifyWhenAvailable`,
        requestedData
      );
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      }
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
};
