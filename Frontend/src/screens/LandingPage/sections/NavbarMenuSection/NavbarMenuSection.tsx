import React from "react";

const menuItems = [
  { label: "Rolls", width: "w-[92px]" },
  { label: "Salsas", width: "w-[124.4px]" },
  { label: "Bebidas", width: "w-[154px]" },
  { label: "Promociones", width: "w-[250px]" },
];

export const NavbarMenuSection = (): JSX.Element => {
  return (
    <nav className="w-full h-20 flex bg-[#27686b]">
      <div className="flex mt-2.5 w-full max-w-[922px] h-[60px] ml-20 items-center justify-end gap-24">
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            className={`${item.width} h-[60px] bg-[#27686b] flex items-center justify-center [font-family:'Inter',Helvetica] font-medium text-[#fefdfe] text-[40px] tracking-[0] leading-[60.0px] whitespace-nowrap transition-opacity hover:opacity-80 cursor-pointer translate-y-[-1rem] animate-fade-in opacity-0`}
            style={
              { "--animation-delay": `${index * 200}ms` } as React.CSSProperties
            }
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};
