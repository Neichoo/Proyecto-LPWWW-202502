import { useEffect, useState } from "react";
import { ArrowLeftIcon, ChevronRightIcon, MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { getJson, postJson, putJson, del } from "../../lib/api";

type CartItem = {
  id: number;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
};

type Cart = {
  id: number;
  user_id: number;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

export const CarritoDeCompras = (): JSX.Element => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchCart = async () => {
    setLoading(true);
    const res = await getJson("/api/cart");
    if (res.ok) {
      setCart(res.data as Cart);
      setError(null);
    } else {
      setError(res.status === 401 ? "Inicia sesión para ver tu carrito." : "No se pudo cargar el carrito.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (item: CartItem, delta: number) => {
    const next = Math.max(1, item.quantity + delta);
    setUpdatingId(item.id);
    const res = await putJson(`/api/cart/item/${item.id}`, { quantity: next });
    if (res.ok) {
      await fetchCart();
    } else {
      setError("No se pudo actualizar la cantidad.");
    }
    setUpdatingId(null);
  };

  const removeItem = async (itemId: number) => {
    setUpdatingId(itemId);
    const res = await del(`/api/cart/item/${itemId}`);
    if (res.ok) {
      await fetchCart();
    } else {
      setError("No se pudo eliminar el ítem.");
    }
    setUpdatingId(null);
  };

  const clearCart = async () => {
    const res = await del("/api/cart/clear");
    if (res.ok) {
      await fetchCart();
    } else {
      setError("No se pudo vaciar el carrito.");
    }
  };

  return (
    <div
      className="bg-[#fefdfe] w-full min-h-screen flex justify-center items-start p-8 translate-y-[-1rem] animate-fade-in opacity-0"
      data-model-id="117:1083"
    >
      <div className="flex gap-8 max-w-[1133px] w-full">
        <section className="flex-1 min-w-[608px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <Link to="/" className="mb-6 p-0 h-auto hover:bg-transparent inline-flex items-center">
            <ArrowLeftIcon className="w-[30px] h-[30px] mr-2" />
            <span className="[font-family:'Roboto',Helvetica] font-semibold text-[#1e1e1e] text-lg">
              Seguir comprando
            </span>
          </Link>

          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="[font-family:'Roboto',Helvetica] font-medium text-[#1e1e1e] text-lg mb-2">
                Carrito de compras
              </h1>
              <p className="[font-family:'Roboto',Helvetica] font-medium text-[#1e1e1e] text-sm">
                {cart ? `Tienes ${cart.items.length} ítems` : "Sin ítems"}
              </p>
            </div>
            {!!cart?.items.length && (
              <Button variant="outline" onClick={clearCart} className="text-sm">
                Vaciar carrito
              </Button>
            )}
          </div>

          <div className="w-full h-0.5 bg-gray-300 mb-6" />

          {loading && <div>Cargando carrito...</div>}
          {error && <div className="text-red-600 mb-4">{error}</div>}

          {!loading && cart && cart.items.length === 0 && (
            <div className="text-gray-600">Tu carrito está vacío.</div>
          )}

          {cart &&
            cart.items.map((item) => (
              <Card
                key={item.id}
                className="shadow-[0px_1px_4px_#00000040] rounded-[15px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]"
              >
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-20 h-[82px] bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-sm text-gray-500">#{item.product_id}</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="[font-family:'Roboto',Helvetica] font-medium text-[#1e1e1e] text-lg">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      ${item.price.toLocaleString("es-CL")} c/u
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item, -1)}
                        disabled={updatingId === item.id}
                      >
                        <MinusIcon className="w-4 h-4" />
                      </Button>
                      <span className="[font-family:'Roboto',Helvetica] font-semibold text-[#393939] text-[18px]">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item, 1)}
                        disabled={updatingId === item.id}
                      >
                        <PlusIcon className="w-4 h-4" />
                      </Button>
                    </div>

                    <span className="[font-family:'Roboto',Helvetica] font-medium text-[#393939] text-sm text-right w-[80px]">
                      ${item.subtotal.toLocaleString("es-CL")}
                    </span>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-auto p-0 hover:bg-transparent"
                      onClick={() => removeItem(item.id)}
                      disabled={updatingId === item.id}
                    >
                      <Trash2Icon className="w-[20px] h-[20px] text-gray-600" />
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
                Resumen
              </h2>

              <div className="space-y-3 mb-6 text-[#fdfbfb]">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${cart?.subtotal?.toLocaleString("es-CL") || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Envío</span>
                  <span>${cart?.shipping?.toLocaleString("es-CL") || 0}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-white text-lg font-semibold mb-6">
                <span>Total</span>
                <span>${cart?.total?.toLocaleString("es-CL") || 0}</span>
              </div>

              <Button className="w-full h-[60px] bg-[#ca2b4b] hover:bg-[#b02542] rounded-xl text-[#fdfbfb] [font-family:'Roboto',Helvetica] font-medium text-base transition-colors" disabled={!cart || cart.items.length === 0}>
                <span className="mr-auto">${cart?.total?.toLocaleString("es-CL") || 0}</span>
                <span>Ir a pagar</span>
                <ChevronRightIcon className="w-[25px] h-[25px] ml-2" />
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
};
