import { ChevronDownIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";

export const SignUpSection = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password || !firstName) {
      setError('Please fill required fields');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        username: email.split('@')[0],
        email,
        full_name: `${firstName} ${lastName}`.trim(),
        password,
      };
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      if (res.ok) {
        // on success redirect to login or store token
        window.location.href = '/login';
      } else {
        const data = await res.json();
        setError(data.detail || 'Registration failed');
      }
    } catch (err) {
      setError(String(err));
    } finally { setLoading(false); }
  };

  return (
    <section className="w-full flex justify-center py-16 px-4 translate-y-[-1rem] animate-fade-in opacity-0">
      <div className="w-full max-w-[794px] bg-white rounded-[32px] border border-[#66666680] p-16">
        <div className="flex flex-col gap-10">
          <h1 className="[font-family:'Poppins',Helvetica] font-medium text-[#333333] text-[42.7px] leading-normal">
            Sign up now
          </h1>

          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-[5.33px]">
                <Label className="[font-family:'Poppins',Helvetica] font-normal text-[#666666] text-[21.3px] leading-normal">
                  First name
                </Label>
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="h-[74.67px] rounded-2xl border-[1.33px] border-[#66666659]" />
              </div>

              <div className="flex flex-col gap-[5.33px]">
                <Label className="[font-family:'Poppins',Helvetica] font-normal text-[#666666] text-[21.3px] leading-normal">
                  Last name
                </Label>
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="h-[74.67px] rounded-2xl border-[1.33px] border-[#66666659]" />
              </div>
            </div>

            <div className="flex flex-col gap-[5.33px]">
              <Label className="[font-family:'Poppins',Helvetica] font-normal text-[#666666] text-[21.3px] leading-normal">
                Email address
              </Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} className="h-[74.67px] rounded-2xl border-[1.33px] border-[#66666659]" />
            </div>

            <div className="flex flex-col gap-[5.33px]">
              <Label className="[font-family:'Poppins',Helvetica] font-normal text-[#666666] text-[21.3px] leading-normal">
                Phone number
              </Label>
              <div className="relative h-[74.67px] rounded-2xl border-[1.33px] border-[#66666659] overflow-hidden">
                <div className="absolute top-[19px] left-8 flex items-center gap-5">
                  <div className="flex items-center gap-[10.67px]">
                    <div className="relative w-12 h-[34.67px] bg-[url(https://c.animaapp.com/mi7tk9d8A2vM04/img/vector-3.svg)] bg-[100%_100%]">
                      <img
                        className="absolute w-full h-[84.62%] top-[7.69%] left-0"
                        alt="Vector"
                        src="https://c.animaapp.com/mi7tk9d8A2vM04/img/vector-1.svg"
                      />
                      <img
                        className="absolute w-[50.00%] h-[53.85%] top-0 left-0"
                        alt="Vector"
                        src="https://c.animaapp.com/mi7tk9d8A2vM04/img/vector.svg"
                      />
                      <img
                        className="absolute w-[38.89%] h-[38.08%] top-[7.69%] left-[5.56%]"
                        alt="Vector"
                        src="https://c.animaapp.com/mi7tk9d8A2vM04/img/vector-2.svg"
                      />
                    </div>
                    <ChevronDownIcon className="w-8 h-8" />
                  </div>
                  <span className="[font-family:'Poppins',Helvetica] font-normal text-[#111111] text-2xl leading-normal">
                    +1
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[5.33px]">
              <div className="flex items-center justify-between">
                <Label className="[font-family:'Poppins',Helvetica] font-normal text-[#666666] text-[21.3px] leading-normal">
                  Password
                </Label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex items-center gap-[10.7px] transition-opacity hover:opacity-80"
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-8 h-8" />
                  ) : (
                    <EyeIcon className="w-8 h-8" />
                  )}
                  <span className="[font-family:'Poppins',Helvetica] font-normal text-[#666666cc] text-2xl leading-normal">
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </button>
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-[74.67px] rounded-2xl border-[1.33px] border-[#66666659]"
              />
              <p className="[font-family:'Poppins',Helvetica] font-normal text-[#666666] text-[18.7px] leading-normal">
                Use 8 or more characters with a mix of letters, numbers &amp;
                symbols
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-[10.67px] py-[10.67px]">
              <Checkbox id="terms" className="w-8 h-8 mt-0.5" />
              <label
                htmlFor="terms"
                className="[font-family:'Poppins',Helvetica] font-normal text-[21.3px] leading-normal cursor-pointer"
              >
                <span className="text-[#333333]">
                  By creating an account, I agree to our{" "}
                </span>
                <span className="text-[#111111] underline">Terms of use</span>
                <span className="text-[#333333]"> and </span>
                <span className="text-[#111111] underline">Privacy Policy</span>
              </label>
            </div>

            <div className="flex items-start gap-[10.67px] py-[10.67px]">
              <Checkbox id="marketing" className="w-8 h-8 mt-0.5" />
              <label
                htmlFor="marketing"
                className="[font-family:'Poppins',Helvetica] font-normal text-[#333333] text-[21.3px] leading-normal cursor-pointer"
              >
                By creating an account, I am also consenting to receive SMS
                messages and emails, including product new feature updates,
                events, and marketing promotions.
              </label>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <form onSubmit={handleSignUp} className="flex items-center gap-8">
              {error && <div className="text-red-600 mr-4">{error}</div>}
              <Button
                type="submit"
                disabled={loading || !email || !password || !firstName}
                className={`h-[85.33px] px-[56px] bg-[#111111] rounded-[53.33px] hover:opacity-90 [font-family:'Poppins',Helvetica] font-medium text-white text-[29.3px] leading-normal ${loading || !email || !password || !firstName ? 'opacity-50' : ''}`}
              >
                <span className="[font-family:'Poppins',Helvetica] font-medium text-white text-[29.3px] leading-normal">
                  {loading ? 'Signing up...' : 'Sign up'}
                </span>
              </Button>
            </form>

            <p className="[font-family:'Poppins',Helvetica] font-normal text-base leading-normal">
              <span className="text-[#333333]">Already have an account? </span>
              <button className="text-[#111111] underline transition-opacity hover:opacity-80">
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
