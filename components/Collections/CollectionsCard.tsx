import Image from "next/image";
import Link from "next/link";
import React from "react";
import ImageWithFallback from "../Image/Fallbackimage";

interface Props {
  data: {
    title: string;
    collection_image: string;
    collection_slug: string;
  };
}

const CollectionsCard: React.FC<Props> = ({ data }) => {
  return (
    <Link
      href={`/collections/${data.collection_slug}`}
      className="space-y-2 md:space-y-3 group"
    >
      <div className="aspect-[4/4.5] relative flex items-center overflow-hidden justify-center ">
        <ImageWithFallback
          className="h-full w-full group-hover:scale-105 transition-all duration-300 ease-in-out object-cover"
          src={`${process.env.BACKEND}/upload/collectionImage/${data.collection_image}`}
          alt="collection name"
          height={800}
          width={800}
        />
        <div className="absolute inset-0 bg-gradient-to-t pb-2 flex items-end justify-center from-black/60 hover:from-black/7 transition-all ease-in-out duration-1000 hover:via-transparent hover:to-transparent via-transparent to-transparent">
          <div className="text-sm font-medium text-white text-center leading-none tracking-wider capitalize text-templateText">
            {data.title}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionsCard;
