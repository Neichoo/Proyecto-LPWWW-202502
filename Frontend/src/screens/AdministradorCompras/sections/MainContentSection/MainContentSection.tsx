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

const orderData = [
  { id: "1", status: "preparando" },
  { id: "2", status: "En espera" },
  { id: ".........", status: "............" },
  { id: ".........", status: "............" },
  { id: ".........", status: "............" },
  { id: ".........", status: "............" },
  { id: ".........", status: "............" },
  { id: ".........", status: "............" },
  { id: ".........", status: "............" },
  { id: ".........", status: "............" },
  { id: ".........", status: "............" },
  { id: ".........", status: "............" },
  { id: ".........", status: "............" },
  { id: ".........", status: "............" },
  { id: ".........", status: "............" },
  { id: ".........", status: "............" },
  { id: ".........", status: "............" },
  { id: ".........", status: "............" },
  { id: ".........", status: "............" },
  { id: ".........", status: "............" },
  { id: ".........", status: "............" },
  { id: ".........", status: "............" },
];

export const MainContentSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-center gap-4">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-black">
              <TableHead className="w-[276px] font-heading font-[number:var(--heading-font-weight)] text-[#1e1e1e] text-[length:var(--heading-font-size)] text-center tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] [font-style:var(--heading-font-style)]">
                ID
              </TableHead>
              <TableHead className="w-[587px] font-heading font-[number:var(--heading-font-weight)] text-[#1e1e1e] text-[length:var(--heading-font-size)] text-center tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] [font-style:var(--heading-font-style)]">
                Pedido
              </TableHead>
              <TableHead className="w-[295px] font-heading font-[number:var(--heading-font-weight)] text-[#1e1e1e] text-[length:var(--heading-font-size)] text-center tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] [font-style:var(--heading-font-style)]">
                Estado
              </TableHead>
              <TableHead className="w-[578px] font-heading font-[number:var(--heading-font-weight)] text-[#1e1e1e] text-[length:var(--heading-font-size)] text-center tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] [font-style:var(--heading-font-style)]">
                Anular
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderData.map((order, index) => (
              <TableRow key={index} className="h-12">
                <TableCell className="font-heading font-[number:var(--heading-font-weight)] text-[#1e1e1e] text-[length:var(--heading-font-size)] text-center tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] [font-style:var(--heading-font-style)]">
                  {order.id}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <div className="relative w-[54px] h-[34px]">
                      <img
                        className="absolute w-[75.00%] h-[41.67%] top-[29.17%] left-[12.50%]"
                        alt="Icon"
                        src="https://c.animaapp.com/mi7trcsqAboA6X/img/icon.svg"
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-heading font-[number:var(--heading-font-weight)] text-[#1e1e1e] text-[length:var(--heading-font-size)] text-center tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] [font-style:var(--heading-font-style)]">
                  {order.status}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-[165px] p-1 hover:bg-transparent"
                    >
                      <div className="relative inline-flex items-center justify-center p-[11px] rounded-[100px] overflow-hidden">
                        <div className="relative w-[18px] h-[18px] bg-m-3syslighterror rounded-sm" />
                        <img
                          className="absolute top-[calc(50.00%_-_12px)] left-[calc(50.00%_-_12px)] w-6 h-6"
                          alt="Check indeterminate"
                          src="https://c.animaapp.com/mi7trcsqAboA6X/img/check-indeterminate-small.svg"
                        />
                      </div>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Button
        variant="outline"
        className="h-auto w-[93px] rounded-lg border-[#cac4d0] hover:bg-transparent"
      >
        <div className="inline-flex h-8 items-center justify-center gap-2 px-4 py-1.5">
          <span className="[font-family:'Roboto',Helvetica] font-medium text-m3syslighton-surface text-sm tracking-[0.01px] leading-5">
            +
          </span>
        </div>
      </Button>
    </section>
  );
};
