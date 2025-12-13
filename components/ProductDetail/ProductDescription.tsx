import React from "react";

const ProductDescription = ({ description }: { description: string }) => {
  return (
    <div className="relative">
      <div
        dangerouslySetInnerHTML={{ __html: description || "" }}
        className="productDescription space-y-4"
      ></div>
    </div>
  );
};

export default ProductDescription;
