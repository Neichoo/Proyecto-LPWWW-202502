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

export async function postJson(path: string, data: any) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(data),
  });

  let json = null;
  try {
    json = await res.json();
  } catch {}

  return { ok: res.ok, status: res.status, data: json };
}

export async function putJson(path: string, data: any) {
  const headers = {
    "Content-Type": "application/json",
    ...authHeader(),
  };

  let res = await fetch(`${API_BASE}${path}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });

  if (res.status === 405) {
    // Si PUT no está permitido, intenta PATCH
    res = await fetch(`${API_BASE}${path}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });
  }

  let json = null;
  try {
    json = await res.json();
  } catch {}

  return { ok: res.ok, status: res.status, data: json };
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
    headers: { "Content-Type": "application/x-www-form-urlencoded", ...authHeader() },
    body: body.toString(),
  });
  const json = await res.json();
  return { ok: res.ok, status: res.status, data: json };
}
