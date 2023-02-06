import { useRouter } from "next/router";
import { useState } from "react";
import { authService } from "services/auth/authService.js";
import { useDispatch } from "react-redux";
import { setAuthState } from "@/store/authSlice";
import {Toast} from "../../services/notification/toast"
import { useNotification } from "use-toast-notification";
import Link from "next/link";
import { useLocalStorage } from "../../services/localStorage/user.js";
import { tokenService } from "services/auth/tokenService";
import { setUserData } from "@/store/userSlice";

function Login() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const router = useRouter();
  const dispatch = useDispatch();
  const notification = useNotification();
  const [user, setUser] = useLocalStorage("user", {});

  async function onSubmit(e: any) {
    e.preventDefault();
    const responseData = await authService.login({email: email, password: password})
    if(responseData) {
      dispatch(setAuthState(true))
      dispatch(setUserData(responseData))
      
      await setUser(responseData);

      router.push("/")
    } else {
      Toast.notifyError(notification, "Login Error!", "Your credentials are wrong")
      console.log("ERRO NO LOGIN")
    }
  }

  return(
    <div className="grid grid-cols-12">
        <div className="lg:col-span-5 col-span-12 text-white font-sans font-bold bg-white min-h-screen pl-7">
          <div className="grid grid-rows-6 grid-flow-col min-h-screen items-center justify-items-center">
            <div className="row-span-4 row-start-2 text-4xl text-black">
              Sign In
              <div className="pt-10 pr-20">
                <label className="text-sm font-sans font-medium">Email</label>
                <input
                  type="text"
                  name="username"
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
                <a
                  href=""
                  className="text-sm font-sans font-medium text-gray-600 underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="text-sm font-sans font-medium w-full pr-20 pt-14">
                <Link href="/"><button
                  type="button"
                  className="text-center w-full py-4 bg-blue-700 hover:bg-blue-400 rounded-md text-white"
                  onClick={(e) => onSubmit(e)}
                >
                  SIGN IN
                </button></Link>
              </div>
              <div className="mt-4">
                <Link href="/signup"><p
                  className="text-sm font-sans font-medium text-gray-600 underline"
                >
                  Don´t have an account? Sign up
                </p></Link>
              </div>
              
            </div>

          </div>
        </div>

        <div className="lg:col-span-7 text-white font-sans font-bold bg-cover bg-[url('https://cdn.dribbble.com/users/22815/screenshots/14343442/media/c2a2d9926b0de3f8077e80ed7cb04c96.jpg')]"></div>
      </div>
  )
  
}

export default Login;
