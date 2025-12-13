import axiosInstance from "./instances/axiosInstance";

export const sitemapService = {
  getProductsSitemap: async () => {
    try {
      const response = await axiosInstance.get(`/getProductSitemap`);

      return response.data;
    } catch (error: any) {
      console.error("Error fetching client showcase :", error);
      return {
        success: false,
        data: [],
        error: error.response?.data || "Something went wrong",
        status: error.response?.status || 500,
      };
    }
  },
  getCollectionSitemap: async () => {
    try {
      const response = await axiosInstance.get(`/getCollectionSitemap`);

      return response.data;
    } catch (error: any) {
      console.error("Error fetching client showcase :", error);
      return {
        success: false,
        data: [],
        error: error.response?.data || "Something went wrong",
        status: error.response?.status || 500,
      };
    }
  },
};
