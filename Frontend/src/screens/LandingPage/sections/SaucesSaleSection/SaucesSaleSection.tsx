import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

const sauceProducts = [
  {
    name: "Salsa Soja Premium",
    price: "$1.500",
    image: "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-8.png",
    ingredients:
      "Ingredientes: agua, soja fermentada, trigo, sal, conservante natural.",
  },
  {
    name: "Salsa Spicy Mayo",
    price: "$2.000",
    image: "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-8.png",
    ingredients: "",
  },
  {
    name: "Salsa Unagi",
    price: "$2.500",
    image: "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-8.png",
    ingredients:
      "Ingredientes: salsa de soja, azúcar, mirin (vino de arroz dulce), maicena para espesar.",
  },
];

export const SaucesSaleSection = (): JSX.Element => {
  return (
    <section className="w-full flex flex-col">
      <h2 className="mb-8 [font-family:'Roboto',Helvetica] font-semibold text-black text-8xl tracking-[-1.92px] leading-[normal] translate-y-[-1rem] animate-fade-in opacity-0">
        Salsas (70 ml)
      </h2>

      <div className="grid grid-cols-3 gap-8 bg-white border border-solid border-black p-0 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        {sauceProducts.map((product, index) => (
          <Card
            key={index}
            className="border-0 shadow-none bg-transparent translate-y-[-1rem] animate-fade-in opacity-0"
            style={
              {
                "--animation-delay": `${400 + index * 200}ms`,
              } as React.CSSProperties
            }
          >
            <CardContent className="flex flex-col items-start gap-6 p-0">
              <div
                className="relative self-stretch w-full h-[405px] rounded-lg bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${product.image})` }}
              />

              <div className="flex flex-col items-start justify-center gap-1 flex-1 self-stretch w-full">
                <h3 className="self-stretch [font-family:'Roboto',Helvetica] font-medium text-black text-2xl text-center tracking-[0] leading-9">
                  {product.name} - {product.price}
                </h3>

                <p className="flex items-center justify-center self-stretch [font-family:'Roboto',Helvetica] font-normal text-[#828282] text-2xl text-center tracking-[0] leading-9">
                  {product.ingredients}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
