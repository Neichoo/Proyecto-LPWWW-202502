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
    <section id="salsas" className="w-full py-16 px-4">
      <div className="container mx-auto max-w-7xl flex flex-col gap-6">
        <h2 className="mb-2 [font-family:'Roboto',Helvetica] font-semibold text-black text-4xl md:text-5xl tracking-tight leading-[1.1] translate-y-[-1rem] animate-fade-in opacity-0">
          Salsas (70 ml)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white border border-solid border-black p-6 rounded-2xl shadow-sm translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          {sauceProducts.map((product, index) => (
            <Card
              key={index}
              className="border border-solid border-black bg-white translate-y-[-1rem] animate-fade-in opacity-0 transition-[transform,box-shadow] hover:scale-[1.02] hover:shadow-lg duration-300"
              style={
                {
                  "--animation-delay": `${400 + index * 200}ms`,
                } as React.CSSProperties
              }
            >
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="relative self-stretch w-full h-[200px] md:h-[240px] rounded-xl bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex flex-col items-start justify-center gap-1 flex-1 self-stretch w-full">
                  <h3 className="self-stretch [font-family:'Roboto',Helvetica] font-medium text-black text-xl md:text-2xl text-center tracking-[0] leading-8">
                    {product.name} - {product.price}
                  </h3>

                  <p className="flex items-center justify-center self-stretch [font-family:'Roboto',Helvetica] font-normal text-[#4b5563] text-lg md:text-xl text-center tracking-[0] leading-7">
                    {product.ingredients}
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
