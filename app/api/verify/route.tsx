import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpay_secret: string
) => {
  if (!razorpay_secret) {
    throw new Error("Razorpay key secret is not defined.");
  }
  return crypto
    .createHmac("sha256", razorpay_secret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");
};

export async function POST(request: NextRequest) {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpaySignature,
      razorpay_secret,
    } = await request.json();

    // console.log(orderCreationId, razorpayPaymentId, razorpay_secret, 'orderCreationId, razorpayPaymentId, razorpay_secret');

    // 🔹 JWT Decode Secret
    let decodedSecret = "";
    if (razorpay_secret) {
      try {
        const decoded = jwt.decode(razorpay_secret);
        if (typeof decoded === "string") {
          decodedSecret = decoded;
        } else if (decoded && typeof decoded === "object") {
          decodedSecret = decoded.secret || "";
        }
      } catch (error) {
        console.error("JWT Decode Error:", error);
        return NextResponse.json(
          { message: "Invalid JWT Secret", isOk: false },
          { status: 400 }
        );
      }
    }

    if (!decodedSecret) {
      return NextResponse.json(
        { message: "Secret key not found", isOk: false },
        { status: 400 }
      );
    }

    // 🔹 Generate Signature with Decoded Secret
    const signature = generatedSignature(
      orderCreationId,
      razorpayPaymentId,
      decodedSecret
    );

    if (signature !== razorpaySignature) {
      return NextResponse.json(
        { message: "Payment verification failed", isOk: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Payment verified successfully", isOk: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { message: "Internal Server Error", isOk: false },
      { status: 500 }
    );
  }
}
