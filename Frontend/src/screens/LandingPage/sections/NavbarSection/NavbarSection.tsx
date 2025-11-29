import { ShoppingCartIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Menú" },
  { label: "Locales" },
  { label: "Contacto" },
];

export const NavbarSection = (): JSX.Element => {
  return (
    <nav className="w-full h-[100px] bg-[#ca2b4b] relative">
      <div className="flex items-center justify-between h-full px-[81px]">
        <div className="flex items-center gap-6 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
          <Link to="/" className="flex items-center gap-3">
            <img
              className="w-[135px] h-[101px] rounded-[50.59px] object-cover"
              alt="Icono"
              src="https://c.animaapp.com/mgy9hocl11ZIi8/img/icono-1.png"
            />
            <h1 className="[font-family:'Roboto',Helvetica] font-medium text-[#fefdfe] text-[32px] tracking-[0] leading-[48px] whitespace-nowrap">
              Fukusuke
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-[70.38px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <Link to="/carrito" className="relative w-[43.99px] h-[43.99px] transition-transform hover:scale-110">
            <ShoppingCartIcon
              className="w-full h-full text-[#fefdfe]"
              strokeWidth={1.5}
            />
          </Link>

          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.label === 'Locales' ? '/locales' : item.label === 'Menú' ? '/' : '/contacto'}
              className="[font-family:'Inter',Helvetica] font-medium text-[#fefdfe] text-[29.3px] tracking-[0] leading-[44px] transition-opacity hover:opacity-80"
            >
              {item.label}
            </Link>
          ))}

          <Link to="/login">
            <Button className="h-auto bg-[#27686b] hover:bg-[#1f5457] text-[#fefdfe] px-[35.19px] py-[20.53px] rounded-[11.73px] shadow-[0px_1.47px_2.93px_#0000000d] [font-family:'Inter',Helvetica] font-medium text-[23.5px] leading-[35.2px] transition-transform hover:scale-105">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
