import React, { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { getJson, del } from "../../../../lib/api";

interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}

interface EditingUser extends User {}

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

  const handleEditClick = (user: User) => setEditingUser({ ...user });
  const handleCancelEdit = () => setEditingUser(null);

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
      {/* ENCABEZADO */}
      <header className="flex w-full items-center border border-solid border-black">
        <div className="w-full flex justify-center border-b border-solid border-[#e5e5e5]">
          <div className="flex flex-1 max-w-[1375px] items-center gap-2">
            {columns.map((column) => (
              <div
                key={column.id}
                className={`${column.width} flex items-center justify-center py-3 font-bold text-black`}
              >
                {column.label}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* FILAS */}
      <div className="flex flex-col w-full items-center gap-[8px] px-0 py-8">
        {(users ?? []).map((user, index) => (
          <div
            key={user.id}
            className="w-full flex justify-center translate-y-[-1rem] animate-fade-in opacity-0"
            style={{ "--animation-delay": `${index * 50}ms` } as React.CSSProperties}
          >
            <div className="flex flex-1 max-w-[1375px] items-center gap-2">
              <div className="w-[150px] text-center">{user.username}</div>
              <div className="flex-1 max-w-[737px] text-center">{user.email}</div>
              <div className="w-[150px] text-center">{user.role}</div>

              <div className="w-[272px] flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  className="p-3 bg-[#e3e3e3] rounded-lg border hover:bg-[#d3d3d3]"
                  onClick={() => handleEditClick(user)}
                >
                  Editar
                </Button>

                <Button
                  variant="destructive"
                  onClick={async () => {
                    if (!confirm(`¿Eliminar usuario ${user.username}?`)) return;
                    try {
                      const res = await del(`/api/admin/users/${user.id}`);
                      if (res.ok) {
                        setUsers((prev) => prev ? prev.filter((p) => p.id !== user.id) : []);
                      } else {
                        setError("No se pudo eliminar el usuario");
                      }
                    } catch {
                      setError("Error al eliminar usuario");
                    }
                  }}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DE EDICIÓN */}
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
                  onChange={(e) => handleEditChange("username", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => handleEditChange("email", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={editingUser.full_name}
                  onChange={(e) => handleEditChange("full_name", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Rol</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => handleEditChange("role", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                  <option value="delivery">delivery</option>
                  <option value="cajero">cajero</option>
                </select>
              </div>
            </div>

            {/* BOTONES */}
            <div className="flex justify-end gap-4 mt-6">
              <Button
                variant="outline"
                onClick={handleCancelEdit}
                className="px-4 py-2"
              >
                Cancelar
              </Button>

              <Button
                onClick={handleSaveEdit}
                disabled={isSaving}
                className="px-4 py-2"
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
