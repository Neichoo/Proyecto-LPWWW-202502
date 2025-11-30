import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { FooterSection } from "./sections/FooterSection";
import { NavbarMenuSection } from "./sections/NavbarMenuSection";
import { NavbarSection } from "./sections/NavbarSection";
import { RollsSaleSection } from "./sections/RollsSaleSection";
import { SaucesSaleSection } from "./sections/SaucesSaleSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { getJson, postJson } from "../../lib/api";
import { addToast } from "../../components/ui/toast";

type Product = {
  id: number;
  title: string;
  slug?: string;
  price: number;
  description?: string;
  ingredients?: string;
  image?: string;
  image_url?: string;
};

const fallbackSlides = [
  { id: 1, src: "https://c.animaapp.com/mgy9hocl11ZIi8/img/unsplash-s3ejzlra4yw.png", alt: "Unsplash" },
  { id: 2, src: "https://c.animaapp.com/mgy9hocl11ZIi8/img/unsplash-xfngap-dtoe.png", alt: "Unsplash xfngap dtoe" },
  { id: 3, src: "https://c.animaapp.com/mgy9hocl11ZIi8/img/unsplash-yffgke3y4f8.png", alt: "Unsplash" },
];

const promosData: Product[] = [
  {
    id: 101,
    title: "Promo Sushi Starter",
    price: 9500,
    description: "1 California Roll + 1 Philadelphia Roll + 1 Spicy Mayo + 1 Té Verde",
    ingredients: "Combo inicio",
    image: "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-2.png",
  },
  {
    id: 102,
    title: "Promo Tempura Lover",
    price: 12500,
    description: "Tempura Shrimp Roll + Crunchy Roll + Salsa Unagi + Lichi",
    ingredients: "Combo tempura",
    image: "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-2.png",
  },
  {
    id: 103,
    title: "Promo Ultimate Combo",
    price: 22000,
    description: "Dragon Roll + Spicy Tuna + California + 2 salsas + 2 bebidas",
    ingredients: "Combo grande",
    image: "https://c.animaapp.com/mgy9hocl11ZIi8/img/image-2.png",
  },
];

export const LandingPage = (): JSX.Element => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [rolls, setRolls] = useState<Product[]>([]);
  const [salsas, setSalsas] = useState<Product[]>([]);
  const [bebidas, setBebidas] = useState<Product[]>([]);
  const [promos, setPromos] = useState<Product[]>([]);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [recommended, setRecommended] = useState<Product[]>([]);

  const slides = useMemo(() => fallbackSlides, []);

  const localImages: Record<string, string> = {
    "california-roll": "/california_roll.jpg",
    "spicy-tuna-roll": "/SpicyTuna_roll.jpg",
    "philadelphia-roll": "/Philadelphia_roll.jpg",
    "tempura-shrimp-roll": "/Tempura Shrimp Roll.jpg",
    "dragon-roll": "/DragonRoll.jpg",
    "crunchy-roll": "/Crunchy Roll.jpg",
    "te-verde-frio": "/Te verde frio.jpg",
    "cerveza-japonesa": "/Cerveza Japonesa.jpg",
    "lychee-soda": "/Lychee Soda.jpg",
    "salsa-soja": "/Salsa Soja premium.jpg",
    "salsa-spicy-mayo": "/Salsa Spicy Mayo.jpg",
    "salsa-unagi": "/Salsa Unagi.jpg",
  };

  const mapLocalImages = (items: Product[]) =>
    items.map((p) => {
      const slug = p.slug || p.title.toLowerCase().replace(/\s+/g, "-");
      const img = localImages[slug];
      return img ? { ...p, image: img, image_url: img } : p;
    });

  const goPrev = () => setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setSlideIndex((prev) => (prev + 1) % slides.length);

  const imgFor = (p: Product) => p.image || p.image_url || "";

  useEffect(() => {
    const fetchCategory = async (slug: string, setter: (p: Product[]) => void) => {
      const res = await getJson(`/api/categories/${slug}/products`);
      if (res.ok) {
        const data = mapLocalImages(res.data as Product[]);
        setter(data);
      }
    };
    fetchCategory("sushi", (data) => {
      const mapped = mapLocalImages(data as Product[]);
      setRolls(mapped);
      setRecommended(mapped.slice(0, 4));
    });
    fetchCategory("salsas", setSalsas);
    fetchCategory("bebidas", setBebidas);
    setPromos(promosData);
  }, []);

  const handleAddToCart = async (product: Product) => {
    try {
      setFeedback(null);
      const res = await postJson("/api/cart/add", { product_id: product.id, quantity: 1 });
      if (res.ok) {
        setFeedback("Añadido al carrito");
        addToast("Producto añadido al carrito", "success");
        setModalProduct(null);
      } else if (res.status === 401) {
        const msg = res.data?.detail || "Inicia sesión para añadir al carrito";
        setFeedback(msg);
        addToast(msg, "error");
      } else {
        const msg = res.data?.detail || `No se pudo añadir al carrito (status ${res.status})`;
        setFeedback(msg);
        addToast(msg, "error");
      }
    } catch (err) {
      const msg = String(err);
      setFeedback(msg);
      addToast(msg, "error");
    }
  };

  return (
    <div className="bg-[#fefdfe] overflow-hidden w-full min-h-screen relative" data-model-id="3:391">
      <NavbarSection />

      <section className="relative w-full pt-16 px-4">
        <div className="flex flex-col w-full items-center gap-6 max-w-7xl mx-auto translate-y-[-1rem] animate-fade-in opacity-0">
          <div className="w-full relative">
            <div className="overflow-hidden rounded-3xl border border-black shadow-sm">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
                {slides.map((image) => (
                  <div key={image.id} className="w-full flex-shrink-0">
                    <img className="w-full h-[240px] md:h-[360px] object-contain bg-white" alt={image.alt} src={image.src} />
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute inset-y-0 left-2 flex items-center">
              <Button variant="ghost" size="icon" className="h-10 w-10 p-0 bg-white/70 hover:bg-white shadow-sm" onClick={goPrev}>
                <ChevronLeftIcon className="w-5 h-5" />
              </Button>
            </div>
            <div className="absolute inset-y-0 right-2 flex items-center">
              <Button variant="ghost" size="icon" className="h-10 w-10 p-0 bg-white/70 hover:bg-white shadow-sm" onClick={goNext}>
                <ChevronRightIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="inline-flex items-center justify-center gap-3 p-2 rounded-xl bg-white/80 shadow-sm">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlideIndex(idx)}
                className={`transition-all ${idx === slideIndex ? "w-4 h-4 bg-[#eb7e5c] rounded-full" : "w-3 h-3 bg-carouselgray rounded-full opacity-50"}`}
                aria-label={`Ir a imagen ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <NavbarMenuSection />

      <RollsSaleSection products={rolls} onSelect={setModalProduct} />

      <SaucesSaleSection products={salsas} onSelect={setModalProduct} />

      <section id="bebidas" className="relative w-full px-4 py-16 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        <div className="flex flex-col items-start gap-8 max-w-7xl mx-auto">
          <h2 className="[font-family:'Roboto',Helvetica] font-semibold text-black text-4xl md:text-5xl tracking-tight leading-[1.1]">Bebidas (350ml)</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full bg-white border border-solid border-black p-6 rounded-2xl shadow-sm">
            {(bebidas.length ? bebidas : []).map((drink, index) => (
              <Card
                key={drink.id}
                className="border border-solid border-black bg-white translate-y-[-1rem] animate-fade-up opacity-0 transition-[transform,box-shadow] hover:scale-[1.02] hover:shadow-lg duration-300"
                style={{ "--animation-delay": `${400 + index * 200}ms` } as React.CSSProperties}
              >
                <CardContent className="flex flex-col items-start gap-4 p-6">
                  <button onClick={() => setModalProduct(drink)} className="relative w-full h-[200px] md:h-[240px] rounded-xl bg-white flex items-center justify-center overflow-hidden">
                    <img src={imgFor(drink)} alt={drink.title} className="w-full h-full object-contain" />
                  </button>

                  <div className="flex flex-col items-start justify-center gap-1 w-full">
                    <h3 className="w-full [font-family:'Roboto',Helvetica] font-medium text-black text-xl md:text-2xl text-center tracking-[0] leading-8">
                      {drink.title}
                    </h3>
                    <p className="w-full flex items-center justify-center [font-family:'Roboto',Helvetica] font-normal text-[#4b5563] text-lg md:text-xl text-center tracking-[0] leading-7">
                      {drink.ingredients || drink.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="promociones" className="relative w-full px-4 py-16 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        <div className="flex flex-col items-start gap-8 max-w-7xl mx-auto">
          <h2 className="[font-family:'Roboto',Helvetica] font-semibold text-black text-4xl md:text-5xl tracking-tight leading-[1.1]">Promociones</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full bg-white border border-solid border-black p-6 rounded-2xl shadow-sm">
            {promos.map((promo, index) => (
              <Card
                key={promo.id}
                className="border border-solid border-black bg-white translate-y-[-1rem] animate-fade-up opacity-0 transition-[transform,box-shadow] hover:scale-[1.02] hover:shadow-lg duration-300"
                style={{ "--animation-delay": `${600 + index * 200}ms` } as React.CSSProperties}
              >
                <CardContent className="flex flex-col items-start gap-4 p-6">
                  <button onClick={() => setModalProduct(promo)} className="relative w-full h-[200px] md:h-[240px] rounded-xl bg-white flex items-center justify-center overflow-hidden">
                    <img src={imgFor(promo)} alt={promo.title} className="w-full h-full object-contain" />
                  </button>

                  <div className="flex flex-col items-start justify-center gap-1 w-full">
                    <h3 className="w-full [font-family:'Roboto',Helvetica] font-medium text-black text-xl md:text-2xl text-center tracking-[0] leading-8">
                      {promo.title}
                    </h3>

                    <p className="w-full flex items-center justify-center [font-family:'Roboto',Helvetica] font-normal text-[#4b5563] text-lg md:text-xl text-center tracking-[0] leading-7">
                      {promo.ingredients || promo.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <FooterSection />

      {modalProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="[font-family:'Roboto',Helvetica] font-semibold text-black text-2xl leading-tight">{modalProduct.title}</h3>
              <Button variant="ghost" size="icon" onClick={() => setModalProduct(null)}>
                <XIcon className="w-5 h-5" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-white flex items-center justify-center p-6">
                <img src={imgFor(modalProduct)} alt={modalProduct.title} className="w-full h-full object-contain max-h-[360px]" />
              </div>
              <div className="p-6 flex flex-col gap-4">
                {modalProduct.description && <p className="text-gray-700">{modalProduct.description}</p>}
                {modalProduct.ingredients && <p className="text-gray-700">Ingredientes: {modalProduct.ingredients}</p>}
                {modalProduct.price && <p className="font-semibold text-lg">${modalProduct.price.toLocaleString("es-CL")}</p>}
                {feedback && <div className="text-green-600 text-sm">{feedback}</div>}
                <div className="mt-auto flex gap-3">
                  <Button variant="outline" onClick={() => setModalProduct(null)}>
                    Cerrar
                  </Button>
                  <Button onClick={() => handleAddToCart(modalProduct)}>Añadir al carrito</Button>
                </div>
              </div>
            </div>
            {recommended.length > 0 && (
              <div className="border-t px-6 py-4 bg-gray-50">
                <h4 className="font-semibold mb-3">Recomendados</h4>
                <div className="grid grid-cols-2 gap-3">
                  {recommended.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => setModalProduct(prod)}
                      className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition"
                    >
                      <div className="w-14 h-14 bg-white rounded border flex items-center justify-center overflow-hidden">
                        <img src={imgFor(prod)} alt={prod.title} className="w-full h-full object-contain" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-sm">{prod.title}</div>
                        <div className="text-xs text-gray-600">${prod.price?.toLocaleString("es-CL")}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
