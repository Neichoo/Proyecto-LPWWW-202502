import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

const rollsData = [
  {
    name: "California Roll",
    price: "$4.500",
    ingredients: "Ingredientes: arroz, alga nori, cangrejo, palta, pepino.",
    image: "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-14.png",
    delay: "0ms",
  },
  {
    name: "Spicy Tuna Roll",
    price: "$5.500",
    ingredients:
      "Ingredientes: arroz, alga nori, atún picante, pepino, cebollín.",
    image: "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-14.png",
    delay: "200ms",
  },
  {
    name: "Philadelphia Roll",
    price: "$5.000",
    ingredients: "Ingredientes: arroz, alga nori, salmón, queso crema, palta.",
    image: "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-14.png",
    delay: "400ms",
  },
  {
    name: "Tempura Shrimp Roll",
    price: "$6.000",
    ingredients:
      "Ingredientes: arroz, alga nori, camarón tempura, aguacate, mayonesa spicy.",
    image: "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-14.png",
    delay: "600ms",
  },
  {
    name: "Dragon Roll",
    price: "$6.500",
    ingredients:
      "Ingredientes: arroz, alga nori, anguila (unagi), pepino, palta, salsa unagi.",
    image: "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-14.png",
    delay: "800ms",
  },
  {
    name: "Crunchy Roll",
    price: "$6.000",
    ingredients:
      "Ingredientes: arroz, alga nori, cangrejo, palta, tempura flakes, salsa spicy mayo.",
    image: "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-14.png",
    delay: "1000ms",
  },
];

export const RollsSaleSection = (): JSX.Element => {
  return (
    <section className="w-full py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <h2 className="[font-family:'Roboto',Helvetica] font-semibold text-black text-6xl md:text-7xl lg:text-8xl tracking-[-1.92px] leading-normal mb-12 translate-y-[-1rem] animate-fade-in opacity-0">
          Rolls (6 piezas)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rollsData.map((roll, index) => (
            <Card
              key={index}
              className="border border-solid border-black bg-white translate-y-[-1rem] animate-fade-in opacity-0 transition-[transform,box-shadow] hover:scale-[1.02] hover:shadow-lg duration-300"
              style={{ "--animation-delay": roll.delay } as React.CSSProperties}
            >
              <CardContent className="flex flex-col gap-6 p-6">
                <div
                  className="w-full h-[405px] rounded-lg bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${roll.image})` }}
                />

                <div className="flex flex-col items-center justify-center gap-1 flex-1">
                  <h3 className="w-full [font-family:'Roboto',Helvetica] font-medium text-black text-2xl text-center tracking-[0] leading-9">
                    {roll.name} - {roll.price}
                  </h3>

                  <p className="w-full flex items-center justify-center [font-family:'Roboto',Helvetica] font-normal text-[#828282] text-2xl text-center tracking-[0] leading-9">
                    {roll.ingredients}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
