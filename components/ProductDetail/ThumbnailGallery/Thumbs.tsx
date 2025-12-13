import Image from "next/image";
import React from "react";

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  data: {
    url: string;
    alt: string;
  };
};

export const Thumbs: React.FC<PropType> = (props) => {
  const { selected, index, onClick, data } = props;

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number overflow-hidden"
      >
        <div className="aspect-[4/4]">
          <Image
            alt={data?.alt || "Product Image"}
            height={200}
            width={200}
            src={`${process.env.BACKBLAZE_URL}/${data.url}`}
            className="h-full w-full cursor-pointer object-cover img"
          />
        </div>
      </button>
    </div>
  );
};
