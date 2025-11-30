import React from "react";
import { HeaderSection } from "./sections/HeaderSection";
import { NavbarSection } from "./sections/NavbarSection";
import { SignUpSection } from "./sections/SignUpSection";

export const SignUp = (): JSX.Element => {
  return (
    <div
      className="bg-white overflow-hidden w-full min-h-screen relative"
      data-model-id="98:977"
    >
      <NavbarSection />

      <main className="relative w-full bg-[#27686b]">
        <div className="relative w-full">
          <div className="container mx-auto px-6 py-0 relative max-w-6xl">
            <div className="flex gap-8 items-start pt-14">
              <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
                <HeaderSection />
              </div>

              <div className="flex-1 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
                <SignUpSection />
              </div>
            </div>

            <img
              className="absolute top-[420px] left-0 w-[520px] h-[520px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]"
              alt="Illustration"
              src="https://c.animaapp.com/mi7tk9d8A2vM04/img/illustration.svg"
            />
          </div>
        </div>
      </main>
    </div>
  );
};
