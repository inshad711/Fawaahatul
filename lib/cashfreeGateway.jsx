import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";

let cashfree;

const initializeCashfree = async () => {
  const sdk = await load({ mode: "sandbox" });
  cashfree = sdk;
};

export const cashfreePayment = async (
  user_type,
  items,
  customer,
  total_amount,
  payment_details,
  shipping_address,
  order_date,
  channel,
  is_full_paid,
  is_fulfilled,
  total_items,
  order_summary,
  currentCurrency,
  notes
) => {
  // console.log(currentCurrency, "currentCurrency");

  const transformedCart = items?.map((product) => ({
    id: product.id || 0,
    sku: product.slug || "default-sku",
    name: product.title || "Unknown Product",
    type: null,
    price: product.finalSellingPrice
      ? parseFloat(product.finalSellingPrice).toFixed(2)
      : product.sellingPrice
      ? product.sellingPrice.toFixed(2)
      : "0.00",
    status: "Publish",
    weight: null,
    quantity: product.quantity || 1,
    isvariant: product.isVariantProduct || false,
    categories: {
      category: "",
      subcategory: "",
      nested_subcategory: "",
    },
    variant_data: product.combination || null,
    variant_name: product.combination || null,
    variant_image: product.image?.url ? [product.image.url] : null,
    long_description: "Default long description",
    short_description: "Default short description",
  }));
  let transformedCustomer = {
    email: customer?.email || shipping_address?.email || "",
    phone: customer?.phone || shipping_address?.contactNumber || "",
    last_name: shipping_address?.lastName || "",
    first_name: shipping_address?.firstName || "",
    customer_id: String(customer?.customer_id) || null, // Assign random ID for guests
    default_address: {
      id: Math.floor(Math.random() * 1000), // Generate random ID for address
      city: shipping_address.city || "",
      state: shipping_address.state || "",
      store: customer?.store_name || "Guest Store",
      address: shipping_address.address || "",
      company: shipping_address.company || "Default Company",
      country: shipping_address.country || "IN",
      apartment: shipping_address.apartment || "Default Apartment",
      last_name: shipping_address.lastName || customer?.last_name || "",
      vendor_id: customer?.vendor_id || 0,
      created_at: new Date().toISOString(),
      first_name: shipping_address.firstName || customer?.first_name || "",
      postalcode: shipping_address.postalCode || "",
      updated_at: new Date().toISOString(),
      customer_id: customer?.customer_id || Math.floor(Math.random() * 1000),
      phones_address: shipping_address.contactNumber || "",
      default_address: true,
    },
  };

  const requestedData = {
    user_type,
    items: transformedCart,
    customer: transformedCustomer,
    total_amount,
    payment_details,
    shipping_address,
    order_date,
    channel,
    is_full_paid,
    is_fulfilled,
    total_items,
    order_summary,
    order_currency: currentCurrency,
    notes,
  };

  try {
    await initializeCashfree();
    const res = await axios.post(
      `${process.env.BACKEND}/api/payment-cashfree`,
      requestedData,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data?.payment_session_id) {
      const sessionId = res.data.payment_session_id;
      const currentOrderId = res.data.order_id;

      const checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      };

      const paymentResult = await cashfree.checkout(checkoutOptions);

      // If status is PAID or the paymentMessage suggests success, verify on server
      const shouldVerify =
        paymentResult?.status === "PAID" ||
        paymentResult?.paymentDetails?.paymentMessage
          ?.toLowerCase()
          .includes("payment finished") ||
        paymentResult?.paymentDetails?.paymentMessage
          ?.toLowerCase()
          .includes("successful");

      if (shouldVerify) {
        const serverStatus = await pollOrderStatus(currentOrderId);
        return serverStatus;
      }

      return {
        status: "failed",
        result: paymentResult,
        message:
          paymentResult?.paymentDetails?.paymentMessage ||
          "Payment not completed or was cancelled.",
      };
    }
  } catch (error) {
    console.error(error);
    return { status: "failed", message: error.message };
  }
};

const pollOrderStatus = async (orderId) => {
  let tries = 0;
  const maxTries = 10;

  while (tries < maxTries) {
    try {
      const abandonedCartId = localStorage.getItem("abandonedCartId");
      const url = abandonedCartId
        ? `${process.env.BACKEND}/api/order-status-cashfree/${orderId}?abandon_id=${abandonedCartId}`
        : `${process.env.BACKEND}/api/order-status-cashfree/${orderId}`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
      });
      if (res.data.status.toUpperCase() === "PAID") {
        return {
          status: "success",
          summary: res.data.order,
          message: "Payment successfully verified!",
        };
      }
    } catch (error) {
      // console.log("Pulling failed:", error);
    }
    await new Promise((resolve) => setTimeout(resolve, 5000)); // wait 5 seconds
    tries++;
  }

  return {
    status: "failed",

    message: "Payment not verified. Please contact support.",
  };
};
