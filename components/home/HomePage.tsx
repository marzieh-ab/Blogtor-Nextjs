import React from 'react'
import { top_blog_user } from '../../pages'
import { FC } from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import Link from 'next/link'

const HomePage:FC<top_blog_user>=({topUser , topBlog})=> {
    const FALLBACK_IMAGE ="data:image/jpeg;base64,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"
     const topblog="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKMM43IDqseBSgyJCxsbUzgpr-4P_KxCDcEg&usqp=CAU"



    const imageOnErrorHandler = (
        event: React.SyntheticEvent<HTMLImageElement, Event>
      ) => {
        event.currentTarget.src = FALLBACK_IMAGE;
       
      };

      const imageOnErrorHandlertopblog = (
        event: React.SyntheticEvent<HTMLImageElement, Event>
      ) => {
        event.currentTarget.src = topblog;
       
      };


  return (
    <div  className=" md:flex md: justify-between  bg-[#eeeeee]  p-8"  >

<div  className='md:w-[60%]  sm:w[100%] '>

<div  className='w-[100%] '> 
{topBlog.map((blog)=>{
  return(
      <div  className='w-[100%]  p-4  my-5 bg-[#fff]  border-[1px]  border-[#eee]  rounded-[5px]'>
      <div  className='w-[100%]  ' >
       <img src={blog.imgurl} alt=""  className='w-[300]  h-[300px]  object-fit' onError={imageOnErrorHandlertopblog}/>
      </div>
      <div  className='text-[#f4c062] text-xs  flex items-center '>
          <AiOutlineClockCircle  className='mr-2'/>
          {blog.createdAt.substr(0,10)}
        

      </div>
      <div  className='font-bold my-3'>{blog.title}</div>
      <div  className='font-light  text-[#777]' dangerouslySetInnerHTML={{ __html: blog.content }}></div>

   </div>

  )

 })}

</div>
 
</div> 
<div  className='md:w-[30%]  sm:w[100%] '>

<div  className=' rounded-[20px]   border-[1px ]  border-[#00000033]  shadow-md '>
    <div  className='text-center p-4  text-[#fff]  bg-[#333333] rounded-t-md' >Popular Users</div>
    <div  className='bg-[#fff]   '>
      {topUser.map((user)=>{
        return(
          <Link   href={`alluser/${user._id}`} className='ml-7  flex items-center mb-3'>

          <img src={user.avatar} alt=""    className='w-[50px] border-[2px]   border-[#e78429] h-[50px ]  rounded-[50%]  mt-2'      onError={imageOnErrorHandler}/>
          <p  className='ml-5  hover:text-[#e78429]   font-bold transition-all duration-200'>{user.username}</p>
          
          </Link>

        )

      })}
       

         
          
       
    </div>



</div>
</div>
          
          
        </div>
  )
}

export default HomePage