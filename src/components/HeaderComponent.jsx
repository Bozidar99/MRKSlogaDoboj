import React, { useState } from 'react'
import { MdEmail } from "react-icons/md"
import { FaCirclePlay } from "react-icons/fa6"
import { FaFacebook } from "react-icons/fa"
import { FaSquareInstagram } from "react-icons/fa6"
import { IoMdClose } from "react-icons/io"

function HeaderComponent({ setToggleHeader }) {

  function handleCloseHeader() {
    setToggleHeader(false)
  }

  return (
    <div className='w-full bg-black px-4 py-2'>

      {/* DESKTOP */}
      <div className='hidden md:flex items-center justify-between'>

        {/* HIMNA */}
        <div className='flex items-center gap-2'>
          <FaCirclePlay className='text-white hover:text-red-500 cursor-pointer transition' size={22} />
          <p className='text-white text-sm'>MRK SLOGA DOBOJ HIMNA</p>
        </div>

        {/* DRUŠTVENE MREŽE */}
        <div className='flex items-center gap-3'>
          <FaFacebook className='text-white hover:text-red-500 cursor-pointer transition' size={22} />
          <FaSquareInstagram className='text-white hover:text-red-500 cursor-pointer transition' size={22} />
        </div>

        {/* EMAIL */}
        <div className='flex items-center gap-2'>
          <MdEmail className='text-white' size={22} />
          <span className='text-white text-sm'>mrksloga@gmail.com</span>
        </div>

        {/* JEZIK */}
        <p className='text-white text-sm cursor-pointer hover:text-red-500 transition'>SRP/EN</p>

        {/* CLOSE */}
        <IoMdClose
          className='text-white cursor-pointer hover:text-red-500 transition'
          size={22}
          onClick={handleCloseHeader}
        />

      </div>

      {/* MOBILNI */}
      <div className='flex md:hidden items-center justify-between'>

        {/* HIMNA + MREŽE */}
        <div className='flex items-center gap-3'>
          <FaCirclePlay className='text-white hover:text-red-500 cursor-pointer transition' size={20} />
          <FaFacebook className='text-white hover:text-red-500 cursor-pointer transition' size={20} />
          <FaSquareInstagram className='text-white hover:text-red-500 cursor-pointer transition' size={20} />
        </div>

        {/* EMAIL skraćen */}
        <span className='text-white text-xs'>mrksloga@gmail.com</span>

        {/* CLOSE */}
        <IoMdClose
          className='text-white cursor-pointer hover:text-red-500 transition'
          size={20}
          onClick={handleCloseHeader}
        />

      </div>

    </div>
  )
}

export default HeaderComponent

