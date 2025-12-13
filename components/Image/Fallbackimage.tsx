"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const fallbackImagepath = "/assets/placeholders/productPlaceholder.webp";
const ImageWithFallback = ({
  fallback = fallbackImagepath,
  alt,
  src,
  ...props
}: any) => {
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={setError}
      src={error ? fallbackImagepath : src}
      {...props}
    />
  );
};

export default ImageWithFallback;
