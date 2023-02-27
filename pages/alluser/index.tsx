
import axios from 'axios'
import { FC } from 'react'
import AllUserCom from "../../components/allusers/AllUsers"
import  Header  from '../../components/Header/Header';

export interface writers {
    data : {
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


const AllUser:FC<writers>=({data})=>{
    return(
    
        <>
        <Header/>
        <AllUserCom  data={data}/>
      </>
    )
   
    
   

}

export default AllUser

export const getStaticProps = async () => {
  
    const { data } = await axios("http://localhost:4000/user/");
  
    console.log(data)
  
    return {
      props: {
        data
      }
    }
  
  }