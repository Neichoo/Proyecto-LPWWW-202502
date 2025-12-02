import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { getJson, postFormUrlEncoded } from "../../lib/api";
import { MainNavbar } from "../../components/navigation/MainNavbar";

export const Login = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remember, setRemember] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const loginUsername = credential.includes("@") ? credential.split("@")[0] : credential;
      const resp = await postFormUrlEncoded("/api/auth/login", { username: loginUsername, password });
      if (resp.ok && resp.data.access_token) {
        const token = resp.data.access_token;
        const user = resp.data.user;
        if (remember) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("user", JSON.stringify(user));
        }
        // already have user info from login response; redirect according to role
        if (user && user.role === "admin") {
          // admins (and cajero if desired) go to admin console
          window.location.href = "/admin";
        } 
        else if (user && user.role === "cajero") {
          window.location.href = "/caja-online";
        }
        else if (user && user.role === "delivery") {
          window.location.href = "/despacho";
        }
        else {
          window.location.href = "/";
        }
      } else {
        setError((resp.data && (resp.data.detail || resp.data.message)) || "Login failed");
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#27686b] w-full min-h-screen flex flex-col" data-model-id="99:1027">
      <header className="translate-y-[-1rem] animate-fade-in opacity-0">
        <MainNavbar />
      </header>

      <main className="flex-1 flex items-start justify-center py-16 px-6">
        <div className="w-full max-w-4xl bg-white flex items-start justify-center py-12 px-8 rounded-2xl shadow-sm translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <div className="w-full max-w-xl flex flex-col items-center gap-12">
            <div className="flex flex-col items-center gap-8 w-full">
              <div className="flex flex-col items-start gap-8 w-full">
                <h2 className="[font-family:'Roboto',Helvetica] font-medium text-[#333333] text-3xl leading-normal self-center">
                  Log in
                </h2>

                <div className="flex flex-col gap-8 w-full">
                <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="username" className="[font-family:'Poppins',Helvetica] font-normal text-[#444444] text-[16px] leading-normal flex items-start">
                      Usuario o email (usa el mismo que registraste)
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      value={credential}
                      onChange={(e) => setCredential(e.target.value)}
                      className="h-12 rounded-[12px] border border-[#66666659]"
                    />
                  </div>

                  <div className="flex flex-col gap-0 w-full">
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex items-start justify-between">
                        <Label
                          htmlFor="password"
                          className="[font-family:'Roboto',Helvetica] font-normal text-[#444444] text-[16px] leading-normal whitespace-nowrap"
                        >
                          Password
                        </Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto px-0 py-0 hover:bg-transparent flex items-center gap-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOffIcon className="w-6 h-6 text-[#666666]" />
                          ) : (
                            <EyeIcon className="w-6 h-6 text-[#666666]" />
                          )}
                          <span className="[font-family:'Roboto',Helvetica] font-normal text-[#666666cc] text-[16px] leading-normal">
                            Hide
                          </span>
                        </Button>
                      </div>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 rounded-[12px] border border-[#66666659]"
                      />
                    </div>

                    <div className="flex items-center gap-3 py-3">
                      <Checkbox
                        id="remember"
                        className="w-5 h-5"
                        checked={remember}
                        onCheckedChange={(v) => setRemember(Boolean(v))}
                      />
                      <Label
                        htmlFor="remember"
                        className="[font-family:'Roboto',Helvetica] font-normal text-[#333333] text-[16px] leading-normal whitespace-nowrap cursor-pointer"
                      >
                        Remember me
                      </Label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 w-full">
                    <p className="[font-family:'Roboto',Helvetica] font-normal text-[16px] leading-normal py-3 text-[#444444]">
                      <span className="text-[#333333]">By continuing, you agree to the </span>
                      <a href="#" className="text-[#111111] underline">
                        Terms of use
                      </a>
                      <span className="text-[#333333]"> and </span>
                      <a href="#" className="text-[#111111] underline">
                        Privacy Policy.
                      </a>
                    </p>

                    <form onSubmit={handleLogin} className="w-full">
                      {error && <div className="text-red-600 mb-2">{error}</div>}
                      <Button
                        type="submit"
                        disabled={loading || !credential || !password}
                        className={`h-12 w-full bg-[#111111] hover:bg-[#111111] rounded-[12px] [font-family:'Poppins',Helvetica] font-medium text-white text-[18px] ${
                          loading || !credential || !password ? "opacity-50" : ""
                        }`}
                      >
                        {loading ? "Logging in..." : "Log in"}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6">
                <Button variant="link" className="h-auto p-0 [font-family:'Roboto',Helvetica] font-medium text-[#111111] text-[16px] leading-normal underline">
                  Forget your password
                </Button>

                <p className="[font-family:'Roboto',Helvetica] font-normal text-[16px] leading-normal p-0">
                  <span className="text-[#666666]">Don&apos;t have an account? </span>
                  <Link to="/signup">
                    <Button variant="link" className="h-auto p-0 [font-family:'Roboto',Helvetica] font-medium text-[#111111] text-[16px] leading-normal underline">
                      Sign up
                    </Button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
