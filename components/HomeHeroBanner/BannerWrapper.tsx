import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import ImageBanner from "./ImageBanner";
import VideoBanner from "./VideoBanner";
import { bannerService } from "@/services/bannerService";
import ImageWithFallback from "../Image/Fallbackimage";

const BannerWrapper = async () => {
  let data: any = null;
  try {
    data = await bannerService.getBanners();
  } catch (error) {
    console.error("Error fetching banners:", error);
    return null;
  }
  if (!data.success || !data) {
    return null;
  }

  const { desktopbanner, desktopvideo, mobilebanner, mobilevideo } = data.data;
  const OPTIONS: EmblaOptionsType = { loop: true, duration: 40 };

  if (data.data.layout_mode === "grid") {
    return (
      <>
        <div className="hidden lg:block ">
          {desktopbanner?.show && !desktopvideo?.show && (
            <div
              className={`max-w-[1500px] mx-auto p-4 md:p-8 lg:p-10 pb-0 md:pb-0 lg:pb-0  grid grid-cols-1 md:grid-cols-${desktopbanner.pathAndLink.length} gap-4`}
            >
              {desktopbanner.pathAndLink.map((item: any, index: any) => (
                <div key={index} className="aspect-square bg-gray-100">
                  <ImageWithFallback
                    src={item.path}
                    alt={"alt"}
                    height={800}
                    width={800}
                    className={`h-full w-full object-cover`}
                  />
                </div>
              ))}
            </div>
          )}
          {!desktopbanner?.show && desktopvideo?.show && (
            <div
              className={`max-w-[1500px] mx-auto p-4 md:p-8 lg:p-10 pb-0 md:pb-0 lg:pb-0  grid grid-cols-1 md:grid-cols-${desktopvideo.pathAndLink.length} gap-4`}
            >
              {desktopvideo?.pathAndLink?.map((item: any, index: any) => (
                <div key={index}>
                  <VideoBanner
                    height={desktopvideo?.videoHeight}
                    link={item?.path}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* For mobile */}
        <div className="block lg:hidden">
          {mobilebanner?.show && !mobilevideo?.show && (
            <div
              className={`max-w-[1500px] mx-auto p-4 md:p-8 lg:p-10 pb-0 md:pb-0 lg:pb-0  grid grid-cols-1 md:grid-cols-${mobilebanner.pathAndLink.length} gap-4`}
            >
              {mobilebanner.pathAndLink.map((item: any, index: any) => (
                <div key={index} className="aspect-square bg-gray-100">
                  <ImageWithFallback
                    src={item.path}
                    alt={"alt"}
                    height={800}
                    width={800}
                    className={`h-full w-full object-cover`}
                  />
                </div>
              ))}
            </div>
          )}
          {!mobilebanner?.show && mobilevideo?.show && (
            <div
              className={`max-w-[1500px] mx-auto p-4 md:p-8 lg:p-10 pb-0 md:pb-0 lg:pb-0  grid grid-cols-1 md:grid-cols-${mobilevideo.pathAndLink.length} gap-4`}
            >
              {mobilevideo?.pathAndLink?.map((item: any, index: any) => (
                <div key={index}>
                  <VideoBanner
                    height={mobilevideo?.videoHeight}
                    link={item?.path}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {/* <div
            className={`max-w-[1500px] mx-auto p-4 md:p-8 lg:p-10 pb-0 md:pb-0 lg:pb-0  grid grid-cols-1 md:grid-cols-${images.length} gap-4`}
          >
            {images.map((item, index) => (
              <div key={index} className="aspect-square bg-gray-100">
                <ImageWithFallback
                  src={item}
                  alt={"alt"}
                  height={800}
                  width={800}
                  className={`h-full w-full object-cover`}
                />
              </div>
            ))}
          </div> */}
      </>
    );
  } else {
    return (
      <>
        {/* For desktop */}
        <div className="hidden lg:block ">
          {desktopbanner?.show && !desktopvideo?.show && (
            <ImageBanner
              options={OPTIONS}
              height={desktopbanner?.bannerHeight}
              banners={desktopbanner?.pathAndLink}
            />
          )}
          {!desktopbanner?.show && desktopvideo?.show && (
            <>
              {desktopvideo?.pathAndLink?.map((item: any, index: any) => (
                <div key={index}>
                  <VideoBanner
                    height={desktopvideo?.bannerHeight}
                    link={item?.path}
                  />
                </div>
              ))}
            </>
          )}
        </div>

        {/* For mobile */}
        <div className="block lg:hidden">
          {mobilebanner?.show && !mobilevideo?.show && (
            <ImageBanner
              options={OPTIONS}
              height={mobilebanner?.bannerHeight}
              banners={mobilebanner?.pathAndLink}
            />
          )}
          {!mobilebanner?.show && mobilevideo?.show && (
            <>
              {mobilevideo?.pathAndLink?.map((item: any, index: any) => (
                <div key={index}>
                  <VideoBanner
                    height={mobilevideo?.bannerHeight}
                    link={item?.path}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </>
    );
  }
};

export default BannerWrapper;
