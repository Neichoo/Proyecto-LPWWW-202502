import useRequireAdmin from "../../lib/useRequireAdmin";
import { NavigationBarSection } from "./sections/NavigationBarSection";
import { ProductListSection } from "./sections/ProductListSection";

export const Administrador = (): JSX.Element => {
  const { checking } = useRequireAdmin();
  if (checking) return <div className="px-6 py-12">Verificando permisos...</div>;
  return (
    <div className="bg-white w-full flex flex-col" data-model-id="47:4234">
      <NavigationBarSection />
      <ProductListSection />
    </div>
  );
};
