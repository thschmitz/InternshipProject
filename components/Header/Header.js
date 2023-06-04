
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
  const userData = useSelector(selectUserData)
  
  useEffect(() => {
    if(props.searchText) {
      setSearch(props.searchText)
    }
  }, [])

  if(barsOpen === true) {
    return (
      <div className="text-center flex h-screen justify-center items-center flex-col overflow-hidden">
        <div className="flex flex-col">
          <p className="navResponsiveButtonClose" onClick={() => setBarsOpen(false)}><MdClose size={25}/></p>
        </div>

        <button className="navResponsiveButton">Quem Somos</button>
        <button className="navResponsiveButton">Contato</button>
        <button className="navResponsiveButton">Serviços</button>
      </div>
    )
  }

  function signOut(e) {
    e.preventDefault();

    dispatch(setAuthState(false))
    dispatch(cleanUserData())

    localStorage.clear();
    tokenService.delete(null);
    Toast.notifySuccess(notification, "Logout Sucess!", "You have logged out!")
    setBarsOpen(false);
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
        <button className="navButton">Serviços</button>
        {
        authState?
          <Popup
          trigger={
          <div className="navButton">
              <div className="flex h-11 w-11 -mr-2">
                {userData.image?
                  <>
                    <img className="rounded-full object-cover" src={userData.image}/>
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
              <Link href={`/profile/${userData.id}`}><p className="navButtonAccount">Conta</p></Link>
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
    </div>
  )
}
