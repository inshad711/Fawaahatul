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
    ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}.${String(
      now.getMilliseconds()
    ).padEnd(6, "0")}${formattedOffset}`
  );
};

export const codPayment = async (
  paymentDetails: any,
  items: any,
  summary: any,
  totalAmount: any,
  customer: any,
  shipping_address: any,
  channel: string,
  paymentStatus: any,
  currency: string,
  notes: any
) => {
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

  console.log(transformedCustomer, "transformedCustomer");

  const payload = {
    user_type: customer?.type || "user",
    items: transformedCart,
    customer: transformedCustomer,
    total_amount: totalAmount.toFixed(2),
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
    currency,
    notes,
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
    return {
      success: false,
      summary: result,
      message: "Return from makeOrder",
    };
  }
};
