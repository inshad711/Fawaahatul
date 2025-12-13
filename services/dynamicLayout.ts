import axiosInstance from "./instances/axiosInstance";

export const dynamicLayoutService = {
  desktopDynamicLayout: async (cursor: number) => {
    try {
      const response = await axiosInstance.get(
        `/manage_home_layout_get?cursor=${cursor}`
      );

      return {
        success: true,
        data: response.data,
      };
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
  mobileDynamicLayout: async (cursor: number) => {
    try {
      const response = await axiosInstance.get(
        `/mobile_manage_home_layout_get_cursor?cursor=${cursor}`
      );

      return {
        success: true,
        data: response.data,
      };
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
