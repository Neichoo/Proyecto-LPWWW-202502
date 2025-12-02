
import useRequireAdmin from "../../lib/useRequireAdmin";
import { MainContentSection } from "./sections/MainContentSection";
import { NavigationBarSection } from "./sections/NavigationBarSection";

export const Administrador = (): JSX.Element => {
  const { checking } = useRequireAdmin();
  if (checking) return <div className="px-6 py-12">Verificando permisos...</div>;
  return (
    <div
      className="bg-white w-full flex flex-col translate-y-[-1rem] animate-fade-in opacity-0"
      data-model-id="47:966"
    >
      <NavigationBarSection />
      <MainContentSection />
    </div>
  );
};
