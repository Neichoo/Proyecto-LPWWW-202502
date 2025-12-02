export const MainContentSection = (): JSX.Element => {
  const columns = [
    { label: "Nombre", width: "flex-[286]" },
    { label: "Precio $", width: "flex-[577]" },
    { label: "Disponible", width: "flex-[289]" },
  ];

  return (
    <header className="w-full flex items-center justify-center gap-4 border border-solid border-black">
      <div className="flex items-start gap-2 w-full">
        {columns.map((column, index) => (
          <div
            key={index}
            className={`${column.width} font-heading font-[number:var(--heading-font-weight)] text-[#1e1e1e] text-[length:var(--heading-font-size)] text-center tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] [font-style:var(--heading-font-style)]`}
          >
            {column.label}
          </div>
        ))}
      </div>
    </header>
  );
};
