import React, { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { getJson, postJson } from "../../../../lib/api";

interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}

interface EditingUser extends User {
  // allows editing
}

const columns = [
  { id: "username", label: "Usuario", width: "w-[150px]" },
  { id: "email", label: "Email", width: "flex-1 max-w-[737px]" },
  { id: "role", label: "Rol", width: "w-[150px]" },
  { id: "actions", label: "Acciones", width: "w-[272px]" },
];

export const MainContentSection = (): JSX.Element => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<EditingUser | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getJson("/api/admin/users");
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error("No autorizado. Inicia sesión como administrador.");
        }
        throw new Error(`HTTP ${res.status}`);
      }
      setUsers(res.data as User[]);
    } catch (err: any) {
      setError(err.message || "Error al obtener usuarios");
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (field: keyof EditingUser, value: string) => {
    if (editingUser) {
      setEditingUser({ ...editingUser, [field]: value } as EditingUser);
    }
  };

  const handleEditClick = (user: User) => {
    setEditingUser({ ...user });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;

    try {
      setIsSaving(true);
      setError(null);

      const payload = {
        username: editingUser.username,
        email: editingUser.email,
        full_name: editingUser.full_name,
        role: editingUser.role,
      };

      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const variants = [
        `/api/admin/users/${editingUser.id}`,
        `/api/admin/users/${editingUser.id}/`,
        `http://localhost:8000/api/admin/users/${editingUser.id}`,
        `http://localhost:8000/api/admin/users/${editingUser.id}/`,
      ];

      let lastRes: Response | null = null;
      for (const url of variants) {
        try {
          const res = await fetch(url, {
            method: "PUT",
            headers,
            body: JSON.stringify(payload),
          });
          lastRes = res;
          if (res.ok) {
            const updated = await res.json().catch(() => editingUser);
            setUsers(users?.map((u) => (u.id === editingUser.id ? { ...u, ...updated } : u)) || null);
            setEditingUser(null);
            return;
          }
          if (res.status === 404) continue;
          if (res.status === 405) {
            const resPatch = await fetch(url, {
              method: "PATCH",
              headers,
              body: JSON.stringify(payload),
            });
            lastRes = resPatch;
            if (resPatch.ok) {
              const updated = await resPatch.json().catch(() => editingUser);
              setUsers(users?.map((u) => (u.id === editingUser.id ? { ...u, ...updated } : u)) || null);
              setEditingUser(null);
              return;
            }
            if (resPatch.status === 404) continue;
          }
          break;
        } catch (innerErr) {
          continue;
        }
      }

      const statusMsg = lastRes ? `HTTP ${lastRes.status}` : "No se pudo conectar al backend";
      throw new Error(statusMsg);
    } catch (err: any) {
      setError(err.message || "Error al guardar usuario");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="flex items-center justify-center py-8">
        Cargando usuarios...
      </section>
    );
  }

  if (error && !editingUser) {
    return (
      <section className="flex items-center justify-center py-8 text-red-600">
        Error: {error}
      </section>
    );
  }

  return (
    <section className="flex flex-col w-full items-center justify-center gap-4 py-8">
      {/* HEADER CON TÍTULOS ALINEADOS */}
      <header className="flex w-full items-center border border-solid border-black">
        <div className="w-full flex justify-center border-b border-solid border-[#e5e5e5]">
          <div className="flex flex-1 max-w-[1375px] items-center gap-2">
            {columns.map((column) => (
              <div
                key={column.id}
                className={`${column.width} flex items-center justify-center py-3 font-heading font-[number:var(--heading-font-weight)] text-[length:var(--heading-font-size)] text-center tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] [font-style:var(--heading-font-style)] text-black font-bold`}
              >
                {column.label}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* FILAS DE USUARIOS */}
      <div className="flex flex-col w-full items-center gap-[8px] px-0 py-8">
        {(users ?? []).map((user, index) => (
          <div
            key={user.id}
            className="w-full flex justify-center translate-y-[-1rem] animate-fade-in opacity-0"
            style={{ "--animation-delay": `${index * 50}ms` } as React.CSSProperties}
          >
            <div className="flex flex-1 max-w-[1375px] items-center gap-2">
              <div className="w-[150px] text-[#1e1e1e] whitespace-nowrap font-heading font-[number:var(--heading-font-weight)] text-[length:var(--heading-font-size)] text-center tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] [font-style:var(--heading-font-style)]">
                {user.username}
              </div>

              <div className="flex-1 max-w-[737px] font-heading font-[number:var(--heading-font-weight)] text-[#1e1e1e] text-[length:var(--heading-font-size)] text-center tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] whitespace-nowrap [font-style:var(--heading-font-style)]">
                {user.email}
              </div>

              <div className="flex items-center justify-center w-[150px] font-heading font-[number:var(--heading-font-weight)] text-[#1e1e1e] text-[length:var(--heading-font-size)] text-center tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] [font-style:var(--heading-font-style)]">
                {user.role}
              </div>

              <div className="w-[272px] flex items-center justify-center">
                <Button
                  variant="outline"
                  className="h-auto inline-flex items-center justify-center gap-2 p-3 bg-[#e3e3e3] rounded-lg border border-solid border-[#767676] font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-[#1e1e1e] text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] [font-style:var(--single-line-body-base-font-style)] hover:bg-[#d3d3d3] transition-colors"
                  onClick={() => handleEditClick(user)}
                >
                  Editar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        className="h-auto flex items-center justify-center w-[93px] rounded-lg border border-solid border-[#cac4d0] hover:bg-accent transition-colors translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1000ms]"
      >
        <div className="inline-flex h-8 items-center justify-center gap-2 px-4 py-1.5">
          <span className="font-[number:var(--m3-label-large-font-weight)] tracking-[var(--m3-label-large-letter-spacing)] leading-[var(--m3-label-large-line-height)] font-m3-label-large [font-style:var(--m3-label-large-font-style)] text-[length:var(--m3-label-large-font-size)] text-m3syslighton-surface">
            +
          </span>
        </div>
      </Button>

      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Editar Usuario</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Usuario</label>
                <input
                  type="text"
                  value={editingUser.username}
                  onChange={(e) =>
                    handleEditChange("username", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => handleEditChange("email", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={editingUser.full_name}
                  onChange={(e) =>
                    handleEditChange("full_name", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Rol</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => handleEditChange("role", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                >
                  <option value="admin">admin</option>
                  <option value="cliente">cliente</option>
                  <option value="delivery">delivery</option>
                  <option value="cajero">cajero</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleCancelEdit}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveEdit}
                disabled={isSaving}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSaving ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};