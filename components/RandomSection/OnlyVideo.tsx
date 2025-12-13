import React from "react";

const OnlyVideo = () => {
  return (
    <div className="relative w-full">
      <video
        className="h-full w-full object-cover"
        playsInline
        preload="auto"
        loop
        autoPlay
        muted
        controls={false}
      >
        <source
          src={`https://cdn.shopify.com/videos/c/o/v/2e6d8254e6104a218bc21c09efb44114.mp4`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default OnlyVideo;
