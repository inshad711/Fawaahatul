import axiosInstance from "./instances/axiosInstance";

export const reviewService = {
  writeReview: async (requestedData: any) => {
    try {
      const response = await axiosInstance.post(
        `/write_a_review`,
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
