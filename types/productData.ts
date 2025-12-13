export interface productData {
  data: {
    average_rating?: number;
    name?: string;
    totalReviews?: number;
    price?: number;
    regularPrice?: number;
    isVariantProduct?: boolean;
    preorder: boolean;
    description?: string;
    stock: {
      combination: string;
      stock: number;
    }[];
    gallery?: {
      url: string;
      alt: string;
    }[];
    variations: {
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
  };
}
