import { ShoppingCartIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

const navigationItems = [
  { label: "Menú", href: "#menu" },
  { label: "Locales", href: "#locales" },
  { label: "Contacto", href: "#contacto" },
];

const footerColumns = [
  {
    title: "Tema",
    links: ["Página", "Página", "Página"],
  },
  {
    title: "Tema",
    links: ["Página", "Página", "Página"],
  },
  {
    title: "Tema",
    links: ["Página", "Página", "Página"],
  },
];

export const Locales = (): JSX.Element => {
  return (
    <div
      className="bg-white w-full min-h-screen flex flex-col"
      data-model-id="3:192"
    >
      <header className="w-full h-[100px] bg-[#ca2b4b] flex items-center justify-between px-20">
        <div className="flex items-center gap-6 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
          <Link to="/" className="flex items-center gap-3">
            <img
              className="w-[135px] h-[100px] rounded-[50.59px] object-cover"
              alt="Icono"
              src="https://c.animaapp.com/mi7tkxrdIM2BKY/img/icono-1.png"
            />
            <h1 className="[font-family:'Roboto',Helvetica] font-medium text-[#fefdfe] text-[32px] leading-[48px] tracking-[0] whitespace-nowrap">
              Fukusuke
            </h1>
          </Link>
        </div>

        <nav className="flex items-center gap-[70.38px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <Link to="/carrito" className="h-auto w-auto p-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-auto w-auto p-0 hover:bg-transparent"
              aria-label="Shopping cart"
            >
              <ShoppingCartIcon className="w-[43.99px] h-[43.99px] text-white" />
            </Button>
          </Link>

          {navigationItems.map((item, index) => (
            <Link
              key={index}
              to={item.href === '#locales' ? '/locales' : item.href === '#menu' ? '/' : '/contacto'}
              className="[font-family:'Inter',Helvetica] font-medium text-[#fefdfe] text-[29.3px] leading-[44.0px] tracking-[0] hover:opacity-80 transition-opacity"
            >
              {item.label}
            </Link>
          ))}

          <Link to="/login" className="h-auto">
            <Button className="h-auto bg-[#27686b] hover:bg-[#27686b]/90 rounded-[11.73px] shadow-[0px_1.47px_2.93px_#0000000d] px-[35.19px] py-[20.53px]">
              <span className="[font-family:'Inter',Helvetica] font-medium text-[#fefdfe] text-[23.5px] leading-[35.2px] tracking-[0]">
                Login
              </span>
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-10">
        <h2 className="font-title font-[number:var(--title-font-weight)] text-black text-[length:var(--title-font-size)] tracking-[var(--title-letter-spacing)] leading-[var(--title-line-height)] [font-style:var(--title-font-style)] mt-20 mb-10 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
          Locales
        </h2>

        <section className="w-full max-w-[1470px] flex flex-col gap-6 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          <p className="font-body-text font-[number:var(--body-text-font-weight)] text-black text-[length:var(--body-text-font-size)] tracking-[var(--body-text-letter-spacing)] leading-[var(--body-text-line-height)] [font-style:var(--body-text-font-style)]">
            En rojo se muestra la zona que tiene cobertura delivery.
          </p>

          <div className="relative w-full">
            <img
              className="w-full h-auto object-cover rounded-lg"
              alt="Mapa de cobertura"
              src="https://c.animaapp.com/mi7tkxrdIM2BKY/img/image-1.png"
            />
          </div>

          <p className="font-body-text font-[number:var(--body-text-font-weight)] text-black text-[length:var(--body-text-font-size)] tracking-[var(--body-text-letter-spacing)] leading-[var(--body-text-line-height)] [font-style:var(--body-text-font-style)]">
            Maipú: Mar de Chile 516, Santiago, Maipú, Región Metropolitana
          </p>
        </section>
      </main>

      <footer className="w-full bg-white border-t border-gray-200 py-12 px-20">
        <div className="flex justify-between items-start max-w-[1760px] mx-auto">
          <div className="flex flex-col gap-6">
            <h3 className="font-subheading font-[number:var(--subheading-font-weight)] text-black text-[length:var(--subheading-font-size)] leading-[var(--subheading-line-height)] tracking-[var(--subheading-letter-spacing)] [font-style:var(--subheading-font-style)]">
              Fukusuke
            </h3>
            <img
              className="w-[136px] h-10"
              alt="Social icons"
              src="https://c.animaapp.com/mi7tkxrdIM2BKY/img/social-icons.svg"
            />
          </div>

          <div className="flex gap-[299px]">
            {footerColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-6 w-[187px]">
                <h4 className="font-small-text font-[number:var(--small-text-font-weight)] text-black text-[length:var(--small-text-font-size)] tracking-[var(--small-text-letter-spacing)] leading-[var(--small-text-line-height)] [font-style:var(--small-text-font-style)] text-center">
                  {column.title}
                </h4>
                {column.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href="#"
                    className="font-small-text font-[number:var(--small-text-font-weight)] text-[#444444] text-[length:var(--small-text-font-size)] tracking-[var(--small-text-letter-spacing)] leading-[var(--small-text-line-height)] [font-style:var(--small-text-font-style)] text-center hover:text-black transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};
