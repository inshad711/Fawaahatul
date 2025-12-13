import Image from "next/image";
import Link from "next/link";
import React from "react";
import "@/style/blog.css";
import { Metadata } from "next";
import { blogService } from "@/services/blogService";
import ImageWithFallback from "@/components/Image/Fallbackimage";
import { defaultMetadata } from "@/lib/defaultMetadata";

const getBlogDetail = async (slug: string) => {
  try {
    const response = await blogService.getBlogBySlug(slug);

    if (response.status) {
      return response.data;
    } else {
      console.error("Network or server error:", response.error);
      return {};
    }
  } catch (error) {
    console.error("Network or server error:", error);
    return null;
  }
};

export async function generateMetadata({ params }: any) {
  const slug = (await params).slug;
  const data = await getBlogDetail(slug);
  const { blog } = data;

  return {
    title: blog?.title || defaultMetadata.title,
    description: blog?.meta_description || defaultMetadata.description,
    openGraph: {
      title: blog?.title || defaultMetadata.title,
      description: blog?.meta_description || defaultMetadata.description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog.slug}`,
      type: "website",
      images: [
        {
          url: blog?.featured_image || defaultMetadata.ogimage,
          width: 1200,
          height: 630,
          alt: blog?.title || defaultMetadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog?.title || defaultMetadata.title,
      description: blog?.meta_description || defaultMetadata.description,
      images: [blog?.featured_image || defaultMetadata.ogimage],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog.slug}`,
    },
  };
}

const Blogsinglepage = async ({ params }: any) => {
  const slug = (await params).slug;
  const data = await getBlogDetail(slug);
  const { blog, relatedBlogs } = data;
  // console.log(blog);

  return (
    <div className="templateContainer py-4 md:py-8 lg:py-12 space-y-8">
      <ul className="flex flex-wrap items-center gap-1 justify-start text-sm text-gray-700">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </li>
        <li>
          <Link href={"/blog"}>Blog</Link>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </li>
        <li className="text-templateText underline">
          {blog?.title || "Blog Post"}
        </li>
      </ul>
      {/* ----------- */}
      <div className="space-y-5">
        <h1 className="text-3xl md:text-4xl font-medium text-templatePrimary tracking-wide uppercase ">
          {blog?.title ?? "Title Not Available"}
        </h1>
        <div className="flex text-sm tracking-wider items-center gap-1">
          <p>Published on </p>
          <p className="text-templateText tracking-wider">
            {new Date(blog?.published_at).toLocaleDateString()}
          </p>
        </div>
        {/* <p className="tracking-wide">
          {blog?.excerpt ?? "Excerpt Not Available"}
        </p> */}
        {blog?.featured_image ? (
          <ImageWithFallback
            src={`${process.env.BACKBLAZE_URL}/${blog.featured_image}`}
            alt={blog.title || "Featured Image"}
            height={1200}
            width={1600}
            className="h-full w-full"
            sizes="100vw"
          />
        ) : null}
        <div
          dangerouslySetInnerHTML={{
            __html: blog?.content ?? "<p>No Content Available</p>",
          }}
          className="blogDescriptionCSS"
        ></div>
      </div>
    </div>
  );
};

export default Blogsinglepage;
