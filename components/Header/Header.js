import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Image from 'next/image';
import { tokenService } from 'services/auth/tokenService';
import { selectAuthState } from "../../src/store/authSlice";
import { useSelector } from "react-redux";
import Logo from "../../public/Logo.png"
import {FaBars} from "react-icons/fa";
import {MdClose} from "react-icons/md";
import {AiOutlineArrowDown} from "react-icons/ai"

export const Header = ({userState}) => {
  const authState = useSelector(selectAuthState);
  const [barsOpen, setBarsOpen] = useState(false);

  function signOut() {
    tokenService.delete(null);
  }

  console.log("barsOpen: ", barsOpen)
  if(barsOpen === true) {
    return (
      <div className="text-center flex h-screen justify-center items-center flex-col">
        <div>
          <p className="navResponsiveButtonClose" onClick={() => setBarsOpen(false)}><MdClose size={25}/></p>

        </div>
        <div className="flex flex-col">
          <p className="navResponsiveButton">Registre um apartamento</p>
          <p className="navResponsiveButton">Carrinho</p>
          <p className="navResponsiveButton">Conta</p>
        </div>
      </div>
      
    )
  }

  return (
    <div className="sticky flex justify-between top-0 z-100 bg-white px-4 py-5 shadow-sm items-center ">
      <div className="relative h-13 w-13 flex-shrink-0 cursor-pointer">
        <Image src={Logo} width={150} height={150} alt="RealStateLogo" />
      </div>

      <div className="navButton">
        <p className="">Registre um apartamento</p>
      </div>
      <div className="navButton">
        <p className="">Carrinho</p>
      </div>

      <div onClick={() => setBarsOpen(true)} className="lg:hidden md:hidden flex w-10 cursor-pointer">
        <FaBars size={25}/>
      </div>

      {
          authState?
            <div onClick={() => signOut()} className="navButton">
                <div className="flex h-11 w-11 -mr-2">
                  <img className="rounded-full object-cover" src={userState.image} alt="imgProfile"/>
                </div>
                <AiOutlineArrowDown className="-ml-3"/>
            </div>
          : 
            <div className="navButton">
                <div>
                  <Link href="/login"><p className="text-black">Sign In</p></Link>
                </div>

            </div>
      }
    </div>
  )
}
