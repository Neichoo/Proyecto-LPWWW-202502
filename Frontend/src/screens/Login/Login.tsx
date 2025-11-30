import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { postFormUrlEncoded } from "../../lib/api";
import { MainNavbar } from "../../components/navigation/MainNavbar";

  const navigationItems = [
  { label: "Menú", to: "/" },
  { label: "Locales", to: "/locales" },
  { label: "Contacto", to: "/contacto" },
];

export const Login = (): JSX.Element => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // backend login uses OAuth2 form with username & password
      const resp = await postFormUrlEncoded('/api/auth/login', { username: usernameOrEmail, password });
      if (resp.ok) {
        // store token
        localStorage.setItem('token', resp.data.access_token);
        // redirect to home
        window.location.href = '/';
      } else {
        setError((resp.data && resp.data.detail) || 'Login failed');
      }
    } catch (err) {
      setError(String(err));
    } finally { setLoading(false); }
  };

  return (
    <div
      className="bg-[#27686b] w-full min-h-screen flex flex-col"
      data-model-id="99:1027"
    >
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
                    <Label
                      htmlFor="email"
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#444444] text-[16px] leading-normal flex items-start"
                    >
                      Email address or user name
                    </Label>
                    <Input
                      id="email"
                      type="text"
                      value={usernameOrEmail}
                      onChange={(e) => setUsernameOrEmail(e.target.value)}
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
                      <span className="text-[#333333]">
                        By continuing, you agree to the{" "}
                      </span>
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
                        disabled={loading || !usernameOrEmail || !password}
                        className={`h-12 w-full bg-[#111111] hover:bg-[#111111] rounded-[12px] [font-family:'Poppins',Helvetica] font-medium text-white text-[18px] ${loading || !usernameOrEmail || !password ? 'opacity-50' : ''}`}
                      >
                        {loading ? 'Logging in...' : 'Log in'}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6">
                <Button
                  variant="link"
                  className="h-auto p-0 [font-family:'Roboto',Helvetica] font-medium text-[#111111] text-[16px] leading-normal underline"
                >
                  Forget your password
                </Button>

                <p className="[font-family:'Roboto',Helvetica] font-normal text-[16px] leading-normal p-0">
                  <span className="text-[#666666]">
                    Don&apos;t have an acount?{" "}
                  </span>
                  <Link to="/signup">
                    <Button
                      variant="link"
                      className="h-auto p-0 [font-family:'Roboto',Helvetica] font-medium text-[#111111] text-[16px] leading-normal underline"
                    >
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
