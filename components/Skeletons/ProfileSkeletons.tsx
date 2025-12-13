import React from "react";

const ProfileSkeletons = () => {
  return (
    <div className="space-y-5">
      <div className="h-8 w-full rounded md:w-1/3 bg-gray-100 animate-pulse"></div>
      <div className="h-4 w-full rounded md:w-[40%] bg-gray-100 animate-pulse"></div>
      <div className="md:w-[45%] grid grid-cols-2 gap-2">
        <div className="h-8 w-full rounded bg-gray-100 animate-pulse"></div>
        <div className="h-8 w-full rounded bg-gray-100 animate-pulse"></div>
        <div className="h-8 w-full rounded bg-gray-100 animate-pulse"></div>
        <div className="h-8 w-full rounded bg-gray-100 animate-pulse"></div>
        <div className="h-8 w-full rounded bg-gray-100 animate-pulse"></div>
        <div className="h-8 w-full rounded bg-gray-100 animate-pulse"></div>
        <div className="h-8 w-full rounded bg-gray-100 animate-pulse"></div>
        <div className="h-8 w-full rounded bg-gray-100 animate-pulse"></div>
      </div>
    </div>
  );
};

export default ProfileSkeletons;
