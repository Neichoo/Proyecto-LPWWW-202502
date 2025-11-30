import { Link } from "react-router-dom";
import { MainNavbar } from "../../components/navigation/MainNavbar";

const footerColumns = [
  {
    title: "Tema",
    links: ["Pagina", "Pagina", "Pagina"],
  },
  {
    title: "Tema",
    links: ["Pagina", "Pagina", "Pagina"],
  },
  {
    title: "Tema",
    links: ["Pagina", "Pagina", "Pagina"],
  },
];

export const Locales = (): JSX.Element => {
  return (
    <div
      className="bg-white w-full min-h-screen flex flex-col"
      data-model-id="3:192"
    >
      <MainNavbar />

      <main className="flex-1 flex flex-col items-center px-4 py-10">
        <h2 className="font-title text-4xl md:text-5xl font-semibold text-black tracking-tight leading-tight mt-20 mb-10 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
          Locales
        </h2>

        <section className="w-full max-w-5xl flex flex-col gap-6 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          <p className="font-body-text font-[number:var(--body-text-font-weight)] text-black text-[length:var(--body-text-font-size)] tracking-[var(--body-text-letter-spacing)] leading-[var(--body-text-line-height)] [font-style:var(--body-text-font-style)]">
            En rojo se muestra la zona que tiene cobertura delivery.
          </p>

          <div className="relative w-full">
            <img
              className="w-full max-h-[520px] object-contain rounded-lg"
              alt="Mapa de cobertura"
              src="/cobertura.png"
            />
          </div>

          <p className="font-body-text font-[number:var(--body-text-font-weight)] text-black text-[length:var(--body-text-font-size)] tracking-[var(--body-text-letter-spacing)] leading-[var(--body-text-line-height)] [font-style:var(--body-text-font-style)]">
            Maipu: Mar de Chile 516, Santiago, Maipu, Region Metropolitana
          </p>
        </section>
      </main>

      <footer className="w-full bg-white border-t border-gray-200 py-12 px-10">
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

          <div className="flex gap-20">
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
