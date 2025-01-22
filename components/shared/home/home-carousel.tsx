"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomeCarousel({
  items,
}: {
  items: {
    title: string;
    url: string;
    image: string;
    buttonCaption: string;
  }[];
}) {
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      dir="ltr"
      plugins={[autoplayPlugin.current]}
      className="w-full mx-auto relative"
      onMouseEnter={() => autoplayPlugin.current.stop()}
      onMouseLeave={() => autoplayPlugin.current.reset()}
    >
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.title}>
            <Link href={item.url}>
              <div className="relative aspect-[16/6] w-full h-auto">
                {/* Background Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 text-white bg-gradient-to-r from-black/40 to-transparent">
                  <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4">
                    {item.title}
                  </h2>
                  <Button className="bg-primary text-white text-sm md:text-lg px-4 py-2">
                    {item.buttonCaption}
                  </Button>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Navigation Buttons */}
      <CarouselPrevious className="absolute left-4 md:left-12 top-1/2 transform -translate-y-1/2 z-10" />
      <CarouselNext className="absolute right-4 md:right-12 top-1/2 transform -translate-y-1/2 z-10" />
    </Carousel>
  );
}
