import React from "react";

const BlogCardSkeleton = () => {
  return (
    <div className="space-y-3">
      <div className="rounded aspect-[4/2.5] bg-white/10 animate-pulse"></div>
      <div className="rounded w-[50%] h-[20px] bg-white/10 animate-pulse"></div>
      <div className="rounded w-[100%] h-[20px] bg-white/10 animate-pulse"></div>
    </div>
  );
};

export default BlogCardSkeleton;
