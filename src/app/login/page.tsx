"use client";

import Image from "next/image";
import logo from "../../../public/whiteLogo.webp";
import {
  AppShell,
  Button,
  Checkbox,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../../utils/axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// Form values interface
interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Login API response interface
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: {
      email: (value) => {
        if (!value) return "Email is required";
        if (!/^\S+@\S+$/.test(value)) return "Invalid email format";
        return null;
      },
      password: (value) => {
        if (!value) return "Password is required";
        if (value.length < 6)
          return "Password must be at least 6 characters";
        return null;
      },
    },
  });

  // Restore remembered email
  useEffect(() => {
    const savedEmail = localStorage.getItem("user_email");
    if (savedEmail) form.setFieldValue("email", savedEmail);
  }, []);

  const handleSubmit = async ({ email, password, rememberMe }: LoginFormValues) => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      const data = response.data;

      // Save tokens
      Cookies.set("access_token", data.accessToken, { expires: 7 });
      Cookies.set("refresh_token", data.refreshToken, { expires: 7 });

      // Save user info
      localStorage.setItem("user_data", JSON.stringify(data.user));

      if (rememberMe) {
        localStorage.setItem("user_email", email);
      } else {
        localStorage.removeItem("user_email");
      }

      // Redirect after login
    // Redirect after login
const redirectTo =
  localStorage.getItem("redirect_after_login") || "/dashboard/dashboard";

localStorage.removeItem("redirect_after_login");
router.push(redirectTo);

    } catch (error) {
      console.error("Login error:", error);
      form.setFieldError(
        "email",
        "Something went wrong. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppShell className="flex w-screen min-h-screen">
      {/* Left Panel */}
      <AppShell
        className="w-full min-h-screen p-12 lg:flex flex-col justify-between items-start hidden"
        style={{ backgroundColor: "#21749e", color: "white" }}
      >
        <Image src={logo.src} alt="logo" width={120} height={60} />
        <div>
          <Text style={{ fontWeight: 700, fontSize: "3.75rem" }}>Welcome Back!</Text>
          <Text style={{ fontWeight: 500, fontSize: "1.2rem" }}>
            You can sign in to access your Chat <br /> account and messages.
          </Text>
        </div>
        <div>
          <Text style={{ fontWeight: 600, fontSize: "16px" }}>Fast and Secure Messaging</Text>
          <Text style={{ fontWeight: 400, fontSize: "14px" }}>
            www.eliteslogistics.com | 9851320192 | 9851340983
          </Text>
        </div>
      </AppShell>

      {/* Right Panel - Login Form */}
      <AppShell className="w-full min-h-screen flex justify-center items-center flex-col p-12 gap-3">
        <Flex className="flex flex-col items-center gap-4.5">
          <Text style={{ fontWeight: 700, fontSize: "48px" }}>Welcome Back</Text>
          <Text style={{ fontWeight: 400, fontSize: "16px" }} c={"#6c757d"}>
            Please enter your details to access your account
          </Text>
        </Flex>

        <form
          className="flex flex-col gap-7 lg:w-[50%] md:w-[70%] sm:w-full"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <TextInput
            size="md"
            label="Email"
            placeholder="Enter Your Email"
            {...form.getInputProps("email")}
            style={{ backgroundColor: "transparent" }}
          />

          <PasswordInput
            size="md"
            label="Password"
            placeholder="Enter Your Password"
            {...form.getInputProps("password")}
            style={{ backgroundColor: "transparent" }}
          />

          <Flex className="flex justify-between items-center">
            <Checkbox
              fw={500}
              label="Remember Me"
              {...form.getInputProps("rememberMe", { type: "checkbox" })}
            />
            <Text
              style={{ fontWeight: 500, fontSize: "14px", cursor: "pointer" }}
              c={"#21749e"}
              fw={400}
              onClick={() => console.log("Forgot password clicked")}
            >
              Forgot Password?
            </Text>
          </Flex>

          <Button
            type="submit"
            loading={isLoading}
            style={{
              backgroundColor: "#21749e",
              color: "white",
              padding: "12px 20px",
              borderRadius: "8px",
              height: "48px",
            }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <Flex className="items-center justify-center gap-2 mt-2">
            <Text fw={400}>Don't have an account?</Text>
            <Text
              c={"#21749e"}
              fw={500}
              style={{ cursor: "pointer" }}
              onClick={() => console.log("Sign up clicked")}
            >
              Sign up here
            </Text>
          </Flex>
        </form>
      </AppShell>
    </AppShell>
  );
}
