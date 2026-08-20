import React from 'react'
import { Link } from 'react-router-dom'
import { MdEmail } from "react-icons/md"
import { FaCirclePlay } from "react-icons/fa6"
import { FaFacebook } from "react-icons/fa"
import { FaSquareInstagram } from "react-icons/fa6"
import { IoMdClose } from "react-icons/io"

const HIMNA_URL = "https://www.youtube.com/watch?v=Hx_2SwkZxAA"

function HeaderComponent({ setToggleHeader }) {

  function handleCloseHeader() {
    setToggleHeader(false)
  }

  return (
    <div className='w-full bg-black px-4 py-2'>

      {/* DESKTOP */}
      <div className='hidden md:flex items-center justify-between'>

        {/* HIMNA */}
        <a href={HIMNA_URL} target="_blank" rel="noopener noreferrer" className='flex items-center gap-2'>
          <FaCirclePlay className='text-white hover:text-red-500 cursor-pointer transition' size={22} />
          <p className='text-white text-sm'>MRK SLOGA DOBOJ HIMNA</p>
        </a>

        {/* DRUŠTVENE MREŽE */}
        <div className='flex items-center gap-3'>
          <a href="https://www.facebook.com/rkslogadoboj/?locale=sr_RS" target="_blank" rel="noopener noreferrer">
            <FaFacebook className='text-white hover:text-red-500 cursor-pointer transition' size={22} />
          </a>
          <a href="https://www.instagram.com/mrk_sloga.doboj/" target="_blank" rel="noopener noreferrer">
            <FaSquareInstagram className='text-white hover:text-red-500 cursor-pointer transition' size={22} />
          </a>
        </div>

        {/* EMAIL */}
        <Link to="/contact" className='flex items-center gap-2'>
          <MdEmail className='text-white' size={22} />
          <span className='text-white text-sm hover:text-red-500 transition'>mrksloga@gmail.com</span>
        </Link>

        {/* JEZIK 
        <p className='text-white text-sm cursor-pointer hover:text-red-500 transition'>SRP/EN</p>*/}

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
          <a href={HIMNA_URL} target="_blank" rel="noopener noreferrer">
            <FaCirclePlay className='text-white hover:text-red-500 cursor-pointer transition' size={20} />
          </a>
          <a href="https://www.facebook.com/rkslogadoboj/?locale=sr_RS" target="_blank" rel="noopener noreferrer">
            <FaFacebook className='text-white hover:text-red-500 cursor-pointer transition' size={20} />
          </a>
          <a href="https://www.instagram.com/mrk_sloga.doboj/" target="_blank" rel="noopener noreferrer">
            <FaSquareInstagram className='text-white hover:text-red-500 cursor-pointer transition' size={20} />
          </a>
        </div>

        {/* EMAIL skraćen */}
        <Link to="/contact" className='text-white text-xs hover:text-red-500 transition'>mrksloga@gmail.com</Link>

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