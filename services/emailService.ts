import axiosInstance from "./instances/axiosInstance";

export const emailService = {
  sendOtpOnMail: async (requestedData: any) => {
    try {
      const response = await axiosInstance.post(
        "/validateOtpByEmail",
        requestedData
      );

      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
          status: response.status,
        };
      } else {
        return {
          success: false,
          data: response.data,
          status: response.status,
        };
      }
    } catch (error: any) {
      console.error("Error sending OTP on email:", error);
      return {
        success: false,
        error: error.response?.data || "Something went wrong",
        status: error.response?.status || 500,
      };
    }
  },

  verifyOtp: async (requestedData: any) => {
    try {
      const response = await axiosInstance.post(
        "/verifyOtpByEmail",
        requestedData
      );

      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
          status: response.status,
        };
      } else {
        return {
          success: false,
          data: response.data,
          status: response.status,
        };
      }
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
