// app/api/location/route.ts (Next.js App Router)
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const city = req.headers.get("cf-ipcity");
  const region = req.headers.get("cf-region");
  const regionCode = req.headers.get("cf-region-code");
  const country = req.headers.get("cf-ipcountry");

  return NextResponse.json({
    city,
    region,
    regionCode,
    country,
  });
}
