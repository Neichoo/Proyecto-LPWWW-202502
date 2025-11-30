type Toast = {
  id: number;
  message: string;
  type?: "success" | "error" | "info";
};

let toasts: Toast[] = [];
let listeners: ((t: Toast[]) => void)[] = [];
let nextId = 1;

export const addToast = (message: string, type: Toast["type"] = "info") => {
  const toast = { id: nextId++, message, type };
  toasts = [...toasts, toast];
  listeners.forEach((l) => l(toasts));
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== toast.id);
    listeners.forEach((l) => l(toasts));
  }, 2500);
};

export const subscribeToasts = (cb: (t: Toast[]) => void) => {
  listeners = [...listeners, cb];
  cb(toasts);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
};
