import ImageWithFallback from "@/components/Image/Fallbackimage";
import { useFormatAmount } from "@/hooks/useFormatAmount";
import { Tooltip } from "antd";
import { Loader2, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface Props {
  data: {
    id: number;
    slug: string;
    image: {
      url: string;
      alt: string;
    };
    title: string;
    regularPrice: number;
    sellingPrice: number;
  };
  wishlist: any[];
  setWishlist: React.Dispatch<React.SetStateAction<any[]>>;
}

const WishListCard: React.FC<Props> = ({ data, wishlist, setWishlist }) => {
  const [loading, setLoading] = useState(false);
  const token = Cookies.get(process.env.AUTH_TOKEN!);
  const { formatAmount } = useFormatAmount();
  const handleClick = async () => {
    setLoading(true);
    const action = "remove"; // Toggle action

    try {
      const response = await fetch(
        `${process.env.BACKEND}/api/wishlist/manage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_KEY}`,
            "Authorization-Customer": `Bearer ${token}`,
          },
          body: JSON.stringify({
            item_id: data.id,
            variation_name: null,
            action,
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        // Update wishlist locally
        setWishlist((prevWishlist) =>
          prevWishlist.filter((item) => item.id !== data.id)
        );
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Internal error: " + error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <Link
        href={`/products/${data.slug}`}
        className="block group h-full w-full "
      >
        <div className="aspect-[3/3.5] overflow-hidden border">
          <ImageWithFallback
            src={`${process.env.BACKBLAZE_URL}/${data.image.url}`}
            alt={data.image.alt || "Product Image"}
            height={500}
            width={500}
            className="h-full w-full object-cover group-hover:scale-105 transition-all duration-300 ease-in-out"
          />
        </div>
        <div className="p-2 space-y-1 lg:space-y-2">
          <h2 className="tracking-wide line-clamp-1 mb-1 leading-normal  text-sm break-words">
            {data.title}
          </h2>
          <div className="flex flex-col-reverse lg:flex-row lg:gap-2 font-sans">
            <span className="tracking-wider text-sm font-bold text-green-600">
              {formatAmount(data.sellingPrice)}
            </span>
            <span className="text-[0.70rem] line-through text-gray-500 tracking-wide">
              {formatAmount(data.regularPrice)}
            </span>
          </div>
        </div>
      </Link>
      <Tooltip title="Remove from wishlist">
        <div
          onClick={!loading ? handleClick : undefined}
          className="absolute cursor-pointer hover:scale-110 duration-200 transition-all ease-in-out rounded-full p-1.5 top-2 bg-white right-2"
        >
          {loading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <X size={20} />
          )}
        </div>
      </Tooltip>
    </div>
  );
};

export default WishListCard;
