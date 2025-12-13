// import BlogSection from "@/components/BlogComp/BlogSection";
import BrandsGrid from "@/components/Brands/BrandsGrid";
import AllCategories from "@/components/Categories/AllCategories";
import DynamicLayoutMain from "@/components/DynamicLayout/DynamicLayoutMain";
import Faqs from "@/components/FAQ/Faqs";
import SEOcontentforHomepage from "@/components/Footer/SEOcontentforHomepage";
import ProductGrid from "@/components/GridLayout/ProductGrid";
import BannerWrapper from "@/components/HomeHeroBanner/BannerWrapper";
import HeroSlider from "@/components/HomeHeroBanner/HeroSlider";
import About2 from "@/components/OtherSections/About2";
import BannerSection from "@/components/OtherSections/BannerSection";
import BestDeal from "@/components/OtherSections/BestDeal";
import CardFilter from "@/components/OtherSections/CardFilter";
import IconWithText from "@/components/OtherSections/IconWithText";
import Notificationbar from "@/components/ui/Notificationbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const revalidate = 60;

const Home = () => {
  const faqs = [
    {
      question: "What types of toys do you sell?",
      answer:
        "We specialize exclusively in die-cast collector toys, including limited edition scale models, branded die-cast cars, and rare collectibles from top die-cast manufacturers.",
    },
    {
      question: "Are your die-cast models authentic?",
      answer:
        "Yes, every die-cast model we sell is 100% authentic, sourced directly from trusted brands and licensed distributors. We guarantee the originality and quality of all our collectibles.",
    },
    {
      question: "Do you offer pre-orders for new die-cast releases?",
      answer: "NO! We don't offer pre-orders.",
    },
    {
      question: "How are die-cast models packaged?",
      answer:
        "We know how important condition is for collectors. All die-cast models are securely packed with protective materials and sturdy boxes to ensure they arrive safely and in mint condition.",
    },
    {
      question: "What is your return and refund policy?",
      answer:
        "Please note that we do not accept returns or provide refunds. All sales are final. We encourage you to review product details and images carefully before placing your order.",
    },
    {
      question: "How long does it take to dispatch an order?",
      answer:
        "All orders are typically processed and dispatched within 3–5 business days.",
    },
  ];

  return (
    <>
      <h1 className="hidden">Hutz Diecast | Original Diecast Collector Toys</h1>
      <div className="bg-templateBackground">
        <div className="-mt-[105px]">
          <BannerWrapper />
          {/* <HeroSlider /> */}
        </div>

        <About2 />
        {/* <BestDeal /> */}
        {/* <BannerSection /> */}
        {/* <CardFilter /> */}
        {/* <div className="templateContainer grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 py-4 md:py-8 lg:py-10">
          <Link href={"/collections/premium-cars"} className="block h-full w-full overfllow-hidden rounded-md">
            <Image src={"/hutzbanner.jpeg"} alt="" className="h-full w-full object-cover" height={1000} width={1000} sizes="100vw" />
          </Link>
          <Link href={"/collections/hotwheels-mainline"} className="h-full w-full overfllow-hidden rounded-md">
            <Image src={"/hutz-banner-2.jpeg"} alt="" className="h-full w-full object-cover" height={1000} width={1000} sizes="100vw" />
          </Link>
        </div> */}
        {/* <Notificationbar /> */}

        {/* <IconWithText /> */}
        {/* <AllCategories /> */}
        <ProductGrid text="Our Best Selling" limit={15} />
        {/* <BrandsGrid /> */}
        {/* <DynamicLayoutMain /> */}
        {/* <Faqs data={faqs} /> */}
        {/* <SEOcontentforHomepage /> */}
        {/* <BlogSection/> */}
      </div>
    </>
  );
};

export default Home;
