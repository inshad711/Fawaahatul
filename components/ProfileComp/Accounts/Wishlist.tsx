import React, { useEffect, useState } from "react";
import WishListCard from "./WishListCard";
import Cookies from "js-cookie";
import WishlistCardSkely from "@/components/Skeletons/WishlistCardSkely";
import Image from "next/image";
import Link from "next/link";

interface Props {
  customerId?: number;
}

const Wishlist: React.FC<Props> = ({ customerId }) => {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get(process.env.AUTH_TOKEN!);

  const fetchWishlistData = async () => {
    if (!token || !customerId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.BACKEND}/api/wishlist/all/${customerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_KEY}`,
            "Authorization-Customer": `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch wishlist");
      }

      const result = await response.json();
      setWishlist(result.data || []);
    } catch (error) {
      setError("Error fetching wishlist data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlistData();
  }, [customerId, token]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium tracking-wide text-templateText">
        My Wishlist{" "}
        {wishlist.length > 0 && (
          <span className="text-sm font-normal text-green-600">
            ({wishlist.length} items)
          </span>
        )}
      </h2>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {Array(3)
            .fill(3)
            .map((_, index) => (
              <div key={index}>
                <WishlistCardSkely />
              </div>
            ))}
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : wishlist.length === 0 ? (
        <div className="w-full h-full p-5 space-y-4">
          <div className="flex items-center justify-center">
            <Image
              src={"/assets/placeholders/emptycart.webp"}
              alt="empty cart"
              height={150}
              width={150}
            />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-templateText text-center">Empty Wishlist</h2>
            <p className="text-xs text-center text-gray-500 tracking-wide font-medium">
              There is nothing in your wishlist. Let's add some items.
            </p>
          </div>
          <Link href={"/"} className="block text-center">
            <button className="border uppercase border-templatePrimary tracking-wide text-templatePrimary py-2 px-6 text-xs font-medium">
              Continue shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {wishlist.map((item, index) => (
            <div key={index}>
              <WishListCard
                data={item}
                setWishlist={setWishlist}
                wishlist={wishlist}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
