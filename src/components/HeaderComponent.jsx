import React from 'react'
import { MdEmail } from "react-icons/md";
import { FaCirclePlay } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";





function HeaderComponent({setToggleHeader}) {

    function handleCloseHeader() {
        setToggleHeader(false)

          
    
    }

  return (
    <div className='flex justify-between w-full mx-auto h-40px bg-black'>
      <div className='flex gap-10px ml-10'>
        <FaCirclePlay className='text-white mr-3' size={25}/>
        <p className='text-white '>MRK SLOGA DOBOJ HIMNA</p> 
      </div>
      
      <div className='flex  gap-30px'>
        <FaFacebook className='text-white mr-4' size={25}/>
        <FaSquareInstagram className='text-white' size={25}/>
      </div>


      <div className='flex  gap-10px '>
        {/* ikona maila */}
        <MdEmail className='text-white mr-3' size={25}/>
        <span className='text-white'>mrksloga@gmail.com</span>
      </div>

      <div>
        <p className='text-white'>SRP/EN</p>
      </div>

      
      <IoMdClose className='text-white' size={25} onClick={handleCloseHeader}/>
  

    </div>
  )
}

export default HeaderComponent

