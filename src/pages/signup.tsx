import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { authService } from "../../services/auth/authService";
import { useDispatch } from "react-redux";
import { setAuthState } from "../store/authSlice";
import {Toast} from "../../services/notification/toast"
import { useNotification } from "use-toast-notification";
import React from 'react'

function SignUp() {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [image, setImage] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const notification = useNotification();

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if(e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      }
      reader.readAsDataURL(file);
    }

    console.log(image);
  }

  async function onSubmit(e: any) {
    e.preventDefault();
    const responseData = await authService.signUp({name: name, email: email, password: password, image: image})
    if(responseData) {
      dispatch(setAuthState(true))
      Toast.notifySuccess(notification, "SignUp Sucess!", "You have created an account!")
      router.push("/")
    } else {
      Toast.notifyError(notification, "SignUp Error!", "You need to inform all requested data!")
      console.log("ERRO NO SIGNUP")
    }
  }

  return(
    <div className="grid grid-cols-12">
      <div className="lg:col-span-5 col-span-12 text-white font-sans font-bold bg-white min-h-screen pl-7">
        <div className="grid grid-rows-6 grid-flow-col min-h-screen items-center justify-items-center">
          <div className="row-span-4 row-start-2 text-4xl text-black">
            Sign Up

            <div className="pt-10 pr-20">
              <label className="text-sm font-sans font-medium">Name</label>
              <input
                type="text"
                name="username"
                placeholder="Write your name"
                className="w-full bg-white py-3 px-12 border hover: border-gray-400 rounded shadow text-base font-sans"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="pt-2 pr-20">
              <label className="text-sm font-sans font-medium">Email</label>
              <input
                type="text"
                name="email"
                placeholder="Write your email"
                className="w-full bg-white py-3 px-12 border hover: border-gray-400 rounded shadow text-base font-sans"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="pt-2 pr-20">
              <label className="text-sm font-sans font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Write your password"
                className=" w-full bg-white py-3 px-12 border hover: border-gray-500 rounded shadow text-base font-sans"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="pt-2 pr-20">
              <label className="text-sm font-sans font-medium">Image</label>
              <input
                type="file"
                name="image"
                className=" w-full bg-white py-3 px-12 border hover: border-gray-500 rounded shadow text-base font-sans"
                onChange={(e) => handleFileChange(e)}
              />
            </div>

            <div className="text-sm font-sans font-medium w-full pr-20 pt-14">
              <button
                type="button"
                className="text-center w-full py-4 bg-blue-700 hover:bg-blue-400 rounded-md text-white"
                onClick={(e) => onSubmit(e)}
              >
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-7 text-white font-sans font-bold bg-cover bg-[url('https://cdn.dribbble.com/users/22815/screenshots/14343442/media/c2a2d9926b0de3f8077e80ed7cb04c96.jpg')]"></div>

    </div>
  )
  
}

export default SignUp;
