import axiosInstance from "./instances/axiosInstance";

export const clientService = {
  clientShowcase: async () => {
    try {
      const response = await axiosInstance.get(`/getClients`);
      console.log(response, "Bhaada in train");

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
