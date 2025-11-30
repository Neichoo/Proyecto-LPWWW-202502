import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { getJson, postJson } from "../../lib/api";

type Product = {
  id: number;
  title: string;
  description?: string;
  price: number;
  image_url?: string;
};

type ProductDetail = Product & {
  ingredients?: string;
  related_products?: Product[];
};

export const ProductDetailPage = (): JSX.Element => {
  const { id } = useParams();
  const productId = Number(id) || 1;
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [recommended, setRecommended] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const loadProduct = async () => {
    setLoading(true);
    setError(null);
    const res = await getJson(`/api/products/${productId}/detail`);
    if (res.ok) {
      setProduct(res.data);
      setRecommended(res.data.related_products || []);
    } else {
      setError("No pudimos cargar el producto.");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const handleAddToCart = async (prod: Product) => {
    setFeedback(null);
    const res = await postJson("/api/cart/add", {
      product_id: prod.id,
      quantity: 1,
    });
    if (res.ok) {
      setFeedback("Producto añadido al carrito.");
    } else if (res.status === 401) {
      setFeedback("Inicia sesión para añadir al carrito.");
    } else {
      setFeedback("No se pudo añadir al carrito.");
    }
  };

  const displayProduct = useMemo(() => product, [product]);

  return (
    <main
      className="bg-[#fefdfe] w-full min-h-screen relative"
      data-model-id="3:23"
    >
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        {loading && <div>Cargando producto...</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}

        {displayProduct && (
          <>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
              <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
                <button
                  onClick={() => setModalProduct(displayProduct)}
                  className="w-full aspect-[4/3] rounded-xl bg-white flex items-center justify-center overflow-hidden hover:shadow-lg transition-shadow"
                  aria-label="Ver imagen ampliada"
                >
                  <img
                    src={displayProduct.image_url || "https://via.placeholder.com/600x400?text=Sin+imagen"}
                    alt={displayProduct.title}
                    className="w-full h-full object-contain"
                  />
                </button>
              </div>

              <article className="flex flex-col items-start justify-center gap-4 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
                <h1 className="self-stretch [font-family:'Roboto',Helvetica] font-semibold text-black text-[30px] tracking-[0] leading-[38px]">
                  {displayProduct.title}
                </h1>

                <p className="self-stretch [font-family:'Roboto',Helvetica] font-medium text-black text-xl tracking-[0] leading-8">
                  ${displayProduct.price?.toLocaleString("es-CL")}
                </p>

                {displayProduct.description && (
                  <p className="self-stretch [font-family:'Roboto',Helvetica] font-normal text-[#4b5563] text-lg tracking-[0] leading-7">
                    {displayProduct.description}
                  </p>
                )}

                {displayProduct.ingredients && (
                  <p className="self-stretch [font-family:'Roboto',Helvetica] font-normal text-[#4b5563] text-lg tracking-[0] leading-7">
                    Ingredientes: {displayProduct.ingredients}
                  </p>
                )}

                {feedback && <div className="text-green-600 text-sm">{feedback}</div>}

                <Button
                  className="w-full h-12 px-6 bg-black rounded-lg shadow-button-shadow hover:bg-black/90 transition-colors"
                  onClick={() => handleAddToCart(displayProduct)}
                >
                  <span className="font-small-text font-[number:var(--small-text-font-weight)] text-white text-[18px] tracking-[var(--small-text-letter-spacing)] leading-[var(--small-text-line-height)] [font-style:var(--small-text-font-style)]">
                    Añadir al carrito
                  </span>
                </Button>
              </article>
            </section>

            <section className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
              <h2 className="mb-10 [font-family:'Roboto',Helvetica] font-semibold text-black text-[26px] tracking-[0] leading-[34px]">
                Recomendados
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recommended.map((prod, index) => (
                  <Card
                    key={prod.id}
                    className="border border-gray-200 shadow-sm bg-white translate-y-[-1rem] animate-fade-in opacity-0 hover:shadow-md transition"
                    style={
                      {
                        "--animation-delay": `${600 + index * 100}ms`,
                      } as React.CSSProperties
                    }
                  >
                    <CardContent className="p-0 flex flex-col gap-4">
                      <button
                        onClick={() => setModalProduct(prod)}
                        className="w-full h-[200px] md:h-[230px] rounded-lg bg-white flex items-center justify-center overflow-hidden"
                        aria-label={`Ver ${prod.title}`}
                      >
                        <img
                          src={prod.image_url || "https://via.placeholder.com/400x300?text=Sin+imagen"}
                          alt={prod.title}
                          className="w-full h-full object-contain"
                        />
                      </button>

                      <div className="flex flex-col gap-1 px-4 pb-4">
                        <h3 className="[font-family:'Roboto',Helvetica] font-medium text-black text-lg tracking-[0] leading-7">
                          {prod.title}
                        </h3>

                        <p className="text-sm text-gray-600">
                          ${prod.price?.toLocaleString("es-CL")}
                        </p>

                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="px-3"
                            onClick={() => setModalProduct(prod)}
                          >
                            Ver
                          </Button>
                          <Button
                            size="sm"
                            className="px-3"
                            onClick={() => handleAddToCart(prod)}
                          >
                            Añadir
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {modalProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-white flex items-center justify-center p-6">
                <img
                  src={modalProduct.image_url || "https://via.placeholder.com/600x400?text=Sin+imagen"}
                  alt={modalProduct.title}
                  className="w-full h-full object-contain max-h-[360px]"
                />
              </div>
              <div className="p-6 flex flex-col gap-4">
                <h3 className="[font-family:'Roboto',Helvetica] font-semibold text-black text-2xl leading-tight">
                  {modalProduct.title}
                </h3>
                {modalProduct.description && (
                  <p className="text-gray-700">{modalProduct.description}</p>
                )}
                {modalProduct.price && (
                  <p className="font-semibold text-lg">
                    ${modalProduct.price.toLocaleString("es-CL")}
                  </p>
                )}
                <div className="mt-auto flex gap-3">
                  <Button variant="outline" onClick={() => setModalProduct(null)}>
                    Cerrar
                  </Button>
                  <Button onClick={() => handleAddToCart(modalProduct)}>
                    Añadir al carrito
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
