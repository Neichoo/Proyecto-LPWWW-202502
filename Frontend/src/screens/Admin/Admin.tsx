import React from "react";
import { Button } from "../../components/ui/button";

const adminButtons = [
  { id: 1, label: "Administrar Productos" },
  { id: 2, label: "Administrar Usuarios" },
  { id: 3, label: "Administrar Compras" },
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

export const Admin = (): JSX.Element => {
  return (
    <div
      className="bg-[#fefdfe] w-full min-h-screen flex flex-col"
      data-model-id="141:1152"
    >
      <header className="w-full h-[100px] bg-[#ca2b4b] flex items-center justify-between px-20">
        <div className="flex items-center gap-4">
          <img
            className="w-[135px] h-[100px] rounded-[50.59px] object-cover"
            alt="Icono"
            src="https://c.animaapp.com/mgy9tilnfTD9CM/img/icono-1.png"
          />
          <h1 className="[font-family:'Roboto',Helvetica] font-medium text-[#fefdfe] text-[32px] leading-[48px]">
            Fukusuke
          </h1>
        </div>

        <Button className="h-auto gap-[11.73px] px-[35.19px] py-[20.53px] bg-[#27686b] rounded-[11.73px] shadow-[0px_1.47px_2.93px_#0000000d] hover:bg-[#1f5558] transition-colors">
          <span className="[font-family:'Inter',Helvetica] font-medium text-[#fefdfe] text-[23.5px] leading-[35.2px]">
            Logout
          </span>
        </Button>
      </header>

      <main className="flex-1 flex items-start justify-between px-[66px] pt-[130px] pb-[264px] gap-8">
        <section className="flex flex-col items-center gap-6 translate-y-[-1rem] animate-fade-in opacity-0">
          {adminButtons.map((button, index) => (
            <Button
              key={button.id}
              className="h-28 w-[916px] bg-[#2c2c2c] rounded-lg border border-solid hover:bg-[#3c3c3c] transition-colors translate-y-[-1rem] animate-fade-in opacity-0"
              style={
                {
                  "--animation-delay": `${index * 200}ms`,
                } as React.CSSProperties
              }
            >
              <span className="[font-family:'Inter',Helvetica] font-normal text-neutral-100 text-5xl leading-[48px]">
                {button.label}
              </span>
            </Button>
          ))}
        </section>

        <aside className="w-[563px] h-[650px] rounded-lg bg-[url(https://c.animaapp.com/mgy9tilnfTD9CM/img/image.svg)] bg-cover bg-[50%_50%] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]" />
      </main>

      <footer className="w-full h-[264px] bg-white border-t border-[#e5e5e5]">
        <div className="max-w-[1280px] mx-auto px-20 pt-12 flex justify-between">
          <div className="flex flex-col gap-6">
            <h2 className="font-subheading font-[number:var(--subheading-font-weight)] text-black text-[length:var(--subheading-font-size)] leading-[var(--subheading-line-height)] tracking-[var(--subheading-letter-spacing)] [font-style:var(--subheading-font-style)]">
              Fukusuke
            </h2>
            <img
              className="w-[136px] h-10"
              alt="Social icons"
              src="https://c.animaapp.com/mgy9tilnfTD9CM/img/social-icons.svg"
            />
          </div>

          {footerColumns.map((column, columnIndex) => (
            <nav
              key={columnIndex}
              className="flex flex-col items-end gap-6 w-[187px]"
            >
              <h3 className="font-small-text font-[number:var(--small-text-font-weight)] text-black text-[length:var(--small-text-font-size)] tracking-[var(--small-text-letter-spacing)] leading-[var(--small-text-line-height)] [font-style:var(--small-text-font-style)]">
                {column.title}
              </h3>
              {column.links.map((link, linkIndex) => (
                <a
                  key={linkIndex}
                  href="#"
                  className="font-small-text font-[number:var(--small-text-font-weight)] text-[#444444] text-[length:var(--small-text-font-size)] tracking-[var(--small-text-letter-spacing)] leading-[var(--small-text-line-height)] [font-style:var(--small-text-font-style)] hover:text-black transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          ))}
        </div>
      </footer>
    </div>
  );
};
