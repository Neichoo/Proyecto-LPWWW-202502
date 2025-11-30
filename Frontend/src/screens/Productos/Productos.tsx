import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

const relatedProducts = [
  {
    id: 1,
    image: "https://c.animaapp.com/mi7tq1cuNal6Ce/img/image.svg",
    title: "Cerveza Japonesa - $3.000",
    description: "Ingredientes: agua, malta, lupulo, levadura.",
  },
  {
    id: 2,
    image: "https://c.animaapp.com/mi7tq1cuNal6Ce/img/image-3.svg",
    title: "Crunchy Roll - $6.000",
    description:
      "Ingredientes: arroz, alga nori, cangrejo, palta, tempura flakes, salsa spicy mayo.",
  },
  {
    id: 3,
    image: "https://c.animaapp.com/mi7tq1cuNal6Ce/img/image-1.svg",
    title: "Te verde frio - $1.500",
    description: "Ingredientes: agua, hojas de te verde, azucar, hielo.",
  },
  {
    id: 4,
    image: "https://c.animaapp.com/mi7tq1cuNal6Ce/img/image-2.svg",
    title: "Salsa Spicy Mayo - $2.000",
    description:
      "Ingredientes: mayonesa, pasta de aji picante, limon y un toque de azucar.",
  },
];

export const ProductDetailPage = (): JSX.Element => {
  return (
    <main
      className="bg-[#fefdfe] w-full min-h-screen relative"
      data-model-id="3:23"
    >
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
            <div className="aspect-[4/3] rounded-xl bg-[url(https://c.animaapp.com/mi7tq1cuNal6Ce/img/image-4.svg)] bg-cover bg-center" />
          </div>

          <article className="flex flex-col items-start justify-center gap-6 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
            <h1 className="self-stretch [font-family:'Roboto',Helvetica] font-semibold text-black text-[30px] tracking-[0] leading-[38px]">
              California Roll
            </h1>

            <p className="self-stretch [font-family:'Roboto',Helvetica] font-medium text-black text-xl tracking-[0] leading-8">
              $4.500
            </p>

            <p className="self-stretch [font-family:'Roboto',Helvetica] font-normal text-[#4b5563] text-lg tracking-[0] leading-7">
              Ingredientes: arroz, alga nori, cangrejo, palta, pepino.
            </p>

            <Button className="w-full h-12 px-6 bg-black rounded-lg shadow-button-shadow hover:bg-black/90 transition-colors">
              <span className="font-small-text font-[number:var(--small-text-font-weight)] text-white text-[18px] tracking-[var(--small-text-letter-spacing)] leading-[var(--small-text-line-height)] [font-style:var(--small-text-font-style)]">
                Anadir al carrito
              </span>
            </Button>
          </article>
        </section>

        <section className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
          <h2 className="mb-10 [font-family:'Roboto',Helvetica] font-semibold text-black text-[26px] tracking-[0] leading-[34px]">
            Productos relacionados
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => (
              <Card
                key={product.id}
                className="border-0 shadow-none bg-transparent translate-y-[-1rem] animate-fade-in opacity-0"
                style={
                  {
                    "--animation-delay": `${600 + index * 100}ms`,
                  } as React.CSSProperties
                }
              >
                <CardContent className="p-0 flex flex-col gap-6">
                  <div
                    className="w-full h-[200px] md:h-[230px] rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />

                  <div className="flex flex-col gap-1">
                    <h3 className="[font-family:'Roboto',Helvetica] font-medium text-black text-xl tracking-[0] leading-7">
                      {product.title}
                    </h3>

                    <p className="font-body-text font-[number:var(--body-text-font-weight)] text-[#4b5563] text-[18px] tracking-[var(--body-text-letter-spacing)] leading-[var(--body-text-line-height)] [font-style:var(--body-text-font-style)]">
                      {product.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
