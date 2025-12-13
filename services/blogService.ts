import axiosInstance from "./instances/axiosInstance";

export const blogService = {
  getBlogs: async (currentPage?: any, perPage?: any) => {
    try {
      const query = new URLSearchParams();

      if (currentPage) {
        query.set("page", currentPage);
      }

      if (perPage) {
        query.set("perPage", perPage);
      }
      const response = await axiosInstance.get(
        `/getAllBlogs?${query.toString()}`
      );
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
  getBlogBySlug: async (slug: any) => {
    try {
      const response = await axiosInstance.get(`/blog/${slug}`);

      return {
        status: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error("Error fetching blog by slug:", error);
      return {
        success: false,
        error: error.response?.data || "Something went wrong",
        status: error.response?.status || 500,
      };
    }
  },
};
