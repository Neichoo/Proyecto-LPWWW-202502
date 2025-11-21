import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
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
    className:
      "w-[calc(100%_-_927px)] h-[calc(100%_-_201px)] top-[100px] left-0",
  },
  {
    id: 2,
    src: "https://c.animaapp.com/mgy9hocl11ZIi8/img/unsplash-xfngap-dtoe.png",
    alt: "Unsplash xfngap dtoe",
    className:
      "w-[calc(100%_-_927px)] h-[calc(100%_-_201px)] top-[100px] left-[927px]",
  },
  {
    id: 3,
    src: "https://c.animaapp.com/mgy9hocl11ZIi8/img/unsplash-yffgke3y4f8.png",
    alt: "Unsplash",
    className:
      "w-[calc(100%_-_727px)] h-[calc(100%_-_100px)] top-[50px] left-20",
  },
  {
    id: 4,
    src: "https://c.animaapp.com/mgy9hocl11ZIi8/img/unsplash-g30p1zcozxo.png",
    alt: "Unsplash",
    className:
      "w-[calc(100%_-_727px)] h-[calc(100%_-_100px)] top-[50px] left-[647px]",
  },
  {
    id: 5,
    src: "https://c.animaapp.com/mgy9hocl11ZIi8/img/unsplash-cqblg3lzepk.png",
    alt: "Unsplash",
    className: "w-[calc(100%_-_526px)] h-full top-0 left-[251px]",
  },
];

const carouselDots = [
  { id: 1, active: true },
  { id: 2, active: false },
  { id: 3, active: false },
  { id: 4, active: false },
  { id: 5, active: false },
];

export const LandingPage = (): JSX.Element => {
  return (
    <div
      className="bg-[#fefdfe] overflow-hidden w-full min-w-[1920px] relative"
      data-model-id="3:391"
    >
      <NavbarSection />

      <section className="relative w-full pt-[100px]">
        <div className="flex flex-col w-[1920px] items-center gap-[80.2px] mx-auto translate-y-[-1rem] animate-fade-in opacity-0">
          <div className="flex flex-col w-[1789.65px] items-center gap-[30.08px] px-[80.21px] py-[50.13px] relative">
            <div className="relative w-full h-[601.83px]">
              <div className="absolute w-[calc(100%_-_100px)] h-full top-0 left-[50px] border-[1.25px] border-solid border-black">
                {carouselImages.map((image) => (
                  <div
                    key={image.id}
                    className={`${image.className} absolute flex bg-white rounded-[50.13px] overflow-hidden`}
                  >
                    <img
                      className="flex-1 object-cover"
                      alt={image.alt}
                      src={image.src}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="inline-flex items-center justify-center gap-[10.03px] p-[10.03px] relative flex-[0_0_auto]">
              <Button
                variant="ghost"
                size="icon"
                className="h-auto p-[10.03px]"
              >
                <ChevronLeftIcon className="w-[30.08px] h-[30.08px]" />
              </Button>

              <div className="inline-flex items-center gap-[12.53px] p-[10.03px] relative flex-[0_0_auto]">
                {carouselDots.map((dot) => (
                  <div
                    key={dot.id}
                    className={`relative ${
                      dot.active
                        ? "w-[20.05px] h-[20.05px] bg-[#eb7e5c] rounded-[10.03px]"
                        : "w-[15.04px] h-[15.04px] bg-carouselgray rounded-[7.52px] opacity-50"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-auto p-[10.03px]"
              >
                <ChevronRightIcon className="w-[30.08px] h-[30.08px]" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <NavbarMenuSection />

      <RollsSaleSection />

      <SaucesSaleSection />

      <section className="relative w-full px-[80px] py-16 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        <div className="flex flex-col items-start gap-8 max-w-[1760px] mx-auto">
          <h2 className="[font-family:'Roboto',Helvetica] font-semibold text-black text-8xl tracking-[-1.92px] leading-[normal]">
            Bebidas (350ml)
          </h2>

          <div className="flex w-full items-center gap-8 bg-white border border-solid border-black p-8">
            {drinksData.map((drink, index) => (
              <Card
                key={drink.id}
                className="flex-1 border-0 shadow-none translate-y-[-1rem] animate-fade-up opacity-0"
                style={
                  {
                    "--animation-delay": `${400 + index * 200}ms`,
                  } as React.CSSProperties
                }
              >
                <CardContent className="flex flex-col items-start gap-6 p-0">
                  <div
                    className="relative w-full h-[405px] rounded-lg bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${drink.image})` }}
                  />

                  <div className="flex flex-col items-start justify-center gap-1 w-full">
                    <h3 className="w-full [font-family:'Roboto',Helvetica] font-medium text-black text-2xl text-center tracking-[0] leading-9">
                      {drink.name}
                    </h3>

                    <p className="w-full flex items-center justify-center [font-family:'Roboto',Helvetica] font-normal text-[#828282] text-2xl text-center tracking-[0] leading-9">
                      {drink.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full px-[80px] py-16 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        <div className="flex flex-col items-start gap-8 max-w-[1760px] mx-auto">
          <h2 className="[font-family:'Roboto',Helvetica] font-semibold text-black text-8xl tracking-[-1.92px] leading-[normal]">
            Promociones
          </h2>

          <div className="flex w-full items-center gap-8 bg-white border border-solid border-black p-8">
            {promosData.map((promo, index) => (
              <Card
                key={promo.id}
                className="flex-1 border-0 shadow-none translate-y-[-1rem] animate-fade-up opacity-0"
                style={
                  {
                    "--animation-delay": `${600 + index * 200}ms`,
                  } as React.CSSProperties
                }
              >
                <CardContent className="flex flex-col items-start gap-6 p-0">
                  <div
                    className="relative w-full h-[405px] rounded-lg bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${promo.image})` }}
                  />

                  <div className="flex flex-col items-start justify-center gap-1 w-full">
                    <h3 className="w-full [font-family:'Roboto',Helvetica] font-medium text-black text-2xl text-center tracking-[0] leading-9">
                      {promo.name}
                    </h3>

                    <p className="w-full flex items-center justify-center [font-family:'Roboto',Helvetica] font-normal text-[#828282] text-2xl text-center tracking-[0] leading-9">
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
