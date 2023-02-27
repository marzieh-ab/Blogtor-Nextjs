import React ,{useState}from 'react'
import Cookies from 'universal-cookie'
import axios  from 'axios'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from "react-redux"
import { setCurrent_user } from "../../redux/userSlice"

const cookies = new Cookies();



const  Singin=()=> {

    const [username,setUsername]=useState<string>('')
    const [name,setName]=useState<string>('')
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();
    const token:string = cookies.get("token");

   


    const registerNewUser= async()=>{
        console.log("ok")

        if (!username || !name) return alert("please fill all sections");
        const res = await axios.post("http://localhost:4000/user/signup", {
          username,
          name
        }).catch(error => {
          console.log(error.response.data.msg)
       
          return alert(`${error.response.data.msg}`)
        })

      
        if(!res) return

        if(res.data.token){
          cookies.set('token',res.data.token,{path: '/'})
          fetch("http://localhost:4000/user/me", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              auth: `ut ${token}`,
            },
            body: "{}",
          })
            .then((response) => response.json())
            .then((data) => {
             
              
    
              console.log(data, "dataaaaa");
              dispatch(setCurrent_user(data));
           
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error:", error);
            });


          router.push('/')


        

        }else{
          if(res.data.msg=="this username already exists in the database"){
              return alert("this username already exists in the database")

          }else{
              return alert("complete all input")
          }
        




      


    }
  
  }



  return (
    <div  className="h-screen bg-[#7fbc5d]  w-scrren  flex items-center justify-center">

           

    <div className='bg-white  w-[360px]  h-[300px]  p-10  text-center' >

        <input   type="text"   value={name}     onChange={(e) => setName(e.target.value)} placeholder='username' className='  bg-[#f2f2f2]  mb-5 p-2  w-[275px] outline-none'/>
        <input   type="text"  value={username}      onChange={(e) => setUsername(e.target.value)} placeholder='name' className='  bg-[#f2f2f2]  mb-5  p-2 w-[275px]  outline-none' />
        <button  className='  bg-[#7ebc5c]  text-white p-2  w-[275px]'  onClick={registerNewUser}>singup</button>
    </div>
    
    
</div>
  )
}

export default Singin