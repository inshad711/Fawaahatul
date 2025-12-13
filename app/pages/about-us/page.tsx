import { defaultMetadata } from "@/lib/defaultMetadata";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: `About Us | ${defaultMetadata.title}`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/pages/about-us`,
  },
};

const Aboutus = () => {
  return (
    <div className="max-w-3xl space-y-6 mx-auto px-4 py-8 md:py-10 lg:py-16">
      <h1 className="sectionHeading">About Us</h1>
      <p className="text-gray-700 text-[15px]">
        What started as a simple hobby has now turned into a full-fledged
        passion project and a trusted destination for collector toy enthusiasts
        across the country.
      </p>
      <p className="text-gray-700 text-[15px]">
        For years, I loved collecting toys especially rare, premium models that
        carried stories, nostalgia, and craftsmanship. It was something
        personal. But as my collection grew, so did the curiosity of my son.
        With fresh eyes and entrepreneurial spirit, he saw something bigger: a
        way to share this passion with the world.
      </p>
      <p className="text-gray-700 text-[15px]">
        Together, we transformed a shelf of collectibles into a business built
        on love, authenticity, and community. Today, our website is a hub for
        original, licensed collector toys from die-cast cars and action figures
        to exclusive limited editions and premium lines.
      </p>
      <p className="text-gray-700 text-[15px]">
        We don’t just sell toys we preserve memories, spark joy, and connect
        with fellow collectors who value the real deal. That’s why we promise:
      </p>
      <ul className="space-y-2 text-gray-700">
        <li className="text-sm">✅ Only 100% Original, Authentic Products</li>
        <li className="text-sm">📦 Safe Packaging for Delicate Collectibles</li>
        <li className="text-sm">💬 Passionate Support from Real Collectors</li>
        <li className="text-sm">🔍 Curated, Handpicked Inventory Only</li>
      </ul>
      <p className="text-gray-700 text-[15px]">
        Whether you're a lifelong collector or just starting your journey, we’re
        here to bring you the best — because collecting isn’t just a business
        for us. It’s who we are.
      </p>
    </div>
  );
};

export default Aboutus;
