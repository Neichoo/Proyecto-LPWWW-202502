import { ShoppingCartIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Link } from "react-router-dom";

const navigationItems = [
  { label: "Menú", to: "/" },
  { label: "Locales", to: "/locales" },
  { label: "Contacto", to: "/contacto" },
];

export const NavigationBarSection = (): JSX.Element => {
  return (
    <nav className="w-full h-[100px] bg-[#ca2b4b] translate-y-[-1rem] animate-fade-in opacity-0">
      <div className="h-full max-w-[1920px] mx-auto px-[81px] flex items-center justify-between">
        <div className="flex items-center gap-3 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <img
            className="w-[135px] h-[100px] rounded-[50.59px] object-cover"
            alt="Icono"
            src="https://c.animaapp.com/mi7ts6z7Slrdkw/img/icono-1.png"
          />
          <h1 className="[font-family:'Roboto',Helvetica] font-medium text-[#fefdfe] text-[32px] leading-[48px] whitespace-nowrap">
            Fukusuke
          </h1>
        </div>

        <div className="flex items-center gap-[70.38px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
          <Link to="/carrito" className="relative w-[43.99px] h-[43.99px] transition-transform hover:scale-110" aria-label="Shopping cart">
            <ShoppingCartIcon className="w-full h-full text-[#fefdfe]" />
          </Link>

          {navigationItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="[font-family:'Inter',Helvetica] font-medium text-[#fefdfe] text-[29.3px] leading-[44.0px] transition-opacity hover:opacity-80"
            >
              {item.label}
            </Link>
          ))}

          <Link to="/login" className="h-auto">
            <Button className="h-auto bg-[#27686b] hover:bg-[#1f5457] text-[#fefdfe] rounded-[11.73px] shadow-[0px_1.47px_2.93px_#0000000d] px-[35.19px] py-[20.53px] [font-family:'Inter',Helvetica] font-medium text-[23.5px] leading-[35.2px] transition-transform hover:scale-105">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
