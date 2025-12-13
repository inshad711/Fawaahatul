import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductData {
  average_rating?: number;
  name?: string;
  totalReviews?: number;
  price?: number;
  regularPrice?: number;
  isVariantProduct?: boolean;
  description?: string;
  gallery?: {
    url: string;
    alt: string;
  }[];
  variations?: {
    id: number;
    name: string;
    values: string[];
  }[];
  reviews?: {
    rating?: string;
    review_text?: string;
    review_id?: string;
    media?: {
      url: string;
      alt: string;
    }[];
    author?: {
      customer_id: number;
      email: string;
      id: number;
      name: string;
      type: string;
    };
  }[];
  overviewReviewData?: {
    star: number;
    count: number;
    average: number;
  }[];
  variationProducts?: {
    title: string;
    totalReviews: number;
    unit_price: number;
    variant_image: {
      url: string;
      alt: string;
    }[];
    productId: number;
    selectedOption: string;
    variantId: string;
    variants: {
      available: number;
      combine: string;
      id: number;
      price: number;
      regular_price: number;
      reviews?: {
        rating?: string;
        review_text?: string;
        review_id?: string;
        media?: {
          url: string;
          alt: string;
        }[];
        author?: {
          customer_id: number;
          email: string;
          id: number;
          name: string;
          type: string;
        };
      }[];
      overviewReviewData?: {
        star: number;
        count: number;
        average: number;
      }[];
    }[];
  }[];
}

interface ProductDataSlice {
  productData: ProductData | null;
}

export const productDataSlice = createSlice({
  name: "customerData",
  initialState: {
    productData: null,
  } as ProductDataSlice,
  reducers: {
    setProductData: (state, action: PayloadAction<ProductData>) => {
      state.productData = action.payload;
    },
    updateProductData: (state, action: PayloadAction<ProductData>) => {
      if (state.productData) {
        state.productData = { ...state.productData, ...action.payload };
      }
    },
    clearProductData: (state) => {
      state.productData = null;
    },
  },
});

export const { setProductData, updateProductData, clearProductData } =
  productDataSlice.actions;

export default productDataSlice.reducer;
