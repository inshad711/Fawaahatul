"use client";
import { Image, Modal, Rate } from "antd";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";

interface DataProps {
  rating: string;
  author: {
    customer_id: number;
    email: string;
    id: number;
    name: string;
  };
  review_text: string;
  media: any[];
}

interface ReviewListProps {
  data: DataProps[];
}

const ReviewList: React.FC<ReviewListProps> = ({ data }) => {
  const [visibleCount, setVisibleCount] = useState(5); // Show 5 reviews initially
  const [loading, setLoading] = useState(false); // State for loading
  const [open, setOpen] = useState(false);

  // Function to load more reviews
  const loadMoreReviews = () => {
    setLoading(true); // Set loading to true when Load More is clicked
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + 5); // Increase reviews after delay
      setLoading(false); // Stop loading after 2 seconds
    }, 1000); // 2-second timeout
  };

  return (
    <>
      <div className="space-y-8">
        {data?.slice(0, 5).map((item, index) => (
          <div key={index} className="space-y-3">
            <div className="flex gap-2 items-center">
              <div className="h-10 w-10 rounded-full">
                <img
                  src={`https://ui-avatars.com/api/?background=D3D3D3&color=000&name=${item?.author?.name}`}
                  className="h-full w-full overflow-hidden rounded-full object-cover"
                  alt="User"
                />
              </div>
              <div className="leading-none space-y-1">
                <Rate
                  disabled
                  defaultValue={parseInt(item?.rating)}
                  className="text-[0.9rem]"
                />
                <h3 className="text-xs tracking-wide font-medium">
                  {item?.author?.name}
                </h3>
              </div>
            </div>
            <div>
              <p className="text-[0.85rem] tracking-wider text-templateText ">
                {item?.review_text}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {item?.media.map((image, imgIndex) => (
                <div
                  key={imgIndex}
                  className="h-[70px] w-[70px] rounded-md cursor-pointer overflow-hidden"
                >
                  <Image
                    src={`${process.env.BACKBLAZE_URL}/${image.url}`}
                    alt={item?.author?.name || "Product Image"}
                    preview={{
                      mask: null,
                    }}
                    height={"100%"}
                    className="h-full w-full object-cover border border-white hover:border-black rounded-md hover:opacity-80"
                    width={"100%"}
                  />
                </div>
              ))}
            </div>
            {index < 5 - 1 && (
              <div className="w-full h-[1px] bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={() => setOpen(true)}
          className="px-6 text-sm tracking-wide bg-white border border-templateBlack text-templateText py-2 flex items-center justify-center  cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-100  before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-templateText before:to-templateBlack before:transition-all before:duration-500 before:ease-in-out before:z-[-1] hover:text-white hover:before:left-0"
        >
          View all
        </button>
      </div>

      <Modal
        style={{
          top: "20px",
        }}
        width={1000}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <div className="space-y-8 py-4 lg:py-8 lg:px-5">
          {data.slice(0, visibleCount).map((item, index) => (
            <div key={index} className="space-y-3">
              <div className="flex gap-2 items-center">
                <div className="h-10 w-10 rounded-full">
                  <img
                    src={`https://ui-avatars.com/api/?background=D3D3D3&color=000&name=${item?.author?.name}`}
                    className="h-full w-full overflow-hidden rounded-full object-cover"
                    alt="User"
                  />
                </div>
                <div className="leading-none space-y-1">
                  <Rate
                    disabled
                    defaultValue={parseInt(item?.rating)}
                    className="text-[0.9rem]"
                  />
                  <h3 className="text-xs tracking-wide font-medium">
                    {item?.author?.name}
                  </h3>
                </div>
              </div>
              <div>
                <p className="text-[0.85rem] tracking-wider text-templateText ">
                  {item?.review_text}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {item?.media.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="h-[70px] w-[70px] rounded-md cursor-pointer overflow-hidden"
                  >
                    <Image
                      src={`${process.env.BACKBLAZE_URL}/${image}`}
                      alt={item?.author?.name || "Product Image"}
                      preview={{
                        mask: null,
                      }}
                      height={"100%"}
                      className="h-full w-full border border-white hover:border-black rounded-md hover:opacity-80"
                      width={"100%"}
                    />
                  </div>
                ))}
              </div>
              {index < visibleCount - 1 && (
                <div className="w-full h-[1px] bg-gray-300"></div>
              )}
            </div>
          ))}
          {visibleCount < data.length && (
            <div className="flex items-center justify-center">
              {!loading ? (
                <button
                  onClick={loadMoreReviews}
                  className="block py-2 px-8 uppercase text-sm tracking-widest hover:text-white hover:bg-templateBlack text-center border border-templateDark"
                >
                  Load more
                </button>
              ) : (
                <LoaderCircle
                  className="animate-spin"
                  size={35}
                  strokeWidth={1}
                />
              )}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ReviewList;
