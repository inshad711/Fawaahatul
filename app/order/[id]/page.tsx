import OrderDetailPage from "@/components/Order/OrderDetailPage";
import { defaultMetadata } from "@/lib/defaultMetadata";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: `Order Details | ${defaultMetadata.title}`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/order`,
  },
};

const Orderdetail = async ({ params }: PageProps) => {
  const id = (await params).id;
  return (
    <div className="max-w-[700px] px-2 mx-auto space-y-4 lg:space-y-6 py-6 md:py-8 lg:py-10 ">
      <Link href={"/account?tab=orders"} className="inline-block">
        <div className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-5 rounded py-2">
          <ArrowLeft size={16} className="text-gray-600" />
          <span className="text-sm text-gray-800">Back to My Orders</span>
        </div>
      </Link>
      <OrderDetailPage orderId={id} />
    </div>
  );
};

export default Orderdetail;
