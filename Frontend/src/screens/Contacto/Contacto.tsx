import React from "react";
import { AboutUsSection } from "./sections/AboutUsSection";
import { ContactFormSection } from "./sections/ContactFormSection";
import { FooterSection } from "./sections/FooterSection";
import { NavigationBarSection } from "./sections/NavigationBarSection";

export const Contacto = (): JSX.Element => {
  return (
    <div
      className="bg-white w-full relative flex flex-col"
      data-model-id="3:118"
    >
      <NavigationBarSection />

      <main className="w-full relative">
        <div className="max-w-[1920px] mx-auto px-20 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col gap-8 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
              <AboutUsSection />

              <div className="flex flex-col gap-6 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
                <h2 className="[font-family:'Roboto',Helvetica] font-semibold text-black text-[32px] tracking-[0] leading-[48px]">
                  Ponte en contacto con nosotros!
                </h2>
              </div>

              <ContactFormSection />
            </div>

            <div className="flex justify-center items-start pt-8 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
              <img
                src="https://c.animaapp.com/mi7ts6z7Slrdkw/img/image.svg"
                alt="Contact illustration"
                className="w-full max-w-[563px] h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};
