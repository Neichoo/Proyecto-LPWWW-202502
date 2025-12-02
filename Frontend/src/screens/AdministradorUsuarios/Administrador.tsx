import { MainContentSection } from "./sections/MainContentSection";
import { NavigationBarSection } from "./sections/NavigationBarSection";

export const Administrador = (): JSX.Element => {
  return (
    <div className="bg-white w-full flex flex-col" data-model-id="34:871">
      <NavigationBarSection />

      <MainContentSection />
    </div>
  );
};
