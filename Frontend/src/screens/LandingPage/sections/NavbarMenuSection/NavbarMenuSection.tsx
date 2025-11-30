import React from "react";

const menuItems = [
  { label: "Rolls", href: "#rolls" },
  { label: "Salsas", href: "#salsas" },
  { label: "Bebidas", href: "#bebidas" },
  { label: "Promociones", href: "#promociones" },
  { label: "Opiniones", href: "#opiniones" },
];

export const NavbarMenuSection = (): JSX.Element => {
  return (
    <nav className="w-full bg-[#27686b]">
      <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-center gap-10">
        {menuItems.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            className="[font-family:'Inter',Helvetica] font-medium text-[#fefdfe] text-lg tracking-[0] leading-[26px] transition-opacity hover:opacity-80 translate-y-[-1rem] animate-fade-in opacity-0"
            style={
              { "--animation-delay": `${index * 120}ms` } as React.CSSProperties
            }
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};
