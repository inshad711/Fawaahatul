import BlogPageComp from "@/components/BlogComp/BlogPageComp";
import Breadcrumb from "@/components/OtherSections/Breadcrumb";
import { Metadata } from "next";
import React from "react";
import { defaultMetadata } from "@/lib/defaultMetadata";

export const metadata: Metadata = {
  title: `Blogs | ${defaultMetadata.title}`,
  description: defaultMetadata.description,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
  },
};

const Allblogpage = () => {
  return (
    <>
      <Breadcrumb heading="All Blogs" breadCrumb={["Home", "All Blogs"]} />
      <BlogPageComp />
    </>
  );
};

export default Allblogpage;
