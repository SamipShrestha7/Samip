import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useState } from "react";

export default function Signup() {
  // const notify = () => toast("Signup Success!");
  // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, errors } = useForm();
  const [role, setRole] = useState();

  const previousSignupData =
    JSON.parse(localStorage.getItem("signupInfo")) || [];

  function onSubmit(data) {
    if (data?.userName && data?.email && data?.role) {
      let signupInfo = [data, ...previousSignupData];
      localStorage.setItem("signupInfo", JSON.stringify(signupInfo));
      navigate("/");
      // notify();
    }
  }

  function handleRoleChange(e) {
    setValue("role", e.value);
    setRole(e.value);
  }

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h1 className="text-3xl mt-6 font-semibold text-center text-gray-800 underline">
              SIGNUP
            </h1>
          </a>
        </div>
        <div className="w-full p-6 mt-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  {...register("userName")}
                  type="name"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors?.userName && (
                  <span className="text-red-700">this is required field</span>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  {...register("email")}
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Role
              </label>
              <div className="flex flex-col items-start">
                <Select
                  options={[
                    { value: "TRAFFIC", label: "traffic" },
                    { value: "USER", label: "user" },
                  ]}
                  className="block w-full  mt-2 text-purple-700 focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={handleRoleChange}
                />
              </div>
            </div>
            {role === "TRAFFIC" && (
              <div className="mt-4">
                <label
                  htmlFor="tnumber"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Traffic Number
                </label>
                <div className="flex flex-col items-start">
                  <input
                    {...register("trafficNumber")}
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>
            )}
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  {...register("password")}
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
            <div className="flex items-center justify-end mt-4">
              <a
                className="text-sm text-gray-600 underline hover:text-gray-900"
                href="/"
              >
                Already registered?
              </a>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
