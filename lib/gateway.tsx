// Declare Razorpay on the window object
declare global {
  interface Window {
    Razorpay: any;
  }
}

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const scriptId = "razorpay-script";

    // Check if the script is already loaded
    if (document.getElementById(scriptId)) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId; // Assign an ID to the script element
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

export const createOrderId = async (amount: any, credentials: any) => {
  try {
    // Convert PAYMENT_AMOUNT to a number

    if (isNaN(amount)) {
      throw new Error("Invalid PAYMENT_AMOUNT value");
    }

    const response = await fetch("/api/createVendorRazorpaytest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100, // Convert to the smallest currency unit
        credentials,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.orderId;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
  }
};

export const razorpayPayment = async (
  amount: any,
  description: any,
  credentials: any,
  currentCurrency: any,
  cartItems: any,
  customerData: any,
  shippingAddress: any,
  shippingCharges: any,
  summary: any,
  notes: any
) => {
  try {
    const order_id = await createOrderId(amount, credentials);

    await loadRazorpayScript();

    return new Promise((resolve) => {
      const options = {
        key: credentials?.key,
        amount: parseFloat(amount) * 100,
        currency: currentCurrency,
        description: description,
        order_id: order_id,
        handler: async function (response: any) {
          const dataRes = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            razorpay_secret: credentials?.secret,
          };

          const result = await fetch("/api/verify", {
            method: "POST",
            body: JSON.stringify(dataRes),
            headers: { "Content-Type": "application/json" },
          });

          const res = await result.json();
          if (res.isOk) {
            setTimeout(async () => {
              const orderUploadResponse = await uploadOrder(
                dataRes,
                cartItems,
                summary,
                amount,
                customerData,
                shippingAddress,
                "razorpay",
                "Paid",
                shippingCharges,
                notes
              );

              resolve({
                ok: true,
                success: true,
                paymentResponse: res,
                orderResponse: orderUploadResponse,
                message: "Order Created",
              });
            }, 3000);
          } else {
            resolve({
              success: false,
              message: res.message,
            });
          }
        },
        prefill: { name: "", email: "" },
        theme: { color: "#3399cc" },
        modal: {
          ondismiss: () => {
            console.warn(
              "🔴 User closed the Razorpay modal without completing payment."
            );
            return resolve({
              success: false,
              error: "Payment was cancelled by the user.",
            });
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        resolve({ success: false, message: response.error.description });
      });

      paymentObject.open();
    });
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};

export const uploadOrder = async (
  paymentDetails: any,
  items: any,
  summary: any,
  totalAmount: any,
  customer: any,
  shipping_address: any,
  channel: string,
  paymentStatus: any,
  shippingCharges: any,
  notes: any
) => {
  try {
    // console.log(shipping_address);
    // return { success: true, message: "Return from makeOrder" };
    const transformedCart = items?.map((product: any) => ({
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
      customer_id: customer?.customer_id || null, // Assign random ID for guests
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

    const generateOrderDate = () => {
      const now = new Date();
      const offset = now.getTimezoneOffset() * -1; // Timezone offset in minutes
      const offsetHours = Math.floor(offset / 60);
      const offsetMinutes = offset % 60;

      const formattedOffset = `${offsetHours >= 0 ? "+" : "-"}${String(
        Math.abs(offsetHours)
      ).padStart(2, "0")}:${String(offsetMinutes).padStart(2, "0")}`;

      return (
        `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(now.getDate()).padStart(2, "0")} ` +
        `${String(now.getHours()).padStart(2, "0")}:${String(
          now.getMinutes()
        ).padStart(2, "0")}:${String(now.getSeconds()).padStart(
          2,
          "0"
        )}.${String(now.getMilliseconds()).padEnd(6, "0")}${formattedOffset}`
      );
    };

    // const taxPercentage = 0.18; // 18% GST/VAT tax
    // const shippingAmount = parseFloat(shippingCharges?.flatRate) || 0; // Ensure valid shipping value

    // ✅ Step 1: Correct Subtotal Extraction
    // const subtotal = (totalAmount - shippingAmount) / (1 + taxPercentage) - 8;
    // const roundedSubtotal = parseFloat(subtotal.toFixed(2)); // Ensure proper rounding

    // ✅ Step 2: Correct Tax Extraction
    // const taxAmount = totalAmount - shippingAmount - roundedSubtotal;
    // const roundedTaxAmount = parseFloat(taxAmount.toFixed(2)); // Ensure proper rounding

    // ✅ Final Paid Amount
    // const paidByCustomer = totalAmount.toFixed(2); // No extra addition needed

    const payload = {
      user_type: customer?.type || "user",
      items: transformedCart,
      customer: transformedCustomer,
      total_amount: totalAmount.toFixed(2), // ✅ Use original totalAmount
      payment_details: paymentDetails,
      shipping_address: transformedCustomer?.default_address,
      order_date: generateOrderDate(),
      current_order_status: "Open",
      channel,
      is_full_paid: true,
      payment_status: paymentStatus,
      is_fulfilled: false,
      fulfilled_status: "Unfulfilled",
      total_items: transformedCart?.length,
      order_summary: {
        taxes: summary.taxes,
        subtotal: summary.subtotal,
        total_amount: summary.total_amount,
        discount_amount: summary.discount_amount,
        shipping_amount: summary.shipping_amount,
        paid_by_customer: summary.paid_by_customer,
      },
      notes: notes,
    };

    const abandonedCartId = localStorage.getItem("abandonedCartId");

    const res = await fetch(`${process.env.BACKEND}/api/makeOrder`, {
      method: "POST",
      body: JSON.stringify({
        ...payload,
        abandon_id: abandonedCartId ? parseInt(abandonedCartId) : null,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });

    const result = await res.json();

    if (res.ok) {
      // console.log("Log from makeOrder", result);

      return {
        success: true,
        summary: result,
        message: "Return from makeOrder",
      };
      // window.location.href = '/';
    } else {
      const data = await res.json();
      console.log(data);

      // Swal.fire({
      //   icon: "error",
      //   title: "Error",
      //   text: data.message,
      // });
    }
  } catch (error) {
    console.error(error);
    // Swal.fire({
    //   icon: "error",
    //   title: "Error",
    //   text: "Failed to upload order details. Please try again.",
    // });
  }
};
