import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { setCurrent_user } from "../../redux/userSlice";
import type { RootState } from "../../redux/store";
import Link from "next/link";
import axios , { AxiosResponse } from 'axios';

import Cookies from "universal-cookie";
import Loading from './../Loading/Loading';
const cookies = new Cookies();

const token:string = cookies.get("token");

const Header = () => {
  const [nav, setNav] = useState(false);
  const [loading, setisLoading] = useState(true);

  const [current_user, setcurrent_user] = useState<any>();

  const dispatch = useDispatch();

  const thisUser = useSelector(
    (state: RootState) => state.current_user.current_user );

  console.log(thisUser, "thisuser");
  console.log(current_user,"curentuser")
  console.log(token,"token")



  const myaxios = async () => {
    
    console.log("###########################")
    console.log('###' , thisUser)
    if (thisUser) return setcurrent_user(thisUser)
    
    const res = await axios.post("http://localhost:4000/user/me", {}, {
      headers: {
        "auth": `ut ${token}`
      }
    });
    
    if (!res) return

    setcurrent_user(res.data)
    dispatch(setCurrent_user(res.data))
    setisLoading(false)
    
  }

  useEffect(() => {
    if (token != undefined) {
      myaxios
     
      ();
  
    } else {
      setisLoading(false);
    }
  }, []);


  const clickHandler = () => {
    setNav(!nav);
  };

  if (!thisUser && loading) return <Loading />

 

  return (
    <>
      <div className="p-3  md:shadow-md  ">
        <div className="container  mx-auto bg-white">
          <div className="flex items-center justify-between">
            <div className="text-2xl w-[40%]">
              <span className="text-[#e78429]  text-2xl">b</span>
              loger
            </div>
            <nav className="text-[#777]  w-[60%]  md:flex md:justify-end  hidden">
              <Link href="/alluser" className="mx-5 text-xl capitalize">
                Users
              </Link>
              <Link href="/allblogs" className="mx-5  text-xl capitalize">
                AllBlogs
              </Link>

              {thisUser ? (
               
                <Link href="/dashbord" className="mx-5  text-xl  capitalize  ">
                  {thisUser.username}
                </Link>
              ) : (
                <Link href="/login" className="mx-5  text-xl  capitalize">
                  Login/Singup
                </Link>
              )}
            </nav>

            <div
              onClick={clickHandler}
              className="md:hidden flex items-center justify-center  w-[40px]  h-[40px] rounded-[50%]  bg-[#eee]  hover:bg-[#e78429]   hover:text-white transition duration-200 relative  "
            >
              {nav ? (
                <AiOutlineClose className="text-xl" />
              ) : (
                <AiOutlineMenu className="text-xl" />
              )}
            </div>
          </div>
        </div>
      </div>

      <nav
        className={
          nav
            ? "text-[#777]   md:hidden  border-t-[1px] mt-4  block border-[#c6c6c6]  w-[100%] "
            : "hidden"
        }
      >
        <Link
          href="/allUsers"
          className="mx-5 text-base  block  rounded-lg border-[1px]  p-2 bg-[#f7f7f7]  w-[530px] border-[#c6c6c6]  mt-4"
        >
          Users
        </Link>
        <Link
          href="/allblogs"
          className="mx-5  text-base block  rounded-lg border-[1px]  p-2 bg-[#f7f7f7]  w-[530px] border-[#c6c6c6] my-2"
        >
          AllBlogs
        </Link>

        {thisUser ? (
          <Link
            href="dashboard"
            className="mx-5  text-base   block  rounded-lg border-[1px]  p-2 bg-[#f7f7f7]  w-[530px] border-[#c6c6c6]"
          >
            {thisUser.username}
          </Link>
        ) : (
          <Link
            href="/"
            className="mx-5  text-base   block  rounded-lg border-[1px]  p-2 bg-[#f7f7f7]  w-[530px] border-[#c6c6c6]"
          >
            Login/Singup
          </Link>
        )}
      </nav>
    </>
  );
};

export default Header;
