"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const onEmailBlur = () => {
    if (!validEmail(user.email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };
  const onPasswordBlur = () => {
    if (!validPassword(user.password)) {
      setPasswordError(
        "Password must be at least 8 characters long and include at least one letter and one digit"
      );
    } else {
      setPasswordError("");
    }
  };

  const onSignup = async () => {
    try {
      const isEmailValid = validEmail(user.email);
      const isPasswordValid = validPassword(user.password);

      if (!isEmailValid(user.email)) {
        setEmailError("Invalid email format");
      } else {
        setEmailError("");
      }

      if (!isPasswordValid) {
        setPasswordError(
          "Password must be at least 8 characters long and include at least one letter and one digit"
        );
        setEmailError(""); // Clear email error if password is invalid
        return;
      }

      setLoading(true);
      const response = await axios.post("/api/register", user);
      console.log("Signup success", response.data);
      toast.success("SignUp successfully");
      router.push("/login");
    } catch (error) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex p-4">
      <div className="w-1/2">
        <img
          alt="Cover Image"
          className="object-cover w-full h-full"
          height="310"
          src={
            "https://cdn.dribbble.com/userupload/8516021/file/original-ddfcaf2b982ead4a252e971323601926.jpg?resize=752x"
          }
          style={{
            aspectRatio: "550/310",
            objectFit: "cover",
          }}
          width="550"
        />
      </div>
      <div className="w-1/2 bg-white p-6">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <div className="mt-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your username
          </label>
          <input
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mt-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
              setEmailError(""); // Clear email error on input change
            }}
            onBlur={onEmailBlur}
            placeholder="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>
        <div className="mt-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Password
          </label>
          <input
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
              setPasswordError(""); // Clear password error on input change
            }}
            onBlur={onPasswordBlur}
            placeholder="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>
        <button
          onClick={onSignup}
          className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 mt-2"
        >
          {buttonDisabled ? "No SignUp" : "SignUp"}
        </button>
        <p className="mt-6 text-center text-gray-700">
          Already a user?
          <Link className="text-black underline ml-2" href="/login">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
