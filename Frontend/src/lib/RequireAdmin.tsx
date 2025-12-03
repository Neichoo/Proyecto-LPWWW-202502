
import { Outlet } from "react-router-dom";
import useRequireAdmin from "./useRequireAdmin";

export default function RequireAdmin({ redirectTo = "/login" }: { redirectTo?: string }) {
  const { checking } = useRequireAdmin(redirectTo);
  if (checking) return <div className="px-6 py-12">Verificando permisos...</div>;
  // If useRequireAdmin doesn't redirect, user is admin; render nested routes
  return <Outlet />;
}
