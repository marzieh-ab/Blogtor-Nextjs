import axios from 'axios'
import { FC } from 'react'
import AllBlogsCom from "../../components/allblogs/AllBlogs"
import Header from './../../components/Header/Header';
import { writers  as writersblog} from './../alluser/index';

// export type blogs={
// data:{

//   _id: string,
//     title: string,
//     content:string,
//     creatorId: string,
//     imgurl: string,
//     averageScore: number,
//     createdAt: string,
//     updatedAt: string,
//     creator: {
//       _id: string,
//       username: string,
//       name: string,
//       bio: string,
//       blogs: [],
//       avatar: string,
//       averageScore: number,
//       createdAt: string,
//       updatedAt: string
//     },
//     rateCount: number

// }[]

// }
export interface  writersblog {
  writers : {
  _id: string,
  username: string,
  name: string,
  bio: string,
  avatar: string,
  averageScore: number,
  createdAt: string,
  updatedAt: string
}[]
}

export interface blogs {
  data: {
    _id: string,
    title: string,
    content: string,
    creatorId: string,
    imgurl: string,
    averageScore: number,
    createdAt: string,
    updatedAt: string,
      creator?: writersblog ,
    rateCount: number
  }[]
}

const  AllBlogs:FC<blogs>=({data})=>{
  console.log(data,"allblogs")
  


    return(
      <>
        <Header/>
    
    <AllBlogsCom  data={data} />


      </>
   

    )
   

}

export default AllBlogs


export const getServerSideProps = async () => {
  
    const { data } = await axios("http://localhost:4000/blog");
  
   
  
    return {
      props: {
        data
      }
    }
}