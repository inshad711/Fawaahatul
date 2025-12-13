"use client";
import React, { useState } from "react";

const SEOcontentforHomepage = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="templateContainer py-10 space-y-4">
      <h2 className="sectionHeading !text-left text-3xl font-bold text-gray-800">
        Die-Cast Collector Toys
      </h2>
      <p className="text-templateText text-gray-600 text-sm font-normal tracking-wide">
        Discover the world of die-cast collector toys — premium scale models
        crafted with exceptional detail and quality. From classic cars to modern
        supercars, our die-cast models are perfect for collectors who value
        authenticity and craftsmanship.
      </p>

      {expanded && (
        <div className="space-y-6">
          <p className="text-templateText text-gray-600 text-sm font-normal tracking-wide">
            Die-cast toys have been a favorite among collectors for decades.
            These miniature vehicles are made using high-quality die-cast metal,
            ensuring durability and precision in every piece. Whether you’re a
            lifelong collector or just starting out, our selection includes
            limited edition releases, exclusive branded models, and rare finds
            that make your collection truly stand out. Each die-cast model is
            carefully packaged to maintain its mint condition from our store to
            your display shelf.
          </p>

          <h3 className="text-xl font-semibold text-gray-800">
            Why Choose Die-Cast Collector Toys?
          </h3>
          <p className="text-templateText text-gray-600 text-sm font-normal tracking-wide">
            Die-cast collector toys offer a unique blend of nostalgia, artistry,
            and investment potential. Each model is a meticulously crafted
            replica, capturing the essence of iconic vehicles with stunning
            accuracy.
          </p>

          <h4 className="text-lg font-medium text-gray-700">
            Unmatched Craftsmanship
          </h4>
          <p className="text-templateText text-gray-600 text-sm font-normal tracking-wide">
            Our die-cast models are made with precision, featuring intricate
            details like working doors, detailed interiors, and accurate paint
            finishes. Crafted from high-quality zinc alloy, these models are
            built to last, making them ideal for display or play.
          </p>

          <h4 className="text-lg font-medium text-gray-700">
            Wide Variety of Models
          </h4>
          <p className="text-templateText text-gray-600 text-sm font-normal tracking-wide">
            From vintage muscle cars to modern Formula 1 racers, our collection
            spans decades and genres. We offer models in various scales,
            including 1:18, 1:24, and 1:64, catering to every collector’s
            preference.
          </p>

          <h3 className="text-xl font-semibold text-gray-800">
            A Brief History of Die-Cast Toys
          </h3>
          <p className="text-templateText text-gray-600 text-sm font-normal tracking-wide">
            Die-cast toys trace their origins to the early 20th century, with
            brands like Dinky Toys and Matchbox paving the way for the modern
            collector’s market. Today, die-cast models are celebrated for their
            historical significance and collectible value.
          </p>

          <h4 className="text-lg font-medium text-gray-700">
            The Rise of Collecting
          </h4>
          <p className="text-templateText text-gray-600 text-sm font-normal tracking-wide">
            Collecting die-cast toys became a global phenomenon in the mid-20th
            century as manufacturers began producing highly detailed replicas.
            Limited editions and special releases have since become highly
            sought-after by enthusiasts worldwide.
          </p>

          <h3 className="text-xl font-semibold text-gray-800">
            Tips for Building Your Collection
          </h3>
          <p className="text-templateText text-gray-600 text-sm font-normal tracking-wide">
            Starting or expanding a die-cast collection is an exciting journey.
            Here are some tips to help you build a collection that reflects your
            passion.
          </p>

          <h4 className="text-lg font-medium text-gray-700">
            Focus on Quality Over Quantity
          </h4>
          <p className="text-templateText text-gray-600 text-sm font-normal tracking-wide">
            Invest in high-quality models from reputable brands. Look for
            limited editions or models with unique features to enhance the value
            of your collection.
          </p>

          <h4 className="text-lg font-medium text-gray-700">
            Store and Display Properly
          </h4>
          <p className="text-templateText text-gray-600 text-sm font-normal tracking-wide">
            Keep your die-cast models in a dust-free environment, ideally in
            display cases or original packaging, to preserve their condition.
            Avoid direct sunlight to prevent fading.
          </p>
        </div>
      )}

      <button
        onClick={toggleExpanded}
        className="text-templatePrimary text-sm underline underline-offset-2 hover:text-templatePrimary focus:outline-none"
      >
        {expanded ? "Read Less" : "Read More"}
      </button>
    </div>
  );
};

export default SEOcontentforHomepage;
