import { ShoppingCartIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Menú", href: "#menu" },
  { label: "Locales", href: "#locales" },
  { label: "Contacto", href: "#contacto" },
];

export const NavbarSection = (): JSX.Element => {
  return (
    <nav className="w-full h-[100px] bg-[#ca2b4b] translate-y-[-1rem] animate-fade-in opacity-0">
      <div className="h-full flex items-center justify-between px-[81px]">
        <div className="flex items-center gap-[13px]">
          <img
            className="w-[135px] h-[100px] rounded-[50.59px] object-cover"
            alt="Icono"
            src="https://c.animaapp.com/mi7tk9d8A2vM04/img/icono-1.png"
          />
          <h1 className="[font-family:'Roboto',Helvetica] font-medium text-[#fefdfe] text-[32px] tracking-[0] leading-[48px] whitespace-nowrap">
            Fukusuke
          </h1>
        </div>

        <div className="flex items-center gap-[70.38px]">
          <button
            className="transition-opacity hover:opacity-80"
            aria-label="Shopping cart"
          >
            <ShoppingCartIcon className="w-[43.99px] h-[43.99px] text-[#fefdfe]" />
          </button>

          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href === '#locales' ? '/locales' : '/'}
              className="[font-family:'Inter',Helvetica] font-medium text-[#fefdfe] text-[29.3px] tracking-[0] leading-[44px] transition-opacity hover:opacity-80"
            >
              {link.label}
            </Link>
          ))}

          <Link to="/login">
            <Button className="bg-[#27686b] hover:bg-[#1f5457] text-[#fefdfe] rounded-[11.73px] shadow-[0px_1.47px_2.93px_#0000000d] px-[35.19px] py-[20.53px] h-auto transition-colors">
              <span className="[font-family:'Inter',Helvetica] font-medium text-[23.5px] tracking-[0] leading-[35.2px]">
                Login
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
