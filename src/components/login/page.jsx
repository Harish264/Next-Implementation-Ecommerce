"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthBoolean } from "@/redux/slices/authSlice";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/login", user);
      console.log("Login success", response.data);
      dispatch(setAuthBoolean(response.data.success));
      toast.success("Login success");
      router.push("/");
    } catch (error) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
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
        <h1 className="text-3xl font-bold">Sign In</h1>
        <div className="mt-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
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
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          onClick={onLogin}
          className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 mt-2"
        >
          {buttonDisabled ? "No LogIn" : "LogIn"}
        </button>
      </div>
    </div>
  );
};

export default Register;
