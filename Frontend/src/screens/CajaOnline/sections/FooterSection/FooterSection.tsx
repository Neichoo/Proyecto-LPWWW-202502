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

const socialIcons = [
  { Icon: FacebookIcon, label: "Facebook" },
  { Icon: YoutubeIcon, label: "YouTube" },
  { Icon: InstagramIcon, label: "Instagram" },
];

export const FooterSection = (): JSX.Element => {
  return (
    <footer className="relative w-full bg-white">
      <Separator className="w-full" />

      <div className="container mx-auto px-20 py-12">
        <div className="grid grid-cols-[auto_1fr] gap-8">
          <div className="flex flex-col gap-32">
            <h2 className="font-subheading font-[number:var(--subheading-font-weight)] text-black text-[length:var(--subheading-font-size)] leading-[var(--subheading-line-height)] tracking-[var(--subheading-letter-spacing)] [font-style:var(--subheading-font-style)]">
              Fukusuke
            </h2>

            <div className="flex items-center gap-4">
              {socialIcons.map(({ Icon, label }) => (
                <button
                  key={label}
                  className="w-10 h-10 flex items-center justify-center text-[#444444] hover:text-black transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 justify-items-center">
            {footerColumns.map((column, columnIndex) => (
              <nav key={columnIndex} className="flex flex-col gap-6 w-[187px]">
                <div className="font-small-text font-[number:var(--small-text-font-weight)] text-black text-[length:var(--small-text-font-size)] tracking-[var(--small-text-letter-spacing)] leading-[var(--small-text-line-height)] [font-style:var(--small-text-font-style)] text-center">
                  {column.title}
                </div>

                {column.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href="#"
                    className="font-small-text font-[number:var(--small-text-font-weight)] text-[#444444] text-[length:var(--small-text-font-size)] tracking-[var(--small-text-letter-spacing)] leading-[var(--small-text-line-height)] [font-style:var(--small-text-font-style)] text-center hover:text-black transition-colors"
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
