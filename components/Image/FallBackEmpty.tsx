"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const FallBackEmpty = ({ alt, src, ...props }: any) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  if (error) return null;

  return (
    <Image alt={alt} onError={() => setError(true)} src={src} {...props} />
  );
};

export default FallBackEmpty;
