import React,{useState,useEffect} from 'react'
import { FC } from 'react'
import Loading from "../../components/Loading/Loading"
import StarRatings from 'react-star-ratings'
import Link from 'next/link'

const FALLBACK_IMAGE =
  // "https://www.kindacode.com/wp-content/uploads/2021/08/oops.png"
 "data:image/jpeg;base64,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"


export interface writer { 
  data: {
    _id: string,
    username: string,
    name: string,
    bio: string,
    avatar: string,
    averageScore: number,
    createdAt: string,
    updatedAt: string
  },
  userBlogs: {
    _id: string,
    title: string,
    content: string,
    creatorId: string,
    imgurl: string,
    averageScore: number,
    createdAt: string,
    updatedAt: string,
    rateCount: number
  }[]
}

const SingleUser:FC<writer>=({data}) =>{
  const[user,setUser]=useState('')
    const [userBlogs, setUserBlogs]=useState('')
    const[loading,setLoading]=useState(true)
   


    const fetchBlogByUser=()=>{
      fetch('http://localhost:4000/blog/by-user',{
        method:"POST",
        headers: { "Content-Type": "application/json" },
         body:  JSON.stringify({_id:data._id }) 

      }).then(res=>res.json())
      .then(data=>{
        setUserBlogs(data)
        setLoading(false)

      }).catch(error=>{
        console.log(error)

      })
    }


    useEffect(() => {
        fetch(`http://localhost:4000/user/singleUser/${data._id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data);
            fetchBlogByUser()

  
            setLoading(false)
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }, []);

      const imageOnErrorHandler = (
        event: React.SyntheticEvent<HTMLImageElement, Event>
      ) => {
        event.currentTarget.src = FALLBACK_IMAGE;
       
      };

      if(loading){
        return (<Loading/>)
      }





  return (
    <div>
        <div  className="border-[1px]  rounded-sm  pl-20 mb-5">
            <div  className="my-2">
                <img src={data.avatar} alt=""      onError={imageOnErrorHandler} className='border-[1px]  rounded-[50%]  w-[200px]  h-[200px]'/>

            </div>
            <p  className='my-2 mx-10'>{data.name}</p>
            <p  className='my-2  mx-10'>{data.username}</p>
            <p  className='my-2  mx-10'>joinat:{data.createdAt}</p>
          
           <div  className='my-2  mx-10'>  
           <StarRatings
          rating={data.averageScore}
          starRatedColor="yellow"
          numberOfStars={5}
           starDimension="20px"
          starSpacing="5px"
          name='rating'
          />


           </div>

      <div className='flex space-x-2    my-2  mx-10 '>
            <h2 className='text-xl'>{data.bio}</h2>
            </div>
           


        </div>
        <div>
            <h1  className='text-center  text-2xl'>{data.name}'s Blogs:</h1>
            <div  className=' p-2 md:flex  md:items-center md:justify-between md:w-[600px] mx-auto mt-5  gap-2 '>
              {  userBlogs=='' ?<div className='text-black font-bold opacity-30 text-5xl'>No blog</div>
              :
              userBlogs.map((blog)=>{
                console.log(blog)
                
                return(
                  <Link   href={`/singleblog/${blog._id}`} className='flex flex-col justify-center items-center    mt-4  w-full md:w-[30%]  border-[1px]  rounded-sm'>
                     <div className="flex  items-center   justify-center  w[30%]  h-[30%]">
                  <img  

                  className=" w[30%]  h-[30%]"
                    src={blog.imgurl}
                    
                    className=" w-[70%]  h-[160px]  object-cover"
                    alt=""
                    onError={imageOnErrorHandler}
                  />
                </div>
                <div className="mt-2">
                  <h1 className="text-center">{blog.title}</h1>
                </div>


                  </Link>
                )

              })}
              
               

            </div>

        </div>


    </div>
  )
}

export default SingleUser