"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import ImageWithFallback from "@/components/Image/Fallbackimage";
import { Thumbs } from "./Thumbs";
import "./Style.css";
import { MoveLeft, MoveRight } from "lucide-react";
import Image from "next/image";

type PropType = {
  options?: EmblaOptionsType;
  gallery: any[];
};

const MobileGallery: React.FC<PropType> = (props) => {
  const { options, gallery } = props;
  const [open, setOpen] = useState<any | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastTouchDist, setLastTouchDist] = useState<number | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  // 📌 Calculate distance between two touches (for pinch)
  const getTouchDistance = (touches: TouchList) => {
    if (touches.length < 2) return 0;
    const [touch1, touch2] = touches;
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  // 📌 Handle pinch zoom
  const handleTouchMove = (e: any) => {
    if (e.touches.length === 2) {
      const newDist = getTouchDistance(e.touches);
      if (lastTouchDist !== null) {
        let newScale = scale * (newDist / lastTouchDist);
        newScale = Math.max(1, Math.min(3, newScale)); // Limit zoom from 1x to 3x
        setScale(newScale);
      }
      setLastTouchDist(newDist);
    }
  };

  const handleTouchEnd = () => {
    setLastTouchDist(null);
  };

  // 📌 Handle mouse scroll zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    let newScale = scale - e.deltaY * 0.1; // Adjust zoom speed
    newScale = Math.max(1, Math.min(3, newScale)); // Limit zoom
    setScale(newScale);
  };

  // 📌 Handle drag movement when zoomed in
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setDragStart(null);
  };

  const prevImage = () => {
    if (open) {
      const currentIndex = gallery.findIndex((item) => item.url === open.url);
      const prevIndex = (currentIndex - 1 + gallery.length) % gallery.length;
      setOpen(gallery[prevIndex]);
      setScale(1);
    }
  };

  const nextImage = () => {
    if (open) {
      const currentIndex = gallery.findIndex((item) => item.url === open.url);
      const nextIndex = (currentIndex + 1) % gallery.length;
      setOpen(gallery[nextIndex]);
      setScale(1);
    }
  };

  return (
    <>
      {gallery.length > 0 ? (
        <div className="embla">
          <div className="embla__viewport" ref={emblaMainRef}>
            <div className="embla__container">
              {gallery.map((item, index) => (
                <div className="embla__slide" key={index}>
                  <div onClick={() => setOpen(item)} className="h-full">
                    <ImageWithFallback
                      alt={item.alt || "Product Image"}
                      height={800}
                      width={800}
                      sizes="(min-width: 1540px) 542px, (min-width: 1280px) 445px, (min-width: 1040px) 347px, (min-width: 780px) 736px, (min-width: 680px) 616px, 94.44vw"
                      src={`${process.env.BACKBLAZE_URL}/${item.url}`}
                      className="h-full w-full cursor-pointer object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {gallery.length > 1 && (
            <div className="embla-thumbs">
              <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
                <div className="embla-thumbs__container transition-all ease-in-out duration-200">
                  {gallery.map((item, index) => (
                    <Thumbs
                      key={index}
                      data={item}
                      onClick={() => onThumbClick(index)}
                      selected={index === selectedIndex}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Image
          src={"/assets/placeholders/productPlaceholder.webp"}
          alt="Product Image"
          className="aspect-[4/4] object-cover col-span-1 h-full w-full"
          height={800}
          width={800}
        />
      )}

      {/* -------- Fullscreen Modal with Pinch & Scroll Zoom -------- */}
      {open && (
        <div className="fixed flex items-center justify-center h-screen w-full inset-0 bg-white z-50">
          <div
            ref={containerRef}
            className="relative aspect-[4/4] w-full touch-none"
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{ cursor: scale > 1 ? "grab" : "default" }}
          >
            <div
              style={{
                transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                transition: dragStart ? "none" : "transform 0.2s ease-out",
                cursor: dragStart ? "grabbing" : "grab",
              }}
              className="h-full w-full"
            >
              <ImageWithFallback
                alt={open.alt || "Product Image"}
                height={800}
                width={800}
                sizes="(min-width: 1540px) 542px, (min-width: 1280px) 445px, (min-width: 1040px) 347px, (min-width: 780px) 736px, (min-width: 680px) 616px, 94.44vw"
                src={`${process.env.BACKBLAZE_URL}/${open.url}`}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <div
            className="p-4 fixed top-3 hover:scale-110 transition-all ease-in-out duration-300 right-3 group flex items-center justify-center rounded-full bg-black cursor-pointer"
            onClick={() => {
              setOpen(null);
              setScale(1);
            }}
          >
            <div className="relative h-4 w-4">
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white rotate-45"></div>
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white -rotate-45"></div>
            </div>
          </div>

          <div
            onClick={prevImage}
            className="cursor-pointer bg-white p-2 rounded absolute top-1/2 z-50 -translate-y-1/2 left-5"
          >
            <MoveLeft size={30} strokeWidth={1} />
          </div>

          <div
            onClick={nextImage}
            className="cursor-pointer bg-white p-2 rounded absolute top-1/2 z-50 -translate-y-1/2 right-5"
          >
            <MoveRight size={30} strokeWidth={1} />
          </div>

          <div className="md:hidden absolute text-center bg-white  text-black py-3 w-[65%] rounded-full top-2 text-xs tracking-wide left-1/2 -translate-x-1/2">
            {scale > 1
              ? "Pinch in to zoom out image"
              : "Pinch out to zoom in image"}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileGallery;
