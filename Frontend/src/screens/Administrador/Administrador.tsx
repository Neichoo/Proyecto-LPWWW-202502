import React from "react";
import { MainContentSection } from "./sections/MainContentSection";
import { NavigationBarSection } from "./sections/NavigationBarSection";
import { ProductListSection } from "./sections/ProductListSection";

export const Administrador = (): JSX.Element => {
  return (
    <div className="bg-white w-full flex flex-col" data-model-id="47:4234">
      <NavigationBarSection />
      <MainContentSection />
      <ProductListSection />
    </div>
  );
};
