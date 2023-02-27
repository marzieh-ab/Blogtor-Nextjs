import axios from 'axios';
import SingleBlog from '../../components/singleblog/SingleBlog';
import { FC } from 'react'
import Header from '@/components/Header/Header';
export interface blogs{
  data:{
  
    _id: string,
      title: string,
      content:string,
      creatorId: string,
      imgurl: string,
      averageScore: number,
      createdAt: string,
      updatedAt: string,
      creator: {
        _id: string,
        username: string,
        name: string,
        bio: string,
        blogs: [],
        avatar: string,
        averageScore: number,
        createdAt: string,
        updatedAt: string
      },
      rateCount: number
  
  }[]
}

interface context{
  params: {
    id: string
  },
  locales: undefined,
  locale: undefined,
  defaultLocale: undefined
}


// export interface blogs {
//   data: {
//     _id: string,
//     title: string,
//     content: string,
//     creatorId: string,
//     imgurl: string,
//     averageScore: number,
//     createdAt: string,
//     updatedAt: string,
//     // creator: writer,
//     rateCount: number
//   }[]
// }

const Blog:FC<blogs>=({data})=>{
   

    return  <SingleBlog  data={data}/>
  
   


      
    
  

}

export default Blog


 export const getStaticPaths = async() => {
  
    const {data}:blogs  = await axios("http://localhost:4000/blog");
    
     const ids = data.map(blog => {
      return {
        params: {
          id: blog._id
        }
      }
    })
    
//     console.log(ids)
  
    return {
      paths: ids,
      fallback: false
    }
   }

   export const getStaticProps = async (context:context) => {
    console.log(context)
    const id = context.params.id;
    const { data }: blogs = await axios("http://localhost:4000/blog");
    const singleBlogs = data.find(blog => blog._id == id)
  
    console.log(singleBlogs,"single")
  
    const res = await axios(`http://localhost:4000/comment/by-blog/${context.params.id}`);
  
    console.log(res.data)
  
    return {
      props: {
        data: singleBlogs,
    
      }
    }
  }