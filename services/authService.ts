import axiosInstance from "./instances/axiosInstance";

export const authService = {
  sendOtp: async (email: string) => {
    try {
      const response = await axiosInstance.post("/login-send-otp", { email });
      return response.data;
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      return {
        success: false,
        error: error.response?.data || "Something went wrong",
        status: error.response?.status || 500,
      };
    }
  },
  verifyOtp: async (email: string, otp: string, cartPayload: any) => {
    try {
      const response = await axiosInstance.post("/verify-login-otp", {
        email,
        otp,
        cartPayload,
      });

      return response.data;
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      return {
        success: false,
        error: error.response?.data || "Something went wrong",
        status: error.response?.status || 500,
      };
    }
  },
};
