import React from "react";
import { Button } from "../../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

const ordersData = [
  {
    id: "39571",
    content: "1 x Maki Roll\n2 x California Roll",
    status: "Pago Pendiente",
    total: "21,000$",
    buttonColor: "bg-[#868686]",
  },
  {
    id: "39572",
    content: "1 x Maki Roll\n2 x California Roll",
    status: "Pedido en Cocina",
    total: "14,000$",
    buttonColor: "bg-[#27686b]",
  },
  {
    id: "39573",
    content: "1 x Maki Roll\n2 x California Roll",
    status: "Pedido Despachado",
    total: "8,000$",
    buttonColor: "bg-[#27686b]",
  },
  {
    id: "39574",
    content: "1 x Maki Roll\n2 x California Roll",
    status: "Pago Pendiente",
    total: "21,000$",
    buttonColor: "bg-[#868686]",
  },
  {
    id: "39575",
    content: "1 x Maki Roll\n2 x California Roll",
    status: "Pago Aceptado\nEnviar Pedido a Cocina",
    total: "27,000$",
    buttonColor: "bg-[#27686b]",
  },
  {
    id: "39576",
    content: "1 x Maki Roll\n2 x California Roll",
    status: "Pago Pendiente",
    total: "21,000$",
    buttonColor: "bg-[#868686]",
  },
  {
    id: "39577",
    content: "1 x Maki Roll\n2 x California Roll",
    status: "Pago Pendiente",
    total: "21,000$",
    buttonColor: "bg-[#868686]",
  },
  {
    id: "39578",
    content: "1 x Maki Roll\n2 x California Roll",
    status: "Pago Pendiente",
    total: "21,000$",
    buttonColor: "bg-[#868686]",
  },
];

export const MainContentSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full opacity-0 animate-fade-in">
      <Table className="border-collapse">
        <TableHeader>
          <TableRow className="bg-[#858585] hover:bg-[#858585]">
            <TableHead className="w-[300px] h-[151px] border border-solid border-black text-center">
              <div className="flex items-center justify-center h-full [font-family:'Roboto',Helvetica] font-normal text-black text-3xl tracking-[0] leading-[normal]">
                Numero de Boleta
              </div>
            </TableHead>
            <TableHead className="w-[446px] h-[151px] border border-solid border-black text-center">
              <div className="flex items-center justify-center h-full [font-family:'Roboto',Helvetica] font-normal text-black text-3xl tracking-[0] leading-[normal]">
                Contenido de la
                <br />
                Boleta
              </div>
            </TableHead>
            <TableHead className="w-[446px] h-[151px] border border-solid border-black text-center">
              <div className="flex items-center justify-center h-full [font-family:'Roboto',Helvetica] font-normal text-black text-3xl tracking-[0] leading-[normal]">
                Estado de Pedido
              </div>
            </TableHead>
            <TableHead className="w-[302px] h-[151px] border border-solid border-black text-center">
              <div className="flex items-center justify-center h-full [font-family:'Roboto',Helvetica] font-normal text-black text-3xl tracking-[0] leading-[normal]">
                Total a
                <br />
                Pagar
              </div>
            </TableHead>
            <TableHead className="w-[264px] h-[151px] border border-solid border-black text-center">
              <div className="flex items-center justify-center h-full [font-family:'Roboto',Helvetica] font-normal text-black text-3xl tracking-[0] leading-[normal]">
                Emitir
                <br />
                Boleta
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordersData.map((order, index) => (
            <TableRow
              key={order.id}
              className="bg-[#dddddd] hover:bg-[#dddddd]"
            >
              <TableCell className="w-[300px] h-[151px] border border-solid border-black text-center">
                <div className="flex items-center justify-center h-full [font-family:'Roboto',Helvetica] font-normal text-black text-3xl tracking-[0] leading-[normal]">
                  {order.id}
                </div>
              </TableCell>
              <TableCell className="w-[446px] h-[151px] border border-solid border-black text-center">
                <div className="flex items-center justify-center h-full [font-family:'Roboto',Helvetica] font-normal text-black text-3xl tracking-[0] leading-[normal] whitespace-pre-line">
                  {order.content}
                </div>
              </TableCell>
              <TableCell className="w-[446px] h-[151px] border border-solid border-black text-center">
                <div className="flex items-center justify-center h-full [font-family:'Roboto',Helvetica] font-normal text-black text-3xl tracking-[0] leading-[normal] whitespace-pre-line">
                  {order.status}
                </div>
              </TableCell>
              <TableCell className="w-[302px] h-[151px] border border-solid border-black text-center">
                <div className="flex items-center justify-center h-full [font-family:'Roboto',Helvetica] font-normal text-black text-3xl tracking-[0] leading-[normal]">
                  {order.total}
                </div>
              </TableCell>
              <TableCell className="w-[264px] h-[151px] border border-solid border-black text-center p-0">
                <div className="flex items-center justify-center h-full">
                  <Button
                    className={`w-52 h-20 ${order.buttonColor} border border-solid border-black rounded-none hover:opacity-90 transition-opacity h-auto`}
                  >
                    <span className="[font-family:'Roboto',Helvetica] font-normal text-white text-3xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
                      Emitir Boleta
                    </span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-center w-full mt-[41px] [font-family:'Roboto',Helvetica] font-normal text-black text-3xl text-center tracking-[0] leading-[normal]">
        Pagina 1 de 21400
      </div>
    </section>
  );
};
