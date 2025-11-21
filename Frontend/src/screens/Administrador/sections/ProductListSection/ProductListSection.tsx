import React from "react";
import { Button } from "../../../../components/ui/button";
import { Checkbox } from "../../../../components/ui/checkbox";

const products = [
  { name: "Dragon Roll", price: "6500" },
  { name: "California Roll", price: "4500" },
  { name: "Spicy Tuna Roll", price: "5500" },
  { name: "Crunchy Roll", price: "6000" },
  { name: "...............", price: ".............." },
  { name: "...............", price: ".............." },
  { name: "...............", price: ".............." },
  { name: "...............", price: ".............." },
  { name: "...............", price: ".............." },
  { name: "...............", price: ".............." },
  { name: "...............", price: ".............." },
  { name: "...............", price: ".............." },
  { name: "...............", price: ".............." },
  { name: "...............", price: ".............." },
  { name: "...............", price: ".............." },
  { name: "...............", price: ".............." },
  { name: "...............", price: ".............." },
  { name: "...............", price: ".............." },
  { name: "...............", price: ".............." },
  { name: "...............", price: ".............." },
];

export const ProductListSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-start gap-[49px]">
      {products.map((product, index) => (
        <article
          key={`product-${index}`}
          className="flex w-full items-center justify-between gap-4 opacity-0 animate-fade-in"
          style={
            { "--animation-delay": `${index * 50}ms` } as React.CSSProperties
          }
        >
          <div className="flex items-start gap-2 flex-1">
            <div className="w-[273px] font-heading font-[number:var(--heading-font-weight)] text-[#1e1e1e] text-[length:var(--heading-font-size)] text-center tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] [font-style:var(--heading-font-style)]">
              {product.name}
            </div>

            <div className="w-[584px] font-heading font-[number:var(--heading-font-weight)] text-[#1e1e1e] text-[length:var(--heading-font-size)] text-center tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] [font-style:var(--heading-font-style)]">
              {product.price}
            </div>
          </div>

          <div className="flex flex-col w-[274px] h-12 items-center justify-center p-1">
            <Checkbox
              defaultChecked
              className="w-[18px] h-[18px] data-[state=checked]:bg-m-3syslightprimary data-[state=checked]:border-m-3syslightprimary"
            />
          </div>

          <div className="flex w-[582px] h-12 items-center justify-center gap-4">
            <Button
              variant="outline"
              className="h-auto bg-[#e3e3e3] border-[#767676] hover:bg-[#d3d3d3] transition-colors"
            >
              <span className="font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-[#1e1e1e] text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] [font-style:var(--single-line-body-base-font-style)]">
                Editar
              </span>
            </Button>
          </div>
        </article>
      ))}
    </section>
  );
};
