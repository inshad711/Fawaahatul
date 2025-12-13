import React from "react";

const VideoBanner: React.FC<{ height: string; link: string }> = ({
  height,
  link,
}) => {
  return (
    <div className="relative w-full" style={{ height: `${height}px` }}>
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
          src={`${process.env.BACKEND}/upload/banners/${link}`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBanner;
