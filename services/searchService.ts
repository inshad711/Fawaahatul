import axiosInstance from "./instances/axiosInstance";

export const searchService = {
  getSearchResults: async (query: string, customerId: any) => {
    try {
      const url = customerId
        ? `/getSearchProductKeywords?query=${query}&userId=${customerId}`
        : `/getSearchProductKeywords?query=${query}`;
      const response = await axiosInstance.get(url);
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
  getBeforeSearchResults: async () => {
    try {
      const response = await axiosInstance.get(`/search-history/trending`);
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
