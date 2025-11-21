import React from "react";
import { Separator } from "../../../../components/ui/separator";

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

export const FooterSection = (): JSX.Element => {
  return (
    <footer className="w-full bg-white py-12">
      <div className="container mx-auto px-20">
        <Separator className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-12">
          <div className="flex flex-col gap-6 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
            <h2 className="font-subheading font-[number:var(--subheading-font-weight)] text-black text-[length:var(--subheading-font-size)] tracking-[var(--subheading-letter-spacing)] leading-[var(--subheading-line-height)] [font-style:var(--subheading-font-style)]">
              Fukusuke
            </h2>

            <img
              className="w-[136px] h-10"
              alt="Social icons"
              src="https://c.animaapp.com/mgy9hocl11ZIi8/img/social-icons.svg"
            />
          </div>

          <nav className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 justify-items-center translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
            {footerColumns.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className="flex flex-col items-center justify-start gap-6 w-[187px]"
              >
                <div className="flex items-center justify-center self-stretch font-small-text font-[number:var(--small-text-font-weight)] text-black text-[length:var(--small-text-font-size)] tracking-[var(--small-text-letter-spacing)] leading-[var(--small-text-line-height)] [font-style:var(--small-text-font-style)]">
                  {column.title}
                </div>

                {column.links.map((link, linkIndex) => (
                  <button
                    key={linkIndex}
                    className="flex items-center justify-center self-stretch font-small-text font-[number:var(--small-text-font-weight)] text-[#444444] text-[length:var(--small-text-font-size)] tracking-[var(--small-text-letter-spacing)] leading-[var(--small-text-line-height)] [font-style:var(--small-text-font-style)] transition-colors hover:text-black"
                  >
                    {link}
                  </button>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
