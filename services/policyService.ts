import axiosInstance from "./instances/axiosInstance";

export const policyService = {
  getPolicy: async (pageName: string) => {
    try {
      const response = await axiosInstance.get(`/get-policy?page=${pageName}`);
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
};
