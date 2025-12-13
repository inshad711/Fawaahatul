"use server";
export async function validateUser(token: any) {
  try {
    const response = await fetch(`${process.env.BACKEND}/api/validateUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      console.error("Error validating user:");
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error validating user:", error);
    return null;
  }
}
