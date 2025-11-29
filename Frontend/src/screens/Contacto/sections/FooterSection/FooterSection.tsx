import { FacebookIcon, InstagramIcon, YoutubeIcon } from "lucide-react";
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

        <div className="grid grid-cols-[auto_1fr] gap-20">
          <div className="flex flex-col gap-24">
            <h2 className="font-subheading font-[number:var(--subheading-font-weight)] text-black text-[length:var(--subheading-font-size)] leading-[var(--subheading-line-height)] tracking-[var(--subheading-letter-spacing)] [font-style:var(--subheading-font-style)]">
              Fukusuke
            </h2>

            <div className="flex items-center gap-4">
              <FacebookIcon className="w-10 h-10 text-black cursor-pointer hover:text-[#444444] transition-colors" />
              <YoutubeIcon className="w-10 h-10 text-black cursor-pointer hover:text-[#444444] transition-colors" />
              <InstagramIcon className="w-10 h-10 text-black cursor-pointer hover:text-[#444444] transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {footerColumns.map((column, columnIndex) => (
              <nav key={columnIndex} className="flex flex-col gap-6">
                <div className="font-small-text font-[number:var(--small-text-font-weight)] text-black text-[length:var(--small-text-font-size)] tracking-[var(--small-text-letter-spacing)] leading-[var(--small-text-line-height)] [font-style:var(--small-text-font-style)]">
                  {column.title}
                </div>

                {column.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href="#"
                    className="font-small-text font-[number:var(--small-text-font-weight)] text-[#444444] text-[length:var(--small-text-font-size)] tracking-[var(--small-text-letter-spacing)] leading-[var(--small-text-line-height)] [font-style:var(--small-text-font-style)] hover:text-black transition-colors cursor-pointer"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
