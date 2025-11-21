import React from "react";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";

const dispatchedOrders = [
  {
    id: "1452",
    date: "30/08/25 20:14",
    address: "El Pinar 36, San Joaquín",
    status: "dispatched",
  },
  {
    id: "1452",
    date: "30/08/25 20:14",
    address: "El Pinar 36, San Joaquín",
    status: "dispatched",
  },
  {
    id: "1452",
    date: "30/08/25 20:14",
    address: "El Pinar 36, San Joaquín",
    status: "dispatched",
  },
];

const availableOrders = [
  {
    id: "1452",
    date: "30/08/25 20:14",
    address: "El Pinar 36, San Joaquín",
    status: "available",
  },
  {
    id: "1452",
    date: "30/08/25 20:14",
    address: "El Pinar 36, San Joaquín",
    status: "available",
  },
  {
    id: "1452",
    date: "30/08/25 20:14",
    address: "El Pinar 36, San Joaquín",
    status: "available",
  },
  {
    id: "1452",
    date: "30/08/25 20:14",
    address: "El Pinar 36, San Joaquín",
    status: "available",
  },
  {
    id: "1452",
    date: "30/08/25 20:14",
    address: "El Pinar 36, San Joaquín",
    status: "available",
  },
  {
    id: "1452",
    date: "30/08/25 20:14",
    address: "El Pinar 36, San Joaquín",
    status: "available",
  },
];

const inDispatchOrders = [
  {
    id: "1452",
    date: "30/08/25 20:14",
    address: "El Pinar 36, San Joaquín",
    status: "inDispatch",
  },
  {
    id: "1452",
    date: "30/08/25 20:14",
    address: "El Pinar 36, San Joaquín",
    status: "inDispatch",
  },
  {
    id: "1452",
    date: "30/08/25 20:14",
    address: "El Pinar 36, San Joaquín",
    status: "inDispatch",
  },
  {
    id: "1452",
    date: "30/08/25 20:14",
    address: "El Pinar 36, San Joaquín",
    status: "inDispatch",
  },
];

const footerColumns = [
  {
    title: "Tema",
    links: ["Página", "Página", "Página"],
  },
  {
    title: "Tema",
    links: ["Página", "Página", "Página"],
  },
  {
    title: "Tema",
    links: ["Página", "Página", "Página"],
  },
];

export const Despacho = (): JSX.Element => {
  return (
    <div
      className="bg-white w-full min-h-screen flex flex-col"
      data-model-id="46:443"
    >
      <header className="w-full h-[100px] bg-[#ca2b4b] flex items-center justify-between px-20">
        <div className="flex items-center gap-4">
          <img
            className="w-[135px] h-[100px] rounded-[50.59px] object-cover"
            alt="Icono"
            src="https://c.animaapp.com/mi7te4oqlJu5sd/img/icono-1.png"
          />
          <h1 className="[font-family:'Inter',Helvetica] font-medium text-[#fefdfe] text-[32px] tracking-[0] leading-[48px] whitespace-nowrap">
            Fukusuke
          </h1>
        </div>
        <Button className="h-auto gap-[11.73px] px-[35.19px] py-[20.53px] bg-[#27686b] rounded-[11.73px] shadow-[0px_1.47px_2.93px_#0000000d] [font-family:'Inter',Helvetica] font-medium text-[#fefdfe] text-[23.5px] tracking-[0] leading-[35.2px] hover:bg-[#1f5558] transition-colors">
          Logout
        </Button>
      </header>

      <main className="flex-1 px-20 py-12">
        <div className="max-w-[1453px] mx-auto space-y-0">
          {dispatchedOrders.map((order, index) => (
            <div
              key={`dispatched-${index}`}
              className="flex items-center h-[103px] border-b border-gray-200"
            >
              <div className="w-[239px] flex items-center justify-center">
                <span className="[font-family:'Roboto',Helvetica] font-normal text-black text-[20.9px] tracking-[0] leading-[62.8px] whitespace-nowrap">
                  {order.id}
                </span>
              </div>
              <Separator
                orientation="vertical"
                className="h-[66px] bg-gray-300"
              />
              <div className="w-[307px] flex items-center justify-center">
                <span className="[font-family:'Roboto',Helvetica] font-normal text-black text-[20.9px] tracking-[0] leading-[62.8px] whitespace-nowrap">
                  {order.date}
                </span>
              </div>
              <Separator
                orientation="vertical"
                className="h-[66px] bg-gray-300"
              />
              <div className="flex-1 flex items-center justify-center">
                <span className="[font-family:'Roboto',Helvetica] font-normal text-black text-[20.9px] tracking-[0] leading-[62.8px] whitespace-nowrap">
                  {order.address}
                </span>
              </div>
              <Separator
                orientation="vertical"
                className="h-[66px] bg-gray-300"
              />
              <div className="flex items-center gap-4 px-6">
                <Button className="h-auto px-[12.57px] py-[12.57px] rounded-[8.32px] border-[1.05px] border-solid border-[#14ae5c] bg-[linear-gradient(180deg,rgba(164,255,178,0.56)_0%,rgba(0,195,32,0.56)_25%,rgba(0,192,31,0.56)_75%,rgba(0,77,14,0.56)_100%)] [-webkit-text-stroke:1.05px_#ffffff2b] [font-family:'Inter',Helvetica] font-medium text-white text-[20.9px] tracking-[0] leading-[20.9px] whitespace-nowrap hover:opacity-90 transition-opacity">
                  Despachado
                </Button>
                <Button className="h-auto px-[12.57px] py-[12.57px] rounded-[8.32px] border-[1.05px] border-solid border-[#b2bf02] bg-[linear-gradient(180deg,rgba(255,244,164,0.56)_0%,rgba(195,166,0,0.56)_25%,rgba(192,176,0,0.56)_75%,rgba(77,71,0,0.56)_100%)] [-webkit-text-stroke:1.05px_#ffffff2b] [font-family:'Inter',Helvetica] font-medium text-white text-[20.9px] tracking-[0] leading-[20.9px] whitespace-nowrap hover:opacity-90 transition-opacity">
                  Cancelar
                </Button>
              </div>
            </div>
          ))}

          {availableOrders.map((order, index) => (
            <div
              key={`available-${index}`}
              className="flex items-center h-[103px] border-b border-gray-200"
            >
              <div className="w-[239px] flex items-center justify-center">
                <span className="[font-family:'Roboto',Helvetica] font-normal text-black text-[20.9px] tracking-[0] leading-[62.8px] whitespace-nowrap">
                  {order.id}
                </span>
              </div>
              <Separator
                orientation="vertical"
                className="h-[66px] bg-gray-300"
              />
              <div className="w-[307px] flex items-center justify-center">
                <span className="[font-family:'Roboto',Helvetica] font-normal text-black text-[20.9px] tracking-[0] leading-[62.8px] whitespace-nowrap">
                  {order.date}
                </span>
              </div>
              <Separator
                orientation="vertical"
                className="h-[66px] bg-gray-300"
              />
              <div className="flex-1 flex items-center justify-center">
                <span className="[font-family:'Roboto',Helvetica] font-normal text-black text-[20.9px] tracking-[0] leading-[62.8px] whitespace-nowrap">
                  {order.address}
                </span>
              </div>
              <Separator
                orientation="vertical"
                className="h-[66px] bg-gray-300"
              />
              <div className="flex items-center px-6">
                <Button className="h-auto px-[12.57px] py-[12.57px] rounded-[8.32px] border-[1.05px] border-solid border-[#14ae5c] bg-[linear-gradient(180deg,rgba(164,255,178,0.56)_0%,rgba(0,195,32,0.56)_25%,rgba(0,192,31,0.56)_75%,rgba(0,77,14,0.56)_100%)] [-webkit-text-stroke:1.05px_#ffffff2b] [font-family:'Inter',Helvetica] font-medium text-white text-[20.9px] tracking-[0] leading-[20.9px] whitespace-nowrap hover:opacity-90 transition-opacity">
                  Tomar pedido
                </Button>
              </div>
            </div>
          ))}

          {inDispatchOrders.map((order, index) => (
            <div
              key={`inDispatch-${index}`}
              className="flex items-center h-[103px] border-b border-gray-200 bg-gray-100"
            >
              <div className="w-[239px] flex items-center justify-center">
                <span className="[font-family:'Roboto',Helvetica] font-normal text-[#757575] text-[20.9px] tracking-[0] leading-[62.8px] whitespace-nowrap">
                  {order.id}
                </span>
              </div>
              <Separator
                orientation="vertical"
                className="h-[66px] bg-gray-300"
              />
              <div className="w-[307px] flex items-center justify-center">
                <span className="[font-family:'Roboto',Helvetica] font-normal text-[#757575] text-[20.9px] tracking-[0] leading-[62.8px] whitespace-nowrap">
                  {order.date}
                </span>
              </div>
              <Separator
                orientation="vertical"
                className="h-[66px] bg-gray-300"
              />
              <div className="flex-1 flex items-center justify-center">
                <span className="[font-family:'Roboto',Helvetica] font-normal text-[#757575] text-[20.9px] tracking-[0] leading-[62.8px] whitespace-nowrap">
                  {order.address}
                </span>
              </div>
              <Separator
                orientation="vertical"
                className="h-[66px] bg-gray-300"
              />
              <div className="flex items-center px-6">
                <Button
                  disabled
                  className="h-auto px-[12.57px] py-[12.57px] bg-[#b6b6b6] rounded-[8.32px] border-[1.05px] border-solid border-[#757575] [-webkit-text-stroke:1.05px_#ffffff2b] [font-family:'Inter',Helvetica] font-medium text-white text-[20.9px] tracking-[0] leading-[20.9px] whitespace-nowrap cursor-not-allowed opacity-100"
                >
                  En despacho
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="w-full h-[264px] bg-white border-t border-gray-200">
        <div className="max-w-[1280px] mx-auto px-20 pt-12">
          <h2 className="font-subheading font-[number:var(--subheading-font-weight)] text-black text-[length:var(--subheading-font-size)] tracking-[var(--subheading-letter-spacing)] leading-[var(--subheading-line-height)]">
            Nombre del sitio
          </h2>
          <div className="flex justify-between mt-6">
            <img
              className="w-[136px] h-10"
              alt="Social icons"
              src="https://c.animaapp.com/mi7te4oqlJu5sd/img/social-icons.svg"
            />
            <div className="flex gap-[299px]">
              {footerColumns.map((column, colIndex) => (
                <nav
                  key={`footer-col-${colIndex}`}
                  className="flex flex-col items-end gap-6 w-[187px]"
                >
                  <div className="font-small-text font-[number:var(--small-text-font-weight)] text-black text-[length:var(--small-text-font-size)] tracking-[var(--small-text-letter-spacing)] leading-[var(--small-text-line-height)] [font-style:var(--small-text-font-style)]">
                    {column.title}
                  </div>
                  {column.links.map((link, linkIndex) => (
                    <a
                      key={`link-${colIndex}-${linkIndex}`}
                      href="#"
                      className="font-small-text font-[number:var(--small-text-font-weight)] text-[#444444] text-[length:var(--small-text-font-size)] tracking-[var(--small-text-letter-spacing)] leading-[var(--small-text-line-height)] [font-style:var(--small-text-font-style)] hover:text-black transition-colors"
                    >
                      {link}
                    </a>
                  ))}
                </nav>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
