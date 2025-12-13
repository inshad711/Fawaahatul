import { collectionService } from "@/services/collectionService";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Shopby = async () => {
  const data = [
    {
      image: {
        src: "/assets/notes/rose.webp",
        alt: "",
      },
      name: "Rose",
      url: "/collections/rose",
    },
    {
      image: {
        src: "/assets/notes/citrusy.webp",
        alt: "",
      },
      name: "Citrusy",
      url: "/collections/citrusy",
    },
    {
      image: {
        src: "/assets/notes/whitefloral.webp",
        alt: "",
      },
      name: "White Floral",
      url: "/collections/white-floral",
    },
    {
      image: {
        src: "/assets/notes/aquatic.webp",
        alt: "",
      },
      name: "Aquatic",
      url: "/collections/aquatic",
    },
    {
      image: {
        src: "/assets/notes/musk.webp",
        alt: "",
      },
      name: "Musk",
      url: "/collections/musk",
    },
    {
      image: {
        src: "/assets/notes/spicy.webp",
        alt: "",
      },
      name: "Spicy",
      url: "/collections/spicy",
    },
    {
      image: {
        src: "/assets/notes/woody.webp",
        alt: "",
      },
      name: "Woody",
      url: "/collections/woody",
    },
  ];

  // console.log(response, "response");

  return (
    <div className="templateContainer space-y-6 py-8 md:py-8 lg:py-10">
      <h2
        data-aos="fade-up"
        className="text-lg md:text-2xl text-templateText uppercase text-center"
      >
        Shop by notes
      </h2>
      <div className="grid lg:px-20 grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 lg:gap-5">
        {data.map((item, index) => (
          <Link
            data-aos="fade-up"
            href={item.url}
            key={index}
            className="block group duration-200"
          >
            <div className="aspect-square">
              <Image
                src={item.image.src}
                alt={item.image.alt || "Image"}
                className="group-hover:scale-90 duration-200"
                height={400}
                width={400}
              />
            </div>
            <h3 className="text-center group-hover:-mt-2 duration-200 text-templateText font-medium tracking-wide text-[15px]">
              {item.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Shopby;
