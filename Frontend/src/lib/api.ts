export const API_BASE = import.meta.env.VITE_API_URL || "";

const parse = async (res: Response) => {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const authHeader = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export async function getJson(path: string) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { ...authHeader() },
  });
  return { ok: res.ok, status: res.status, data: await parse(res) };
}

export async function postJson(path: string, body: any, token?: string) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : authHeader()),
    },
    body: JSON.stringify(body),
  });
  return { ok: res.ok, status: res.status, data: await parse(res) };
}

export async function putJson(path: string, body: any) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(body),
  });
  return { ok: res.ok, status: res.status, data: await parse(res) };
}

export async function del(path: string) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "DELETE",
    headers: { ...authHeader() },
  });
  return { ok: res.ok, status: res.status, data: await parse(res) };
}

export async function postFormUrlEncoded(path: string, params: Record<string, string>) {
  const body = new URLSearchParams(params);
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  const json = await res.json();
  return { ok: res.ok, status: res.status, data: json };
}
