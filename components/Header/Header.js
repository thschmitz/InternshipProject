import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Image from 'next/image';
import { tokenService } from 'services/auth/tokenService';
import { selectAuthState, setAuthState } from "../../src/store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../../public/Logo.png"
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { AiOutlineArrowDown } from "react-icons/ai"
import { RiToolsFill } from "react-icons/ri"
import Popup from 'reactjs-popup';
import Skeleton from '@mui/material/Skeleton';
import { useNotification } from "use-toast-notification";
import { Toast } from 'services/notification/toast';
import { cleanUserData, selectUserData } from '../../src/store/userSlice';

export const Header = (props) => {
  const [barsOpen, setBarsOpen] = useState(false);
  const dispatch = useDispatch();
  const notification = useNotification();
  const authState = useSelector(selectAuthState)
  const [search, setSearch] = useState(props.searchText);
  const user = useSelector(selectUserData)

  useEffect(() => {
    if(props.searchText) {
      setSearch(props.searchText)
    }
    console.log("USER HEADER: ", user)
  }, [])


  function signOut(e) {
    e.preventDefault();

    dispatch(setAuthState(false))
    dispatch(cleanUserData())

    tokenService.delete(null);
    Toast.notifySuccess(notification, "Logout Sucess!", "You have logged out!")
    setBarsOpen(false);
  }

  function handleTyping(e) {
    e.preventDefault();
    setSearch(e?.target?.value);
  }

  if(barsOpen === true) {
    return (
      <div className="text-center flex h-screen justify-center items-center flex-col">
        <div>
          <p className="navResponsiveButtonClose" onClick={() => setBarsOpen(false)}><MdClose size={25}/></p>

        </div>
        <div className="flex flex-col">
          <p className="navResponsiveButton">Registre um apartamento</p>
          <Link href={`/profile/${user.id}`}><p className="navResponsiveButton">Conta</p></Link>
          {authState?
            <p className="navResponsiveButton" onClick={(e) => signOut(e)}>
              <div className="flex h-11 w-11 ml-6">
                <img className="rounded-full object-cover" src={user.image}/>
                <p className="ml-5 mt-2">Logout</p>
              </div>
            </p>

            :

            <Link href="/login"><p className="navResponsiveButton">Sign In</p></Link>

          }


        </div>
      </div>
      
    )
  }

  return (
    <div className="sticky flex justify-between top-0 z-100 bg-white px-4 py-5 shadow-sm items-center ">
      <div className="relative h-13 w-13 flex-shrink-0 cursor-pointer">
        <Link href="/"><Image src={Logo} width={150} height={150} alt="RealStateLogo" /></Link>
      </div>

      <form className="max-w-lg hidden md:flex lg:flex items-center border-gray-200 border rounded-3xl bg-gray-100 px-7 py-2 lg:ml-10">
        <input type="text" value={search} placeholder="Begin your search" onChange={(e) => handleTyping(e)} className="flex-1 bg-transparent outline-none" />
        <Link href={{pathname:`/search/${search}`}}>
            <button type="submit" hidden/>
        </Link>
        
        <div className="bg-red-400 rounded-full p-2 cursor-pointer"><RiToolsFill className="h-7 w-7 text-gray-100"/></div>
        
      </form>

      <div className="navButton">
        <p className="">Registre um apartamento</p>
      </div>
      <div className="navButton">
      </div>

      <div onClick={() => setBarsOpen(true)} className="xl:hidden lg:hidden flex w-10 cursor-pointer">
        <FaBars size={25}/>
      </div>

      {
        authState?
          <Popup
          trigger={
          <div className="navButton">
              <div className="flex h-11 w-11 -mr-2">
                {user.image?
                  <>
                    <img className="rounded-full object-cover" src={user.image}/>
                  </>
                
                :
                  <Skeleton variant="circular" width={40} height={40} />
                }
              </div>
              <AiOutlineArrowDown className="-ml-3"/>
          </div>}
          position="bottom center"
          nested
          className="bg-white"
          >
            <div className="navPopup">
              <Link href={`/profile/${user.id}`}><p className="navButtonAccount">Conta</p></Link>
              <p className="navButtonAccount">Salvos</p>
              <p className="navButtonAccount" onClick={(e) => signOut(e)}>Logout</p>
            </div>
          </Popup>
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
