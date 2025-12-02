
import { Button } from "../../../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const navigationItems = [
  { label: "Administrar Usuarios", path: "/administrador-usuarios", isActive: false },
  { label: "Administrar Compras", path: "/administrador-compras", isActive: false },
  { label: "Administrar Productos", path: "/administrador", isActive: true },
];

export const NavigationBarSection = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <header className="w-full h-[100px] bg-[#ca2b4b] translate-y-[-1rem] animate-fade-in opacity-0">
      <nav className="flex items-center justify-between h-full px-20">
        <div className="flex items-center gap-6">
          <Link to="/admin" className="flex items-center gap-3">
            <img
              className="w-[135px] h-[101px] rounded-[50.59px] object-cover"
              alt="Icono"
              src="https://c.animaapp.com/mi7tfxh9pOq0lK/img/icono-1.png"
            />
            <div className="flex items-center justify-center [font-family:'Roboto',Helvetica] font-medium text-[#fefdfe] text-[32px] tracking-[0] leading-[48px] whitespace-nowrap">
              Fukusuke
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-[50px]">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="h-11 px-4 bg-[#ca2b4b] flex items-center justify-center [font-family:'Inter',Helvetica] font-medium text-[29.3px] tracking-[0] leading-[44.0px] whitespace-nowrap transition-colors hover:opacity-80"
              style={{ color: item.isActive ? "black" : "#fefdfe" }}
            >
              {item.label}
            </button>
          ))}

          <Button
            className="h-auto px-[35.19px] py-[20.53px] bg-[#27686b] hover:bg-[#1f5457] rounded-[11.73px] shadow-[0px_1.47px_2.93px_#0000000d] transition-colors"
            onClick={() => {
              try {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
              } catch {}
              try {
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("user");
              } catch {}
              navigate("/");
            }}
          >
            <span className="[font-family:'Inter',Helvetica] font-medium text-[#fefdfe] text-[23.5px] tracking-[0] leading-[35.2px] whitespace-nowrap">
              Logout
            </span>
          </Button>
        </div>
      </nav>
    </header>
  );
};
