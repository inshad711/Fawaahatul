"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { LoaderIcon } from "lucide-react";
import { userService } from "@/services/userService";

interface Props {
  productId: number;
}

const NotifyMe: React.FC<Props> = ({ productId }) => {
  const token = Cookies.get(process.env.AUTH_TOKEN!);
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const storedCustomerData = useSelector(
    (state: RootState) => state.customerData?.customerData
  );
  const [notified, setNotified] = useState(false);
  const [email, setEmail] = useState(storedCustomerData?.email || "");

  const handleNotifyMe = async (e: any) => {
    setSubmitting(true);
    e.preventDefault();
    const requestedData = {
      customer_email: email,
      product_id: productId,
      variant_name: "",
    };

    try {
      const response = await userService.outOfStockNotifyMe(requestedData);
      if (response?.success) {
        toast.success(
          "You will be notified when the product is back in stock."
        );
        setNotified(true);
      } else {
        toast("Something went wrong. Please try again later.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  if (token && email) {
    return (
      <button
        onClick={!notified ? handleNotifyMe : undefined}
        disabled={submitting}
        className={`notifyButton w-full md:w-auto ${
          submitting ? "opacity-50" : "opacity-100"
        }`}
      >
        {notified ? (
          <>
            Notified{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-check-icon lucide-check"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </>
        ) : (
          <>
            Notify Me
            {submitting ? (
              <LoaderIcon size={18} className="animate-spin" />
            ) : (
              <svg viewBox="0 0 448 512" className="notifyButtonBell">
                <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path>
              </svg>
            )}
          </>
        )}
      </button>
    );
  } else {
    return (
      <>
        {notified ? (
          <button
            onClick={() => (!notified ? setVisible(true) : undefined)}
            className="notifyButton w-full md:w-auto"
          >
            {notified ? (
              <>
                Notified{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-check-icon lucide-check"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </>
            ) : (
              <>
                Notify Me
                <svg viewBox="0 0 448 512" className="notifyButtonBell">
                  <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path>
                </svg>
              </>
            )}
          </button>
        ) : (
          <>
            {visible ? (
              <form
                className="flex gap-2 w-full items-center"
                onSubmit={handleNotifyMe}
              >
                <Input
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  value={email}
                  placeholder="Email"
                  className="h-11 w-full md:w-1/2"
                />
                <Button
                  disabled={submitting}
                  className={`${submitting ? "opacity-50" : "opacity-100"}`}
                >
                  {submitting && <LoaderIcon className="animate-spin" />} Submit
                </Button>
              </form>
            ) : (
              <button
                onClick={() => (!notified ? setVisible(true) : undefined)}
                className="notifyButton w-full md:w-auto"
              >
                {notified ? (
                  <>
                    Notified{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-check-icon lucide-check"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </>
                ) : (
                  <>
                    Notify Me
                    <svg viewBox="0 0 448 512" className="notifyButtonBell">
                      <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path>
                    </svg>
                  </>
                )}
              </button>
            )}
          </>
        )}
      </>
    );
  }
};

export default NotifyMe;
