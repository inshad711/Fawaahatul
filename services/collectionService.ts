import axiosInstance from "./instances/axiosInstance";

export const collectionService = {
  getCategories: async () => {
    try {
      const response = await axiosInstance.get("dynamiccategories/getAll");
      // console.log(response.data);

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      return {
        success: false,
        error: error.response?.data || "Something went wrong",
        status: error.response?.status || 500,
      };
    }
  },
  getCollectionWithFilterAndSort: async (
    collectionName: any,
    filter: any,
    sortBy: any,
    customerId: any,
    page: any
  ) => {
    try {
      const query = new URLSearchParams();

      query.set("query", collectionName);

      if (page) {
        query.set("page", page);
      }

      if (customerId) {
        query.set("customerId", customerId);
      }

      if (filter && Object.keys(filter).length > 0) {
        const encodedFilter = JSON.stringify(filter);

        query.set("filter", encodedFilter);
      }

      if (sortBy) {
        query.set("sortBy", sortBy);
      }

      const response = await axiosInstance.get(
        `listFilter?${query.toString()}`
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching filter and sort:", error);
      return [];
    }
  },
  getAllCollections: async (page: number) => {
    try {
      const response = await axiosInstance.get(
        `getAllCollection?page=${page}&limit=15`
      );

      console.log(response.data, "response.data");

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      return {
        success: false,
        error: error.response?.data || "Something went wrong",
        status: error.response?.status || 500,
      };
    }
  },
  getCollectionsSEOFields: async (slug: string) => {
    try {
      const response = await axiosInstance.get(
        `/getCollectionSEOFields?slug=${slug}`
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error(`Error fetching product:`, error);
      return {
        success: false,
        error: error.response?.data || "Something went wrong",
        status: error.response?.status || 500,
      };
    }
  },
};
