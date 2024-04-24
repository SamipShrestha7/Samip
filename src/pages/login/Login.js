import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getSignupInfo } from "../../redux/action/signupInfoAction";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { register, handleSubmit } = useForm();
  const previousSignupData =
    JSON.parse(localStorage.getItem("signupInfo")) || [];

  function onSubmit(data) {
    let userInfo = previousSignupData.find(
      (item) =>
        (data.email === item.email || data.email == item.trafficNumber) &&
        data.password === item.password
    );
    if (userInfo) {
      dispatch(getSignupInfo(userInfo));
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      navigate("/dashboard");
      window.location.reload(true);
    } else {
      alert("invalid credential :(");
    }
  }

  useEffect(() => {
    userInfo && navigate("/dashboard");
  }, []);

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-gray-800">
            LOGIN
          </h1>
          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <label
                for="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email/Traffic ID
              </label>
              <input
                {...register("email")}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                for="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <a href="#" className="text-xs text-purple-600 hover:underline">
              Forget Password?
            </a>
            <div className="mt-6 ">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform  rounded-md bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-purple-600"
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Don't have an account?{" "}
            <a
              href="./signup"
              className="font-medium text-purple-600 hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
