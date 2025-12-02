import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { getJson, postJson, putJson, del } from "../../../../lib/api";

type AdminProduct = {
  id: number;
  name: string;
  price: number;
  is_available?: boolean;
};

const columns = [
  { label: "Nombre", width: "flex-[286px]" },
  { label: "Precio $", width: "flex-[577px]" },
  { label: "Disponible", width: "flex-[289px]" },
  { label: "Acciones", width: "w-[582px]" },
];

export const ProductListSection = (): JSX.Element => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminProduct | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      const res = await getJson("/api/admin/products");
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          setError("No autorizado. Inicia sesión como administrador.");
        } else {
          setError(`Error HTTP ${res.status}`);
        }
        setProducts([]);
      } else {
        setProducts(res.data as AdminProduct[]);
      }
      setLoading(false);
    };
    load();
  }, []);

  const openNew = () =>
    setEditing({ id: 0, name: "", price: 0, is_available: true });

  // changed code: función para alternar disponibilidad
  const toggleAvailability = async (productId: number, current: boolean) => {
    try {
      setError(null);
      const res = await putJson(`/api/admin/products/${productId}/availability`, {
        is_available: !current,
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === productId ? { ...p, is_available: !current } : p))
        );
      } else {
        setError("No se pudo actualizar disponibilidad");
      }
    } catch (err) {
      setError("Error al actualizar disponibilidad");
    }
  };

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <>
      {/* HEADER CON TÍTULOS ALINEADOS */}
      <header className="w-full flex items-center justify-start gap-4 border border-solid border-black mb-4">
        <div className="flex items-center gap-2 w-full">
          {columns.map((column, index) => (
            <div
              key={index}
              className={`${column.width} font-heading font-[number:var(--heading-font-weight)] text-[#1e1e1e] text-[length:var(--heading-font-size)] text-center tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] [font-style:var(--heading-font-style)] font-bold`}
            >
              {column.label}
            </div>
          ))}
        </div>
      </header>

      {/* FILAS DE PRODUCTOS */}
      <section className="flex flex-col w-full items-start gap-[16px]">
        {products.map((product, index) => (
          <article
            key={product.id}
            className="flex w-full items-center gap-4 opacity-0 animate-fade-in"
            style={{ ["--animation-delay" as any]: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-2 w-full">
              <div className="flex-[286px] text-center">{product.name}</div>

              <div className="flex-[577px] text-center">
                ${product.price.toLocaleString("es-CL")}
              </div>

              {/* changed code: checkbox interactivo */}
              <div className="flex-[289px] flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={!!product.is_available}
                  onChange={async () => {
                    await toggleAvailability(product.id, !!product.is_available);
                  }}
                  className="w-[18px] h-[18px]"
                />
              </div>

              <div className="w-[582px] flex items-center justify-center">
                <Button
                  variant="outline"
                  onClick={() => setEditing(product)}
                  className="h-auto bg-[#e3e3e3] border-[#767676] hover:bg-[#d3d3d3] transition-colors"
                >
                  Editar
                </Button>

                <Button
                  variant="destructive"
                  onClick={async () => {
                    if (!confirm(`¿Eliminar producto ${product.name}?`)) return;
                    try {
                      const res = await del(`/api/admin/products/${product.id}`);
                      if (res.ok) {
                        setProducts((prev) =>
                          prev.filter((p) => p.id !== product.id)
                        );
                      } else {
                        setError("No se pudo eliminar el producto");
                      }
                    } catch (err) {
                      setError("Error al eliminar producto");
                    }
                  }}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className="mt-6">
        <Button onClick={openNew}>+ Nuevo Producto</Button>
      </div>

      {editing && (
        <ProductModal
          product={editing}
          onClose={() => setEditing(null)}
          onSaved={(p) => {
            if (p.id > 0) {
              setProducts((prev) =>
                prev.map((x) => (x.id === p.id ? p : x))
              );
            } else {
              setProducts((prev) => [p, ...prev]);
            }
          }}
        />
      )}
    </>
  );
};

function ProductModal({
  product,
  onClose,
  onSaved,
}: {
  product: AdminProduct;
  onClose: () => void;
  onSaved: (p: AdminProduct) => void;
}) {
  const [local, setLocal] = useState<AdminProduct>(product);

  useEffect(() => setLocal(product), [product]);

  const save = async () => {
    try {
      // enviar is_available solo al crear (local.id === 0)
      const body: any = {
        name: local.name,
        price: local.price,
      };
      if (local.id === 0) body.is_available = local.is_available;

      const res =
        local.id > 0
          ? await putJson(`/api/admin/products/${local.id}`, body)
          : await postJson(`/api/admin/products`, body);

      if (res.ok) {
        onSaved(res.data || local);
        onClose();
      } else {
        alert(`Error: ${res.status}`);
      }
    } catch {
      alert("Error guardando producto");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">
          {local.id > 0 ? "Editar producto" : "Nuevo producto"}
        </h3>

        <div className="space-y-3">
          <div>
            <label className="block text-sm">Nombre</label>
            <input
              className="w-full border rounded px-2 py-1"
              value={local.name}
              onChange={(e) =>
                setLocal({ ...local, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm">Precio</label>
            <input
              type="number"
              className="w-full border rounded px-2 py-1"
              value={local.price}
              onChange={(e) =>
                setLocal({ ...local, price: Number(e.target.value) })
              }
            />
          </div>

          {/* Eliminado checkbox de "Disponible" del modal:
              La disponibilidad se gestiona desde la columna en la lista */}
        </div>

        <div className="flex gap-2 mt-4">
          <Button onClick={onClose} variant="outline">
            Cancelar
          </Button>
          <Button onClick={save} className="bg-blue-600 text-white">
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
}
