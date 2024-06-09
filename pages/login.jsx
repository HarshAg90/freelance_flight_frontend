// src/LoginPage.js
import React from "react";
import Header from "@/src/components/Header";

function Login() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/images/loginBg.png')" }}
    >
      <Header variant={"login"} />
      <div className="bg-white bg-opacity-91 p-8 rounded-lg shadow-lg w-full max-w-md font-Poppins">
        <h2 className="text-2xl font-bold mb-6 text-center ">Login/Sign up</h2>
        <div className="flex flex-col space-y-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-600 focus:ring-2 focus:ring-blue-400">
            Sign in with Google
          </button>
          <hr className="border-gray-300" />
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-pink-500 w-full hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                type="button"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
        <div className="text-center mt-4">
          <a
            className="inline-block align-baseline font-bold text-sm text-pink-500 hover:text-pink-700"
            href="#"
          >
            {"Don't have an account? Sign up now"}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
