import axiosInstance from "./instances/axiosInstance";

export const bannerService = {
  getBanners: async () => {
    try {
      const response = await axiosInstance.get("/bannerList");
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error("Error fetching banners:", error);
      return {
        success: false,
        error: error.response?.data || "Something went wrong",
        status: error.response?.status || 500,
      };
    }
  },
};
