import axios from 'axios'
import { FC } from 'react'
import SingleUserCom  from "../../components/singleuser/SingleUser"
import Header  from "../../components/Header/Header"


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
  
  interface context{
    params: {
      id: string
    },
    locales: undefined,
    locale: undefined,
    defaultLocale: undefined
  }


const SingleUser:FC<writer>=({data})=>{
    return (
    <>
    <Header/>
     <SingleUserCom  data={data}/>
    
    </>
    )
    
   
}

export default SingleUser

export const getStaticPaths = async() => {
  
    const { data }: writer = await axios("http://localhost:4000/user/");
    // console.log(data)
    const ids = data.map(item => {
      return {
        params: {
          id: item._id
        }
      }
    })
  
    console.log(ids)
  
    return {
      paths: ids,
      fallback: false
    }
  }

  export const getStaticProps = async (context: context) => {
    console.log(context)
    const id = context.params.id;
    const { data }: writer = await axios("http://localhost:4000/user/");
    const singleWriter = data.find(writer => writer._id == id)
    console.log(singleWriter)
  
   
  
   
  
    return {
      props: {
        data: singleWriter,
      
      }
    }
  }