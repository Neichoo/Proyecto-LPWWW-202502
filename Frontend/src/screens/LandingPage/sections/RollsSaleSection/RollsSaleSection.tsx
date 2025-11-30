import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

type Product = {
  id: number;
  title: string;
  price: number;
  description?: string;
  ingredients?: string;
  image?: string;
  image_url?: string;
};

type Props = {
  products: Product[];
  onSelect: (p: Product) => void;
};

export const RollsSaleSection = ({ products, onSelect }: Props): JSX.Element => {
  const imgFor = (p: Product) => p.image || p.image_url || "";

  return (
    <section id="rolls" className="w-full py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <h2 className="[font-family:'Roboto',Helvetica] font-semibold text-black text-4xl md:text-5xl tracking-tight leading-[1.1] mb-8 translate-y-[-1rem] animate-fade-in opacity-0">
          Rolls (6 piezas)
        </h2>

        <div className="bg-white border border-solid border-black p-6 rounded-2xl shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((roll, index) => (
              <Card
                key={roll.id}
                className="border border-solid border-black bg-white translate-y-[-1rem] animate-fade-in opacity-0 transition-[transform,box-shadow] hover:scale-[1.02] hover:shadow-lg duration-300 cursor-pointer"
                style={{ "--animation-delay": `${index * 200}ms` } as React.CSSProperties}
                onClick={() => onSelect(roll)}
              >
                <CardContent className="flex flex-col gap-6 p-6">
                  <div className="w-full h-[200px] md:h-[240px] rounded-xl bg-white flex items-center justify-center overflow-hidden">
                    <img src={imgFor(roll)} alt={roll.title} className="w-full h-full object-contain" />
                  </div>

                  <div className="flex flex-col items-center justify-center gap-1 flex-1">
                    <h3 className="w-full [font-family:'Roboto',Helvetica] font-medium text-black text-xl md:text-2xl text-center tracking-[0] leading-8">
                      {roll.title} - ${roll.price.toLocaleString("es-CL")}
                    </h3>

                    <p className="w-full flex items-center justify-center [font-family:'Roboto',Helvetica] font-normal text-[#4b5563] text-lg md:text-xl text-center tracking-[0] leading-7">
                      {roll.ingredients || roll.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
