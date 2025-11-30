import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { FooterSection } from "./sections/FooterSection";
import { NavbarMenuSection } from "./sections/NavbarMenuSection";
import { NavbarSection } from "./sections/NavbarSection";
import { RollsSaleSection } from "./sections/RollsSaleSection";
import { SaucesSaleSection } from "./sections/SaucesSaleSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";

const drinksData = [
  {
    id: 1,
    name: "Té verde frío - $1.500",
    description: "Ingredientes: agua, hojas de té verde, azúcar, hielo.",
    image: "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-3.png",
  },
  {
    id: 2,
    name: "Cerveza Japonesa - $3.000",
    description: "Ingredientes: agua, malta, lúpulo, levadura.",
    image: "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-4.png",
  },
  {
    id: 3,
    name: "Lychee Soda - $2.000",
    description:
      "Ingredientes: agua carbonatada, extracto de lichi, azúcar, ácido cítrico.",
    image: "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-5.png",
  },
];

const promosData = [
  {
    id: 1,
    name: "Promo Sushi Starter - $9.500",
    description:
      "1 California Roll + 1 Philadelphia Roll + 1 Salsa Spicy Mayo + 1 Té Verde Frío.",
    image: "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-2.png",
  },
  {
    id: 2,
    name: "Promo Tempura Lover - $12.500",
    description:
      "1 Tempura Shrimp Roll + 1 Crunchy Roll + 1 Salsa Unagi + 1 Refresco de Lichi",
    image: "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-2.png",
  },
  {
    id: 3,
    name: "Promo Ultimate Sushi Combo - $22.000",
    description:
      "1 Dragon Roll + 1 Spicy Tuna Roll + 1 California Roll + 2 Salsas a elección + 2 Bebidas a elección.",
    image: "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-2.png",
  },
];

const carouselImages = [
  {
    id: 1,
    src: "https://c.animaapp.com/mgy9hocl11ZIi8/img/unsplash-s3ejzlra4yw.png",
    alt: "Unsplash",
  },
  {
    id: 2,
    src: "https://c.animaapp.com/mgy9hocl11ZIi8/img/unsplash-xfngap-dtoe.png",
    alt: "Unsplash xfngap dtoe",
  },
  {
    id: 3,
    src: "https://c.animaapp.com/mgy9hocl11ZIi8/img/unsplash-yffgke3y4f8.png",
    alt: "Unsplash",
  },
];

export const LandingPage = (): JSX.Element => {
  const slides = useMemo(() => carouselImages.slice(0, 3), []);
  const [slideIndex, setSlideIndex] = useState(0);

  const goPrev = () => {
    setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setSlideIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      className="bg-[#fefdfe] overflow-hidden w-full min-h-screen relative"
      data-model-id="3:391"
    >
      <NavbarSection />

      <section className="relative w-full pt-16 px-4">
        <div className="flex flex-col w-full items-center gap-6 max-w-7xl mx-auto translate-y-[-1rem] animate-fade-in opacity-0">
          <div className="w-full relative">
            <div className="overflow-hidden rounded-3xl border border-black shadow-sm">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${slideIndex * 100}%)` }}
              >
                {slides.map((image) => (
                  <div key={image.id} className="w-full flex-shrink-0">
                    <img
                      className="w-full h-[240px] md:h-[360px] object-contain bg-white"
                      alt={image.alt}
                      src={image.src}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute inset-y-0 left-2 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 p-0 bg-white/70 hover:bg-white shadow-sm"
                onClick={goPrev}
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </Button>
            </div>
            <div className="absolute inset-y-0 right-2 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 p-0 bg-white/70 hover:bg-white shadow-sm"
                onClick={goNext}
              >
                <ChevronRightIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="inline-flex items-center justify-center gap-3 p-2 rounded-xl bg-white/80 shadow-sm">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlideIndex(idx)}
                className={`transition-all ${idx === slideIndex ? "w-4 h-4 bg-[#eb7e5c] rounded-full" : "w-3 h-3 bg-carouselgray rounded-full opacity-50"}`}
                aria-label={`Ir a imagen ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <NavbarMenuSection />

      <RollsSaleSection />

      <SaucesSaleSection />

      <section id="bebidas" className="relative w-full px-4 py-16 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        <div className="flex flex-col items-start gap-8 max-w-7xl mx-auto">
          <h2 className="[font-family:'Roboto',Helvetica] font-semibold text-black text-4xl md:text-5xl tracking-tight leading-[1.1]">
            Bebidas (350ml)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full bg-white border border-solid border-black p-6 rounded-2xl shadow-sm">
            {drinksData.map((drink, index) => (
              <Card
                key={drink.id}
                className="border border-solid border-black bg-white translate-y-[-1rem] animate-fade-up opacity-0 transition-[transform,box-shadow] hover:scale-[1.02] hover:shadow-lg duration-300"
                style={
                  {
                    "--animation-delay": `${400 + index * 200}ms`,
                  } as React.CSSProperties
                }
              >
                <CardContent className="flex flex-col items-start gap-4 p-6">
                  <div className="relative w-full h-[200px] md:h-[240px] rounded-xl bg-white flex items-center justify-center overflow-hidden">
                    <img
                      src={drink.image}
                      alt={drink.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex flex-col items-start justify-center gap-1 w-full">
                    <h3 className="w-full [font-family:'Roboto',Helvetica] font-medium text-black text-xl md:text-2xl text-center tracking-[0] leading-8">
                      {drink.name}
                    </h3>

                    <p className="w-full flex items-center justify-center [font-family:'Roboto',Helvetica] font-normal text-[#4b5563] text-lg md:text-xl text-center tracking-[0] leading-7">
                      {drink.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="promociones" className="relative w-full px-4 py-16 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        <div className="flex flex-col items-start gap-8 max-w-7xl mx-auto">
          <h2 className="[font-family:'Roboto',Helvetica] font-semibold text-black text-4xl md:text-5xl tracking-tight leading-[1.1]">
            Promociones
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full bg-white border border-solid border-black p-6 rounded-2xl shadow-sm">
            {promosData.map((promo, index) => (
              <Card
                key={promo.id}
                className="border border-solid border-black bg-white translate-y-[-1rem] animate-fade-up opacity-0 transition-[transform,box-shadow] hover:scale-[1.02] hover:shadow-lg duration-300"
                style={
                  {
                    "--animation-delay": `${600 + index * 200}ms`,
                  } as React.CSSProperties
                }
              >
                <CardContent className="flex flex-col items-start gap-4 p-6">
                  <div className="relative w-full h-[200px] md:h-[240px] rounded-xl bg-white flex items-center justify-center overflow-hidden">
                    <img
                      src={promo.image}
                      alt={promo.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex flex-col items-start justify-center gap-1 w-full">
                    <h3 className="w-full [font-family:'Roboto',Helvetica] font-medium text-black text-xl md:text-2xl text-center tracking-[0] leading-8">
                      {promo.name}
                    </h3>

                    <p className="w-full flex items-center justify-center [font-family:'Roboto',Helvetica] font-normal text-[#4b5563] text-lg md:text-xl text-center tracking-[0] leading-7">
                      {promo.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <FooterSection />
    </div>
  );
};
