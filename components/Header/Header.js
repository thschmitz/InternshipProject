import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Image from 'next/image';
import { selectAuthState } from "../../src/store/authSlice";
import { useSelector } from "react-redux";
import Logo from "../../public/Logo.png"
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";

export const Header = (props) => {
  const [barsOpen, setBarsOpen] = useState(false);
  const authState = useSelector(selectAuthState)
  const [search, setSearch] = useState(props.searchText);

  useEffect(() => {
    if(props.searchText) {
      setSearch(props.searchText)
    }
    console.log("AUTHSTATE HEADER: ", authState)
  }, [])

  if(barsOpen === true) {
    return (
      <div className="text-center flex h-screen justify-center items-center flex-col overflow-hidden">
        <div className="flex flex-col">
          <p className="navResponsiveButtonClose" onClick={() => setBarsOpen(false)}><MdClose size={25}/></p>
        </div>

        <button className="navResponsiveButton">Quem Somos</button>
        <button className="navResponsiveButton">Contato</button>
        <button className="navResponsiveButton">Servicos</button>
      </div>
    )
  }

  return (
    <div className="sticky flex justify-between top-0 z-100 bg-white px-4 py-5 shadow-sm items-center ">
      <div className="relative h-13 w-13 flex-shrink-0 cursor-pointer">
        <Link href="/"><Image src={Logo} width={150} height={150} alt="RealStateLogo" /></Link>
      </div>

      <div onClick={() => setBarsOpen(true)} className="xl:hidden lg:hidden flex w-10 cursor-pointer">
        <FaBars size={25}/>
      </div>

      <div className="lg:flex xl:flex hidden">
        <button className="navButton">Quem Somos</button>
        <button className="navButton">Contato</button>
        <button className="navButton">Servicos</button>
      </div>
    </div>
  )
}
