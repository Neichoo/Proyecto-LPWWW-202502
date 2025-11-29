import React from "react";
import { Button } from "../../../../components/ui/button";
import { Link } from "react-router-dom";

const navigationItems = [
  { label: "Administrar Usuarios", active: true },
  { label: "Administrar Compras", active: false },
  { label: "Administrar Productos", active: true },
];

export const NavigationBarSection = (): JSX.Element => {
  return (
    <nav className="w-full h-[100px] bg-[#ca2b4b] translate-y-[-1rem] animate-fade-in opacity-0">
      <div className="flex items-center justify-between h-full px-20">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3">
            <img
              className="w-[135px] h-[100px] rounded-[50.59px] object-cover"
              alt="Icono"
              src="https://c.animaapp.com/mi7trcsqAboA6X/img/icono-1.png"
            />
            <h1 className="[font-family:'Roboto',Helvetica] font-medium text-[#fefdfe] text-[32px] tracking-[0] leading-[48px] whitespace-nowrap">
              Fukusuke
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-[50px]">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              className="[font-family:'Inter',Helvetica] font-medium text-[29.3px] tracking-[0] leading-[44.0px] whitespace-nowrap transition-colors hover:text-white"
              style={{ color: item.active ? "#fefdfe" : "#000000" }}
            >
              {item.label}
            </button>
          ))}

          <Button className="h-auto bg-[#27686b] hover:bg-[#1f5457] rounded-[11.73px] shadow-[0px_1.47px_2.93px_#0000000d] px-[35.19px] py-[20.53px] transition-colors">
            <span className="[font-family:'Inter',Helvetica] font-medium text-[#fefdfe] text-[23.5px] tracking-[0] leading-[35.2px] whitespace-nowrap">
              Logout
            </span>
          </Button>
        </div>
      </div>
    </nav>
  );
};
