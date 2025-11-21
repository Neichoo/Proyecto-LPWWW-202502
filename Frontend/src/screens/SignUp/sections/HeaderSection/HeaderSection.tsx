import React from "react";

export const HeaderSection = (): JSX.Element => {
  return (
    <header className="inline-flex flex-col items-start gap-8">
      <h1 className="w-fit [font-family:'Poppins',Helvetica] font-semibold text-white text-[64px] tracking-[0] leading-[90.7px] whitespace-nowrap translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
        Registro
      </h1>

      <p className="w-fit [font-family:'Poppins',Helvetica] font-normal text-[#ffffffcc] text-[42.7px] tracking-[0] leading-[normal] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        Regístrate para poder realizar
        <br />
        un pedido en nuestra página
        <br />
        web!
      </p>
    </header>
  );
};
