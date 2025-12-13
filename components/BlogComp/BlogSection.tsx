"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { blogService } from "@/services/blogService";

const BlogSection: React.FC = () => {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    const response = await blogService.getBlogs();

    if (response?.success) {
      setBlogs(response?.data?.blogs);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  if (blogs.length === 0) {
    return null;
  }

  return (
    <div className="templateContainer py-4 md:py-8 lg:py-12">
      <div className="flex flex-col gap-1 items-center justify-center pt-0 pb-10">
        <span className="flex items-center gap-1 uppercase text-sm text-templateText tracking-wider">
          Blogs
        </span>
        <h2 className="sectionHeading">NEWS & ARTICLES</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs?.map((item, i) => (
          <div key={i}>
            <BlogCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
