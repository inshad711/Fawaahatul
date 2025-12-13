"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import "./Style.css";
import Image from "next/image";
import { Rate } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, MoveLeft, MoveRight } from "lucide-react";

const TWEEN_FACTOR_BASE = 0.3;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

const options: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 10;
const slides = Array.from(Array(SLIDE_COUNT).keys());

const Testimonials02 = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [opacityValues, setOpacityValues] = useState<number[]>([]);

  const testimonials = [
    {
      id: 1,
      star: 3,
      name: "Emily Carter",
      review:
        "I absolutely love the 'Midnight Bloom' perfume! It's the perfect blend of floral and musky notes. Lasts all day and gets me so many compliments!",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 2,
      star: 4,
      name: "Michael Johnson",
      review:
        "The 'Ocean Breeze' cologne is my new favorite. It's fresh, light, and perfect for everyday wear. Highly recommend it to anyone looking for a versatile scent.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 3,
      star: 5,
      name: "Sophia Lee",
      review:
        "I've been using 'Vanilla Whisper' for months now, and it's my go-to fragrance. It's warm, sweet, and not overpowering. Perfect for any occasion!",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 4,
      star: 3,
      name: "Daniel Brown",
      review:
        "The 'Sandalwood Serenity' is incredible! It's rich, woody, and has a calming effect. I wear it to work and even on dates. Always a hit!",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 5,
      star: 4,
      name: "Olivia Martinez",
      review:
        "I bought 'Citrus Splash' for summer, and it's amazing! So refreshing and energizing. It's like a burst of sunshine in a bottle.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 6,
      star: 5,
      name: "James Wilson",
      review:
        "The 'Leather & Spice' cologne is bold and unique. It's perfect for evenings out and always gets noticed. Definitely worth the purchase!",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 7,
      star: 5,
      name: "Ava Taylor",
      review:
        "I'm obsessed with 'Rose Elegance'! It's such a classic, sophisticated scent. I wear it to weddings and formal events, and it never disappoints.",
      image:
        "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 8,
      star: 4,
      name: "William Clark",
      review:
        "The 'Pine Forest' fragrance is so unique and earthy. It reminds me of hiking in the mountains. Great for nature lovers!",
      image:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
  ];

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(
        ".testembla__slide__number"
      ) as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const scale = numberWithinRange(tweenValue, 0, 1).toString();
          const tweenNode = tweenNodes.current[slideIndex];
          tweenNode.style.transform = `scale(${scale})`;
        });
      });
    },
    []
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const updateOpacityValues = useCallback(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const newOpacityValues = emblaApi
      .scrollSnapList()
      .map((snapPosition, index) => {
        let diffToTarget = snapPosition - scrollProgress;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();
            if (index === loopItem.index && target !== 0) {
              const sign = Math.sign(target);
              if (sign === -1)
                diffToTarget = snapPosition - (1 + scrollProgress);
              if (sign === 1)
                diffToTarget = snapPosition + (1 - scrollProgress);
            }
          });
        }

        const opacity = 1 - Math.abs(diffToTarget * 3);
        return Math.max(0, Math.min(1, opacity));
      });

    setOpacityValues(newOpacityValues);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);
    updateOpacityValues();

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("scroll", updateOpacityValues)
      .on("select", onSelect);

    onSelect();

    return () => {
      emblaApi
        .off("reInit", setTweenNodes)
        .off("reInit", setTweenFactor)
        .off("reInit", tweenScale)
        .off("scroll", tweenScale)
        .off("scroll", updateOpacityValues)
        .off("select", onSelect);
    };
  }, [emblaApi, tweenScale, onSelect, updateOpacityValues]);

  return (
    <div className="container mx-auto px-4 md:px-16 lg:px-32 py-12 md:py-8 space-y-8 lg:space-y-10 lg:py-14">
      <h2 className="text-lg text-center lg:text-[2rem] !leading-[1.1] font-medium tracking-wide text-templateText">
        WHAT OUR CUSTOMERS SAY
      </h2>
      <div className="testembla relative overflow-hidden">
        <div className="testembla__viewport" ref={emblaRef}>
          <div className="testembla__container">
            {testimonials.map((item, index) => (
              <div className="testembla__slide" key={index}>
                <div className="testembla__slide__number border overflow-hidden aspect-[4/4]">
                  <Image
                    src={item.image}
                    alt={item.name || "Testimonial Image"}
                    height={200}
                    width={200}
                    className="h-full cursor-grab w-full object-cover transition-opacity duration-200"
                    style={{ opacity: opacityValues[index] || 2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="absolute left-0 top-1/2 -translate-y-1/2   flex items-center justify-center"
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
        >
          <MoveLeft size={18} strokeWidth={1.5} />
        </button>

        <button
          className="absolute right-0 top-1/2 -translate-y-1/2  flex items-center justify-center "
          onClick={scrollNext}
          disabled={nextBtnDisabled}
        >
          <MoveRight size={18} strokeWidth={1.5} />
        </button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedIndex}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="grid gap-4 max-w-md mx-auto place-content-center place-items-center"
        >
          <Rate
            className="text-[18px]"
            value={testimonials[selectedIndex].star}
            disabled
          />
          <p className="text-center text-templateText tracking-wide leading-tight">
            {testimonials[selectedIndex].review}
          </p>
          <span className="flex items-center gap-0.5 text-lg text-gray-500 tracking-wide">
            <Minus strokeWidth={1} size={18} />
            {testimonials[selectedIndex].name}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Testimonials02;
