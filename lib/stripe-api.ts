const BACKEND_URL = process.env.BACKEND || "http://localhost:4000";

/*** Create a Stripe Checkout session */
export async function createCheckoutSession(request: any) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/purchase/create-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || data.message || "Failed to create checkout session"
      );
    }

    return data;
  } catch (error: any) {
    console.error("Create checkout session error:", error);
    return {
      success: false,
      error: error.message || "Failed to create checkout session",
    };
  }
}
