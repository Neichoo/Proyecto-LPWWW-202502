import React from "react";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { Card, CardContent } from "../../../../components/ui/card";

const testimonials = [
  {
    rating: "Muy bueno! 5☆",
    avatar: "https://c.animaapp.com/mgy9hocl11ZIi8/img/avatar-1.svg",
    username: "Nico1025",
    comment: "Muy rica la comida, lo pasamos fantástico!",
  },
  {
    rating: "Agradable local! 4☆",
    avatar: "https://c.animaapp.com/mgy9hocl11ZIi8/img/avatar-2.svg",
    username: "Conny549",
    comment: "Buena ubicacion y  rica comida, pero se demoro mucho la comida.",
  },
  {
    rating: "Volveré de nuevo! 5☆",
    avatar: "https://c.animaapp.com/mgy9hocl11ZIi8/img/avatar.svg",
    username: "Atendiendo73",
    comment:
      "Fui al local presencialmente y era bastante acogedor, la comida bien también, definitivamente volveré.",
  },
];

export const TestimonialsSection = (): JSX.Element => {
  return (
    <section id="opiniones" className="w-full py-16 px-4 bg-white">
      <div className="container mx-auto max-w-7xl flex flex-col gap-10">
        <h2 className="text-center [font-family:'Roboto',Helvetica] font-semibold text-black text-4xl md:text-5xl tracking-[-0.96px] leading-tight translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
          Opiniones y valoraciones
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-[#e6e6e6] translate-y-[-1rem] animate-fade-in opacity-0"
              style={
                {
                  "--animation-delay": `${(index + 1) * 200}ms`,
                } as React.CSSProperties
              }
            >
              <CardContent className="flex flex-col gap-10 p-6">
                <h3 className="[font-family:'Roboto',Helvetica] font-medium text-black text-xl tracking-[0] leading-8">
                  {testimonial.rating}
                </h3>

                <div className="flex items-center gap-4">
                  <Avatar className="w-[45px] h-[45px]">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.username}
                    />
                  </Avatar>

                  <div className="flex flex-col gap-0.5">
                    <div className="[font-family:'Roboto',Helvetica] font-medium text-black text-base tracking-[0] leading-6">
                      {testimonial.username}
                    </div>

                    <div className="[font-family:'Roboto',Helvetica] font-medium text-[#828282] text-base tracking-[0] leading-6">
                      {testimonial.comment}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
