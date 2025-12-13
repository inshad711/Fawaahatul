import axiosInstance from "./instances/axiosInstance";

export const globalService = {
  fetchGlobalSettings: async () => {
    try {
      const response = await axiosInstance.get("/globalSettings");

      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
          status: response.status,
        };
      } else {
        return {
          success: false,
          data: response.data,
          status: response.status,
        };
      }
    } catch (error: any) {
      console.error("Error fetching global settings:", error);
      return {
        success: false,
        error: error.response?.data || "Something went wrong",
        status: error.response?.status || 500,
      };
    }
  },
};
