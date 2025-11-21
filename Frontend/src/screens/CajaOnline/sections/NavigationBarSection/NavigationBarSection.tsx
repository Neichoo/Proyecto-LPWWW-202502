import React from "react";
import { Button } from "../../../../components/ui/button";

export const NavigationBarSection = (): JSX.Element => {
  return (
    <nav className="w-full h-[100px] bg-[#ca2b4b] flex items-center justify-between px-20 translate-y-[-1rem] animate-fade-in opacity-0">
      <div className="flex items-center gap-6">
        <img
          className="w-[135px] h-[100px] rounded-[50.59px] object-cover"
          alt="Icono"
          src="https://c.animaapp.com/mi7tcl3s84JVka/img/icono-1.png"
        />
        <h1 className="[font-family:'Inter',Helvetica] font-medium text-[#fefdfe] text-[32px] leading-[48px] tracking-[0] whitespace-nowrap">
          Fukusuke
        </h1>
      </div>

      <Button className="h-auto bg-[#27686b] hover:bg-[#1f5457] text-[#fefdfe] rounded-[11.73px] shadow-[0px_1.47px_2.93px_#0000000d] px-[35.19px] py-[20.53px] gap-[11.73px] [font-family:'Inter',Helvetica] font-medium text-[23.5px] leading-[35.2px] transition-colors">
        Logout
      </Button>
    </nav>
  );
};
