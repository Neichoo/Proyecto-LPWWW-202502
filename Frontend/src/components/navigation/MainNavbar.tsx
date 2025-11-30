import { ShoppingCartIcon, LogOutIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Menu", to: "/" },
  { label: "Locales", to: "/locales" },
  { label: "Contacto", to: "/contacto" },
];

export const MainNavbar = (): JSX.Element => {
  const navigate = useNavigate();
  const [isAuthed, setIsAuthed] = useState<boolean>(() => {
    return Boolean(localStorage.getItem("token") || sessionStorage.getItem("token"));
  });
  const [cartBadge, setCartBadge] = useState<number>(0);

  useEffect(() => {
    const handler = () => setIsAuthed(Boolean(localStorage.getItem("token") || sessionStorage.getItem("token")));
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsAuthed(false);
    navigate("/login");
  };

  return (
    <nav className="w-full h-[90px] bg-[#ca2b4b]">
      <div className="h-full max-w-[1920px] mx-auto px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            className="w-[110px] h-[82px] rounded-[36px] object-cover"
            alt="Icono"
            src="https://c.animaapp.com/mgy9hocl11ZIi8/img/icono-1.png"
          />
          <span className="[font-family:'Roboto',Helvetica] font-semibold text-[#fefdfe] text-[20px] leading-[28px] whitespace-nowrap">
            Fukusuke
          </span>
        </Link>

        <div className="flex items-center gap-10">
          <Link to="/carrito" className="w-8 h-8 transition-transform hover:scale-110" aria-label="Shopping cart">
            <ShoppingCartIcon className="w-full h-full text-[#fefdfe]" strokeWidth={1.5} />
          </Link>

          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="[font-family:'Inter',Helvetica] font-semibold text-[#fefdfe] text-[16px] leading-[24px] transition-opacity hover:opacity-80"
            >
              {item.label}
            </Link>
          ))}

          {isAuthed ? (
            <Button
              onClick={logout}
              className="h-auto bg-[#27686b] hover:bg-[#1f5457] text-[#fefdfe] px-5 py-2.5 rounded-[10px] shadow-[0px_1.47px_2.93px_#0000000d] [font-family:'Inter',Helvetica] font-semibold text-[16px] leading-[24px] transition-transform hover:scale-105 flex items-center gap-2"
            >
              <LogOutIcon className="w-4 h-4" />
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button className="h-auto bg-[#27686b] hover:bg-[#1f5457] text-[#fefdfe] px-5 py-2.5 rounded-[10px] shadow-[0px_1.47px_2.93px_#0000000d] [font-family:'Inter',Helvetica] font-semibold text-[16px] leading-[24px] transition-transform hover:scale-105">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
