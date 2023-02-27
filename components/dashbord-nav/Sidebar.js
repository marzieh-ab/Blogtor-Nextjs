
import React from 'react'
import Link from 'next/link'

import { AiOutlineHome } from "react-icons/ai";
import { FaStackExchange } from "react-icons/fa";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { BiExit } from "react-icons/bi";
import  Cookies  from 'universal-cookie';
import { useRouter } from 'next/router'

import { useSelector , useDispatch } from 'react-redux';
import { setCurrent_user ,logOut} from '@/redux/userSlice';
const cookies = new Cookies();
const token = cookies.get("token");







const Sidebar=()=>{
  const router = useRouter();
  const dispatch = useDispatch();


  const logout = () =>{

    console.log("this is logout token")
    // cookies.remove(token, {path:'/'});
    dispatch(logOut());
    console.log(token,"token pakshode")
    window.location.assign('/')
 
    
  }
    return (
        <div  className='w-[100%] md:w-[20%]    h-screen  shadow-md  shadow-slate'>
          <div>
            <div className='w-[100%]  h-[200px] bg-[#f3f7f9] rounded-t-lg  flex  items-center justify-center p-5' >
              <img src="img/user.png" alt=""   className='w-[100px]  h-[100px] rounded-[50%] '/>
            </div>
            <div>
    
              <ul  className=''>
                <li  className="p-5 border-b-[1px]  border-[#ccc]  " >
                <Link href="/"  className='flex items-center  flex-row-reverse '>
                  <AiOutlineHome   className='ml-4  text-2xl '/>
              
                Home
              </Link>
    
                </li>
                <li  className="p-5 border-b-[1px]  border-[#ccc]" >
                <Link href="myblogs"  className='flex items-center flex-row-reverse '>
                  <FaStackExchange  className='ml-4  text-2xl '/>
    
                  Blogs
              
                
              </Link>
    
                </li>
    
                <li  className="p-5 border-b-[1px]  border-[#ccc]" >
                <Link href="createblog"  className='flex items-center  flex-row-reverse '>
                  <BsFillPlusSquareFill  className='ml-4  text-2xl '/>
    
                  createblog
              
                
              </Link>
    
                </li>
    
               
    
                <li  className="p-5 border-b-[1px]  border-[#ccc]" >
                <Link href="editprofile"  className='flex items-center flex-row-reverse '>
                  <ImProfile   className='ml-4 text-2xl '/>
    
                  Editprofile
              
                
              </Link>
    
                </li>
    
                <li  className="p-5 border-b-[1px]  border-[#ccc]" >
                <p    className='flex items-center flex-row-reverse  cursor-pointer'>
                  <BiExit  className='ml-4 text-2xl '   onClick={logout}  />
                
    
                  Exit
              
                
              </p>
    
                </li>
              </ul>
    
    
            </div>
          </div>
    
        </div>
      )
}

export default Sidebar