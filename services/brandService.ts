import axiosInstance from "./instances/axiosInstance";

export const brandService = {
  getBrandsBySearch: async (searchKey: any) => {
    try {
      const response = await axiosInstance.get(
        `/getBrandsBySearch?query=${searchKey}`
      );
      // console.log(response.data);

      return response.data;
    } catch (error: any) {
      console.error("Error fetching :", error);
      return {
        success: false,
        error: error.response?.data || "Something went wrong",
        status: error.response?.status || 500,
      };
    }
  },
  shopByBrands: async () => {
    try {
      const response = await axiosInstance.get("/brandDetails");
      // console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching :", error);
      return {
        success: false,
        error: error.response?.data || "Something went wrong",
        status: error.response?.status || 500,
      };
    }
  },
};
