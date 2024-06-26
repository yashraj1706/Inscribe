import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo, BasicBtn, Input } from "../index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login as StoreLogin } from "../../store/authSlice";
import authServiceObj from "../../appwrite/auth";
import toast from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const { register, handleSubmit } = useForm(); //handle submit is a method in which we pass our own method in this case login, then we get the functionality(wee use it in onSubmit attribute in the form tag)

  const loginfn = async (data) => {
    seterror("");
    try {
      const session = await authServiceObj.login(data);
      await toast.promise(authServiceObj.login(data), {
        loading: "Signing In...",
        success: "Successefully Signed In",
        error: "Error signing in"
      })
      if (session) {
        console.log(session)
        const userData = await authServiceObj.getCurrentUser();
        if(userData) {
          dispatch(StoreLogin(userData));
          navigate("/");
        }  
        // link use nahi kara as link pr click karna padta, isse apne aap user chala jayega home par dont make the name same as handleSubmit
      }
    } catch (error) {
      seterror(error.message);
      toast.error("Error In Logging In:" +error.message)
    }
  };

  return (
    <div className="flex items-center  justify-center w-full">
      <div
        className={`mx-auto w-full  max-w-lg bg-black rounded-xl p-10 border  border-black/10 `}
      >
        <div className="mb02 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center tex-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-white/60">
          Don't have any account?
          <Link
            to="/signup"
            className="font-medium text-blue-500 transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500  mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(loginfn)} className="mt-8">
          <div className="space-y-2">
            <Input
              label="Email: "
              type="email"
              placeholder="Enter your email"
              //register ka yahi syntax hai, aise hi spread karke function call karte
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <BasicBtn type="submit" className="gradient-button w-full">
              Sign in
            </BasicBtn>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
