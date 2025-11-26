import { ArrowLeftIcon, ChevronRightIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const paymentMethods = [
  {
    src: "https://c.animaapp.com/mi7tq61d0Mp2xF/img/rectangle-9.svg",
    alt: "Mastercard",
  },
  {
    src: "https://c.animaapp.com/mi7tq61d0Mp2xF/img/rectangle-10.svg",
    alt: "Visa",
  },
  {
    label: "Transf\nBcaria",
    isText: true,
  },
  {
    label: "Servipag",
    isText: true,
  },
];

const cartItems = [
  {
    id: 1,
    name: "California Roll",
    image: "https://c.animaapp.com/mi7tq61d0Mp2xF/img/rectangle-19.svg",
    quantity: 1,
    price: "$4.500",
  },
];

const orderSummary = [
  { label: "Subtotal", value: "$4.500" },
  { label: "Envío", value: "$3.500" },
  { label: "Total (Tax incl.)", value: "$8.000" },
];

export const CarritoDeCompras = (): JSX.Element => {
  return (
    <div
      className="bg-[#fefdfe] w-full min-h-screen flex justify-center items-start p-8 translate-y-[-1rem] animate-fade-in opacity-0"
      data-model-id="117:1083"
    >
      <div className="flex gap-8 max-w-[1133px] w-full">
        <section className="flex-1 min-w-[608px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <Button
            variant="ghost"
            className="mb-6 p-0 h-auto hover:bg-transparent"
          >
            <ArrowLeftIcon className="w-[30px] h-[30px] mr-2" />
            <span className="[font-family:'Roboto',Helvetica] font-semibold text-[#1e1e1e] text-lg">
              Continuar Comprando
            </span>
          </Button>

          <div className="mb-4">
            <h1 className="[font-family:'Roboto',Helvetica] font-medium text-[#1e1e1e] text-lg mb-2">
              Shopping cart
            </h1>
            <p className="[font-family:'Roboto',Helvetica] font-medium text-[#1e1e1e] text-sm">
              You have 3 item in your cart
            </p>
          </div>

          <div className="w-full h-0.5 bg-gray-300 mb-6" />

          {cartItems.map((item) => (
            <Card
              key={item.id}
              className="shadow-[0px_1px_4px_#00000040] rounded-[15px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]"
            >
              <CardContent className="p-6 flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-[82px] object-cover rounded"
                />

                <h3 className="flex-1 [font-family:'Roboto',Helvetica] font-medium text-[#1e1e1e] text-lg">
                  {item.name}
                </h3>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="[font-family:'Roboto',Helvetica] font-semibold text-[#393939] text-[22px]">
                      {item.quantity}
                    </span>
                    <img
                      src="https://c.animaapp.com/mi7tq61d0Mp2xF/img/group-4.png"
                      alt="Quantity controls"
                      className="w-5 h-5"
                    />
                  </div>

                  <span className="[font-family:'Roboto',Helvetica] font-medium text-[#393939] text-sm text-right w-[60px]">
                    {item.price}
                  </span>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-auto p-0 hover:bg-transparent"
                  >
                    <Trash2Icon className="w-[25px] h-[25px] text-gray-600" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <aside className="w-[388px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          <Card className="bg-[#27686b] rounded-[20px] border-0 shadow-none">
            <CardContent className="p-6">
              <h2 className="[font-family:'Roboto',Helvetica] font-semibold text-[#fdfbfb] text-[22px] mb-6">
                Medio de pago
              </h2>

              <div className="mb-6">
                <p className="[font-family:'Roboto',Helvetica] font-medium text-[#fdfbfb] text-base mb-4">
                  Elige tu método de pago
                </p>

                <div className="grid grid-cols-4 gap-2">
                  {paymentMethods.map((method, index) => (
                    <button
                      key={index}
                      className="h-[55px] bg-[#d9d9d933] rounded-[5px] flex items-center justify-center transition-colors hover:bg-[#d9d9d966]"
                    >
                      {method.isText ? (
                        <span className="[font-family:'Roboto',Helvetica] font-bold text-[#fdfbfb] text-sm text-center whitespace-pre-line">
                          {method.label}
                        </span>
                      ) : (
                        <img
                          src={method.src}
                          alt={method.alt}
                          className="w-full h-full object-cover rounded-[5px]"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="[font-family:'Roboto',Helvetica] font-medium text-[#fdfbfb] text-sm mb-2 block">
                    Name on card
                  </Label>
                  <Input
                    placeholder="Name"
                    className="bg-[#1e4f51] border-0 text-[#c4c4c4] [font-family:'Roboto',Helvetica] font-medium text-xs placeholder:text-[#c4c4c4] h-10 rounded-md"
                  />
                </div>

                <div>
                  <Label className="[font-family:'Roboto',Helvetica] font-medium text-[#fdfbfb] text-sm mb-2 block">
                    Card Number
                  </Label>
                  <Input
                    placeholder="1111 2222 3333 4444"
                    className="bg-[#1e4f51] border-0 text-[#c4c4c4] [font-family:'Roboto',Helvetica] font-medium text-xs placeholder:text-[#c4c4c4] h-10 rounded-md"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="[font-family:'Roboto',Helvetica] font-medium text-[#fdfbfb] text-sm mb-2 block">
                      Expiration date
                    </Label>
                    <Input
                      placeholder="mm/yy"
                      className="bg-[#1e4f51] border-0 text-[#c4c4c4] [font-family:'Roboto',Helvetica] font-medium text-xs placeholder:text-[#c4c4c4] h-10 rounded-md"
                    />
                  </div>

                  <div>
                    <Label className="[font-family:'Roboto',Helvetica] font-medium text-[#fdfbfb] text-sm mb-2 block">
                      CVV
                    </Label>
                    <Input
                      placeholder="123"
                      className="bg-[#1e4f51] border-0 text-[#c4c4c4] [font-family:'Roboto',Helvetica] font-medium text-xs placeholder:text-[#c4c4c4] h-10 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#fdfbfb]/20">
                <div className="space-y-2 mb-6">
                  {orderSummary.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="[font-family:'Roboto',Helvetica] font-medium text-[#fdfbfb] text-sm">
                        {item.label}
                      </span>
                      <span className="[font-family:'Roboto',Helvetica] font-medium text-[#fdfbfb] text-sm">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <Button className="w-full h-[60px] bg-[#ca2b4b] hover:bg-[#b02542] rounded-xl text-[#fdfbfb] [font-family:'Roboto',Helvetica] font-medium text-base transition-colors">
                  <span className="mr-auto">$8.000</span>
                  <span>Pagar</span>
                  <ChevronRightIcon className="w-[25px] h-[25px] ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
};
