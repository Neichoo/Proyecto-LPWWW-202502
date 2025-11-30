import { useEffect, useState } from "react";
import { subscribeToasts } from "./toast";

type Toast = {
  id: number;
  message: string;
  type?: "success" | "error" | "info";
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToasts(setToasts);
    return unsubscribe;
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg shadow-lg text-white text-sm ${
            toast.type === "success"
              ? "bg-emerald-600"
              : toast.type === "error"
              ? "bg-red-600"
              : "bg-gray-800"
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};
