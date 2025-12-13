"use client";
import { reviewService } from "@/services/reviewService";
import { RootState } from "@/store/store";
import { Modal, Rate, Upload, Button, Input } from "antd";
import { ChevronRight, EditIcon, Loader2Icon, UploadIcon } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const WriteReview = ({ data, order_id }: { data: any; order_id: any }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const storedCustomerData = useSelector(
    (state: RootState) => state.customerData?.customerData
  );
  const [loading, setLoading] = useState(false);
  const AuthToken = Cookies.get(process.env.AUTH_TOKEN!);
  const API_KEY = process.env.API_KEY;
  const handleImageChange = ({ fileList }: any) => {
    setImages(fileList);
  };

  const handleNext = () => {
    if (currentStep === 1 && rating === 0) {
      return alert("Please select a star rating");
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log(storedCustomerData?.email, "Customer Email");
      console.log(data.id, "Product Id");
      console.log(rating, "Rating Value");
      const formData = new FormData();
      formData.append("review_text", reviewText);
      formData.append("rating_value", String(rating));
      formData.append(
        "customer_id",
        String(storedCustomerData?.customer_id || "")
      );
      formData.append("customer_name", storedCustomerData?.first_name || "");
      formData.append("customer_email", storedCustomerData?.email || "");
      formData.append("product_id", data.id || "");
      formData.append("is_reply", "false");
      formData.append("order_id", order_id || "");

      // Append all uploaded images
      images.forEach((file) => {
        if (file.originFileObj) {
          formData.append("files", file.originFileObj);
        }
      });

      const response = await fetch(
        `${process.env.BACKEND}/api/write_a_review`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Authorization-Customer": `Bearer ${AuthToken}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Review submitted successfully", result);
        toast.success("Review submitted successfully");
        setShowModal(false);
        setCurrentStep(1);
        setRating(0);
        setReviewText("");
        setImages([]);
      } else {
        toast.error("Internal Server Error");
      }
    } catch (error) {
      toast.error("Internal Server Error");
      console.error("Internal Server Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex font-medium text-sm tracking-wide items-center gap-2"
      >
        Write review <EditIcon size={18} strokeWidth={1.5} />
      </button>

      <Modal
        style={{ top: "5vh" }}
        width={500}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        destroyOnHidden
      >
        <div
          className="min-h-[60vh] pb-10 relative flex flex-col items-center justify-center
        "
        >
          {currentStep === 1 && (
            <div className="flex flex-col items-center gap-4 mt-8">
              <p className="text-lg tracking-wide">
                How would you rate this item ?
              </p>
              <Rate
                className="[&_.ant-rate-star-zero_.ant-rate-star-first]:text-gray-300 [&_.ant-rate-star-zero_.ant-rate-star-second]:text-gray-300 text-yellow-400 text-3xl"
                value={rating}
                onChange={(value) => setRating(value)}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="flex w-full flex-col gap-4 mt-4">
              <p className="text-sm tracking-wide">Write your review</p>
              <Input.TextArea
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience..."
              />

              <p className="text-sm tracking-wide">Upload images (optional)</p>
              <Upload
                multiple
                listType="picture-card"
                fileList={images}
                onChange={handleImageChange}
                beforeUpload={() => false} // prevent auto-upload
              >
                <div className="flex flex-col items-center">
                  <UploadIcon size={20} />
                  <span className="text-xs mt-1">Upload</span>
                </div>
              </Upload>
            </div>
          )}

          {/* Footer Buttons */}
          <div className="absolute left-0 bottom-0 gap-2 text-sm w-full flex justify-center mt-8">
            {currentStep > 1 && (
              <button
                className="bg-white text-templateText border border-templateText px-6 py-2 rounded-md"
                onClick={handlePrev}
              >
                Back
              </button>
            )}
            {currentStep < 2 && (
              <button
                className="bg-templatePrimary text-templatePrimaryText px-6 py-2 rounded-md"
                onClick={handleNext}
              >
                Next
              </button>
            )}
            {currentStep === 2 && (
              <button
                disabled={loading}
                className="bg-templatePrimary text-templatePrimaryText px-6 py-2 flex items-center justify-center gap-2 rounded-md"
                onClick={handleSubmit}
              >
                {loading && (
                  <Loader2Icon
                    size={20}
                    strokeWidth={1.5}
                    className="animate-spin"
                  />
                )}
                Submit Review
              </button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default WriteReview;
