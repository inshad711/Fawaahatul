"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import "./ShortVideoCarouselStyle.css";
import { X } from "lucide-react";
import { videoService } from "@/services/videoService";

type PropType = {};

const options: EmblaOptionsType = { dragFree: true };

const ShortVideoCarousel: React.FC<PropType> = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await videoService.getUserDetails();
        if (response?.success) {
          setVideos(response?.data);
        } else {
          setVideos([]);
        }
      } catch (err) {
        console.error("Error fetching videos", err);
      }
    };

    fetchVideos();
  }, []);

  // Pause all videos when lightbox opens
  useEffect(() => {
    if (selectedVideo) {
      videoRefs.current.forEach((video) => video?.pause());
    } else {
      videoRefs.current.forEach((video) => {
        if (video && video.dataset.inView === "true") {
          video.play().catch(() => {});
        }
      });
    }
  }, [selectedVideo]);

  // Control video playback based on visibility inside the carousel
  const handleVisibility = useCallback(() => {
    if (!emblaApi) return;
    const inViewSlides = emblaApi.slidesInView();
    videoRefs.current.forEach((video, index) => {
      if (video) {
        const visible = inViewSlides.includes(index);
        video.dataset.inView = visible ? "true" : "false";
        if (!selectedVideo) {
          visible ? video.play().catch(() => {}) : video.pause();
        }
      }
    });
  }, [emblaApi, selectedVideo]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", handleVisibility);
    handleVisibility(); // initial check
    return () => {
      emblaApi?.off("select", handleVisibility);
    };
  }, [emblaApi, handleVisibility]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedVideo(null);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  if (videos.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 templateContainer py-6 md:py-8 lg:py-12">
      <h2 data-aos="fade-up" className="sectionHeading">
        Explore Our Videos
      </h2>
      <div>
        <section data-aos="fade-up" className="svembla">
          <div className="svembla__viewport" ref={emblaRef}>
            <div className="svembla__container">
              {videos?.map((item: any, index: number) => (
                <div
                  data-aos="fade-up"
                  // data-aos-delay={index * 300}
                  className="svembla__slide"
                  key={index}
                >
                  <div
                    onClick={() => setSelectedVideo(item.video_url)}
                    className="aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                  >
                    <video
                      // ref={(el) => {
                      //   if (el) videoRefs.current[index] = el;
                      // }}
                      muted
                      playsInline
                      preload="metadata"
                      autoPlay={false}
                      controls={false}
                      className="h-full w-full object-cover pointer-events-none"
                    >
                      <source
                        src={`${process.env.BACKBLAZE_URL}/${item.video_url}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {selectedVideo && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="relative w-full max-w-xs aspect-[9/16] bg-black rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="z-[99999] absolute top-3 right-3 text-white bg-black/50 hover:bg-black rounded h-6 w-6 flex items-center justify-center transition"
              >
                <X size={16} />
              </button>
              <video
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              >
                <source
                  src={`${process.env.BACKBLAZE_URL}/${selectedVideo}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortVideoCarousel;
