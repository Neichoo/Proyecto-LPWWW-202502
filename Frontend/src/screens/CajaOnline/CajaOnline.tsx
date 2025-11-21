import React from "react";
import { FooterSection } from "./sections/FooterSection";
import { MainContentSection } from "./sections/MainContentSection";
import { NavigationBarSection } from "./sections/NavigationBarSection";

export const CajaOnline = (): JSX.Element => {
  return (
    <div className="bg-white w-full flex flex-col" data-model-id="135:1164">
      <NavigationBarSection />
      <MainContentSection />
      <FooterSection />
    </div>
  );
};
