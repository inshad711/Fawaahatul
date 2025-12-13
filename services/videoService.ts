import axiosInstance from "./instances/axiosInstance";

export const videoService = {
  getUserDetails: async () => {
    try {
      const response = await axiosInstance.get(`/getAllShorts_outsource`);

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
