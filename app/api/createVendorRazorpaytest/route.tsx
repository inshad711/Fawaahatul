import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, credentials } = (await request.json()) as {
      amount: string;
      currency: string;
      credentials: any;
    };

    // 🔹 JWT se secret decode karna
    let key_secret = "";
    if (credentials?.secret) {
      try {
        const decoded = jwt.decode(credentials.secret);
        if (typeof decoded === "string") {
          key_secret = decoded;
        } else if (decoded && typeof decoded === "object") {
          key_secret = decoded.secret || "";
        }
      } catch (error) {
        console.error("JWT Decode Error:", error);
        return NextResponse.json(
          { error: "Invalid JWT Secret" },
          { status: 400 }
        );
      }
    }

    if (!key_secret) {
      return NextResponse.json(
        { error: "Secret key not found" },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: credentials?.key,
      key_secret: key_secret,
    });

    const options = {
      amount: amount,
      currency: currency,
      receipt: "rcp1",
    };

    const order = await razorpay.orders.create(options);
    // console.log(order);

    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
