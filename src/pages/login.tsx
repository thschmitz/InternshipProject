import { useRouter } from "next/router";
import { useState } from "react";
import {authService} from "services/auth/authService.js";

function Login() {
  
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const router = useRouter();

  async function onSubmit(e: any) {
    e.preventDefault();
    await authService.login({email: email, password: password})

    router.push("/")
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
                <button
                  type="button"
                  className="text-center w-full py-4 bg-blue-700 hover:bg-blue-400 rounded-md text-white"
                  onClick={(e) => onSubmit(e)}
                >
                  SIGN IN
                </button>
              </div>
              <div className="mt-4">
                <a
                  href=""
                  className="text-sm font-sans font-medium text-gray-600 underline"
                >
                  Don´t have an account? Sign up
                </a>
              </div>
              
            </div>

          </div>
        </div>

        <div className="lg:col-span-7 text-white font-sans font-bold bg-cover bg-[url('https://cdn.dribbble.com/users/22815/screenshots/14343442/media/c2a2d9926b0de3f8077e80ed7cb04c96.jpg')]"></div>
      </div>
  )
  
}

export default Login;
