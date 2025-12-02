import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJson } from "./api";

export default function useRequireAdmin(redirectTo = "/login") {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      navigate(redirectTo);
      return;
    }

    (async () => {
      try {
        const res = await getJson("/api/auth/is_admin");
        if (!mounted) return;
        if (!res.ok) {
          // if backend says not ok (401/403), redirect to home
          navigate("/");
          return;
        }
        const isAdmin = res.data && res.data.is_admin;
        if (!isAdmin) {
          navigate("/");
          return;
        }
        setChecking(false);
      } catch (err) {
        navigate("/");
      }
    })();

    return () => {
      mounted = false;
    };
  }, [navigate, redirectTo]);

  return { checking };
}
