import React from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";

const formFields = [
  {
    id: "nombre",
    label: "Nombre",
    placeholder: "Nicolás",
    type: "input",
    width: "w-full md:w-[295px]",
  },
  {
    id: "apellido",
    label: "Apellido",
    placeholder: "Muñoz",
    type: "input",
    width: "w-full md:w-[297px]",
  },
  {
    id: "email",
    label: "Dirección de correo electrónico",
    placeholder: "ejemplo@gmail.com",
    type: "input",
    width: "w-full",
  },
  {
    id: "mensaje",
    label: "Tu mensaje",
    placeholder: "Introduce tu pregunta o mensaje",
    type: "textarea",
    width: "w-full",
  },
];

export const ContactFormSection = (): JSX.Element => {
  return (
    <section className="w-full max-w-[626px] mx-auto px-4 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
      <form className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-6">
          {formFields.slice(0, 2).map((field) => (
            <div
              key={field.id}
              className={`${field.width} flex flex-col gap-2`}
            >
              <Label
                htmlFor={field.id}
                className="[font-family:'Roboto',Helvetica] font-medium text-black text-base leading-6"
              >
                {field.label}
              </Label>
              <Input
                id={field.id}
                defaultValue={field.placeholder}
                className="px-4 py-3 bg-white rounded-lg border border-[#dfdfdf] shadow-button-shadow [font-family:'Roboto',Helvetica] font-medium text-[#828282] text-base leading-6 h-auto"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor={formFields[2].id}
            className="[font-family:'Roboto',Helvetica] font-medium text-black text-base leading-6"
          >
            {formFields[2].label}
          </Label>
          <Input
            id={formFields[2].id}
            type="email"
            defaultValue={formFields[2].placeholder}
            className="px-4 py-3 bg-white rounded-lg border border-[#dfdfdf] shadow-button-shadow [font-family:'Roboto',Helvetica] font-medium text-[#828282] text-base leading-6 h-auto"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor={formFields[3].id}
            className="[font-family:'Roboto',Helvetica] font-medium text-black text-base leading-6"
          >
            {formFields[3].label}
          </Label>
          <Textarea
            id={formFields[3].id}
            defaultValue={formFields[3].placeholder}
            className="min-h-[146px] px-4 py-3 bg-white rounded-lg border border-[#dfdfdf] shadow-button-shadow [font-family:'Roboto',Helvetica] font-medium text-[#828282] text-base leading-6 resize-none"
          />
        </div>

        <Button
          type="submit"
          className="w-full px-8 py-4 bg-black rounded-lg shadow-button-shadow [font-family:'Roboto',Helvetica] font-medium text-white text-xl leading-[30px] h-auto hover:bg-black/90 transition-colors"
        >
          Enviar
        </Button>
      </form>
    </section>
  );
};
