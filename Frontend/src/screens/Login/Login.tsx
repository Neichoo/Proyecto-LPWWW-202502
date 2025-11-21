import { EyeIcon, EyeOffIcon, ShoppingCartIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const navigationItems = [
  { label: "Menú" },
  { label: "Locales" },
  { label: "Contacto" },
];

export const Login = (): JSX.Element => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div
      className="bg-[#27686b] w-full min-w-[1920px] min-h-[1500px] flex flex-col"
      data-model-id="99:1027"
    >
      <header className="w-full h-[100px] bg-[#ca2b4b] flex items-center justify-between px-[81px] translate-y-[-1rem] animate-fade-in opacity-0">
        <div className="flex items-center gap-[13px]">
          <img
            className="w-[135px] h-[100px] rounded-[50.59px] object-cover"
            alt="Icono"
            src="https://c.animaapp.com/mi7thhexUlRvcK/img/icono-1.png"
          />
          <h1 className="[font-family:'Inter',Helvetica] font-medium text-[#fefdfe] text-[32px] leading-[48px] whitespace-nowrap">
            Fukusuke
          </h1>
        </div>

        <nav className="flex items-center gap-[70.38px]">
          <Button
            variant="ghost"
            size="icon"
            className="h-auto w-auto p-0 hover:bg-transparent"
          >
            <ShoppingCartIcon className="w-[43.99px] h-[43.99px] text-[#fefdfe]" />
          </Button>

          {navigationItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-auto px-0 py-0 hover:bg-transparent [font-family:'Inter',Helvetica] font-medium text-[#fefdfe] text-[29.3px] leading-[44px]"
            >
              {item.label}
            </Button>
          ))}

          <Button className="h-auto bg-[#27686b] hover:bg-[#1f5558] rounded-[11.73px] shadow-[0px_1.47px_2.93px_#0000000d] px-[35.19px] py-[20.53px] [font-family:'Inter',Helvetica] font-medium text-[#fefdfe] text-[23.5px] leading-[35.2px]">
            Login
          </Button>
        </nav>
      </header>

      <main className="flex-1 flex items-start justify-center pt-[92px] pb-[491px] px-[81px]">
        <div className="w-full max-w-[1757px] bg-white flex items-start justify-center pt-[101.9px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <div className="w-[780.6px] flex flex-col items-center gap-[64.6px]">
            <div className="flex flex-col items-center gap-[32.3px] w-full">
              <div className="flex flex-col items-start gap-[43.07px] w-full">
                <h2 className="[font-family:'Roboto',Helvetica] font-medium text-[#333333] text-[43.1px] leading-normal self-center">
                  Log in
                </h2>

                <div className="flex flex-col gap-[32.3px] w-full">
                  <div className="flex flex-col gap-[5.38px] w-full">
                    <Label
                      htmlFor="email"
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#666666] text-[21.5px] leading-normal h-[36.34px] flex items-start"
                    >
                      Email address or user name
                    </Label>
                    <Input
                      id="email"
                      type="text"
                      className="h-[75.37px] rounded-[16.15px] border-[1.35px] border-[#66666659]"
                    />
                  </div>

                  <div className="flex flex-col gap-0 w-full">
                    <div className="flex flex-col gap-[5.38px] w-full">
                      <div className="flex items-start justify-between h-[36.34px]">
                        <Label
                          htmlFor="password"
                          className="[font-family:'Roboto',Helvetica] font-normal text-[#666666] text-[21.5px] leading-normal whitespace-nowrap"
                        >
                          Password
                        </Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto px-0 py-0 hover:bg-transparent flex items-center gap-[15.8px]"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOffIcon className="w-[32.3px] h-[32.3px] text-[#666666]" />
                          ) : (
                            <EyeIcon className="w-[32.3px] h-[32.3px] text-[#666666]" />
                          )}
                          <span className="[font-family:'Roboto',Helvetica] font-normal text-[#666666cc] text-[24.2px] leading-normal">
                            Hide
                          </span>
                        </Button>
                      </div>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="h-[75.37px] rounded-[16.15px] border-[1.35px] border-[#66666659]"
                      />
                    </div>

                    <div className="flex items-center gap-[10.77px] py-[10.77px]">
                      <Checkbox
                        id="remember"
                        className="w-[32.3px] h-[32.3px]"
                      />
                      <Label
                        htmlFor="remember"
                        className="[font-family:'Roboto',Helvetica] font-normal text-[#333333] text-[21.5px] leading-normal whitespace-nowrap cursor-pointer"
                      >
                        Remember me
                      </Label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[10.77px] w-full">
                    <p className="[font-family:'Roboto',Helvetica] font-normal text-[21.5px] leading-normal py-[10.77px]">
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

                    <Button
                      disabled
                      className="h-[86.13px] w-full bg-[#111111] hover:bg-[#111111] rounded-[43.07px] opacity-25 [font-family:'Poppins',Helvetica] font-medium text-white text-[29.6px]"
                    >
                      Log in
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-[32.3px]">
                <Button
                  variant="link"
                  className="h-auto p-[2.69px] [font-family:'Roboto',Helvetica] font-medium text-[#111111] text-[21.5px] leading-normal underline"
                >
                  Forget your password
                </Button>

                <p className="[font-family:'Roboto',Helvetica] font-normal text-[21.5px] leading-normal p-[2.69px]">
                  <span className="text-[#666666]">
                    Don&apos;t have an acount?{" "}
                  </span>
                  <Button
                    variant="link"
                    className="h-auto p-0 [font-family:'Roboto',Helvetica] font-medium text-[#111111] text-[21.5px] leading-normal underline"
                  >
                    Sign up
                  </Button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
