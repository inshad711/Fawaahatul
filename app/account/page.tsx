import ProfileDetail from "@/components/ProfileComp/ProfileDetail";
import ProfileSidebar from "@/components/ProfileComp/ProfileSidebar";
import { Metadata } from "next";
import React from "react";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/account`,
  },
};

const Page = async ({ searchParams }: PageProps) => {
  const currentTab = (await searchParams).tab;
  return (
    <>
      <div className="templateContainer flex flex-col lg:flex-row gap-12 lg:gap-8 py-4 md:py-6 lg:py-8">
        <div className="w-full pr-2 lg:w-[20%] border-r">
          <ProfileSidebar currentTab={currentTab || "profile"} />
        </div>
        <div className="w-full lg:w-[80%]">
          <ProfileDetail currentTab={currentTab || "profile"} />
        </div>
      </div>
    </>
  );
};

export default Page;
