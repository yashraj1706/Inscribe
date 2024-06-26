import React,{useState} from 'react'
import authServiceObj from '../../appwrite/auth'
import { Link,useNavigate } from 'react-router-dom'
import {Logo,Input, BasicBtn} from '../index'
import { login as StoreLogin } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'



function SignUp() {
    const [error,setError]=useState("")
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const signUp=async (data)=>{
        setError("")
        try {
            const usersession= authServiceObj.createAccount(data);
            await toast.promise(usersession, {
                loading: "Signing In...",
                success: "Successfully Signed In",
                error: "Error signing up"
            })
            if(usersession) {
            const userdata=await authServiceObj.getCurrentUser();
            if(userdata) dispatch(StoreLogin(userdata))
            navigate("/")
            }
        }
        catch (error) {
            setError(error.message)
        }
    
    }
    const {register,handleSubmit}=useForm()
  return (
    <div className="flex items-center justify-center">
            <div className={`bg-black mx-auto w-full max-w-lg bg--100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-white/60">
                    Already have an account?
                    <Link
                        to="/login"
                        className="font-medium text-blue-500 transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(signUp)} className=''>
                    <div className='space-y-5 '>
                        <Input
                        label="Full name: "
                        placeholder="Enter full name..."
                        {...register("name",{
                            required:true
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter email..."
                        type='email'
                        {...register("email",{
                            required:true,
                            validate:{
                                matchPattern:(value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address" 
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        placeholder="Enter your password..."
                        type="password"
                        {...register("password",{
                            required:true
                        })}
                        />
                        <BasicBtn type='submit' className="gradient-button w-full ">
                            Create Account
                        </BasicBtn>
                    </div>
                </form>
            </div>
    </div>
  )
}

export default SignUp