import React from "react";

export const AboutUsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full max-w-[1013px] items-start gap-6 px-4 md:px-0">
      <h2 className="relative w-full font-title font-[number:var(--title-font-weight)] text-black text-[length:var(--title-font-size)] tracking-[var(--title-letter-spacing)] leading-[var(--title-line-height)] [font-style:var(--title-font-style)] opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:0ms]">
        Acerca de nosotros
      </h2>

      <div className="relative w-full font-body-text font-[number:var(--body-text-font-weight)] text-black text-[length:var(--body-text-font-size)] tracking-[var(--body-text-letter-spacing)] leading-[var(--body-text-line-height)] [font-style:var(--body-text-font-style)] opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:200ms]">
        Fukusuke es un restaurante de sushi ubicado en la comuna de Maipú,
        comprometido con la preparación de sushi de alta calidad y la atención
        personalizada. Nuestro local, aunque pequeño, ofrece un ambiente
        acogedor donde los clientes pueden disfrutar de sus rolls favoritos
        directamente en nuestras mesas, con capacidad para 12 personas, o
        llevarlos a casa a través de nuestro nuevo servicio para llevar.
        <br />
        En Fukusuke nos enfocamos en brindar una experiencia completa: desde la
        lectura de nuestra carta cuidadosamente diseñada, hasta la atención en
        mesón y la entrega eficiente de pedidos. Cada producto se sirve con
        cuidado y se identifica claramente en nuestros sistemas de venta,
        garantizando transparencia en el precio y la cantidad.
        <br />
        Conscientes de los cambios en las preferencias de nuestros clientes y de
        la creciente demanda de comodidad y rapidez, en Fukusuke buscamos
        adaptarnos constantemente, manteniendo la calidad de nuestros productos
        mientras exploramos nuevas formas de acercar nuestra propuesta a quienes
        desean disfrutar de sushi sin salir de su hogar.
      </div>
    </section>
  );
};
