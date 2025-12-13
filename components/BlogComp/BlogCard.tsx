import Image from "next/image";
import Link from "next/link";
import React from "react";
import ImageWithFallback from "../Image/Fallbackimage";

interface BlogCard {
  data: {
    featured_image: string;
    slug: string;
    title: string;
    data: string;
    published_at: string;
  };
}

const BlogCard: React.FC<BlogCard> = ({ data }) => {
  return (
    <Link
      href={`/blog/${data.slug}`}
      className="block cursor-pointer space-y-3 group "
    >
      <div className="aspect-[4/2.5] overflow-hidden">
        <ImageWithFallback
          src={`${process.env.BACKBLAZE_URL}/${data.featured_image}`}
          alt={data.title || "Featured Image"}
          height={4}
          width={3}
          className="h-full w-full rounded-lg object-cover group-hover:scale-105 transition-all ease"
          sizes="(min-width: 1280px) 400px, (min-width: 1040px) 304px, (min-width: 780px) 348px, (min-width: 460px) 400px, 88.57vw"
        />
      </div>
      <h2 className="text-lg text-templateText leading-snug transition-all ease">
        {data.title}
      </h2>
      <div className="flex items-center justify-between  tracking-wider">
        <h3 className="text-xs text-templatePrimary font-medium">
          {new Date(data.published_at).toDateString()}
        </h3>
      </div>
    </Link>
  );
};

export default BlogCard;
