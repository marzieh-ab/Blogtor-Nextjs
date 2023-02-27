import React,{useState} from 'react'
import Cookies from 'universal-cookie'
import axios  from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSelector , useDispatch } from 'react-redux';
import { setCurrent_user } from '@/redux/userSlice';
import Loading from './../Loading/Loading';


const  Login=()=> {

  const[username, setUsername]= useState<string>('')
  const[password, setPassword]= useState<string>('')
  const [loading, setLoading] = useState<boolean>(false);

  const cookies = new Cookies();
 
  const router = useRouter();
  const dispatch = useDispatch();
  const token:string = cookies.get("token");
  console.log(token)

  const loginUser=async()=>{
    if(!username || !password) return alert("please fill all sections")

    const res = await axios.post("http://localhost:4000/user/login", {
      username,
      password
    }).catch(error => {
      console.log(error.response.data.msg)
      // window.location.assign('http://localhost:3000/login_signup')
      return alert(`${error.response.data.msg}`)
    })

    console.log(res,"reslogin")

    if(!res) return

    // console.log(res.data.token,"token login")
   

    
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
       
          // setLoading(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });


        window.location.assign('/')

      


    

    }
    else{
      if(res.data.msg=="bad request: no such user exists"){
        return alert("plese register")
      }else if(res.data.msg="password doesnt match"){
        return alert("passwor wrong")
  
      }else{
        return alert("password doesnt match")
      }
  
    }




  }

  if(loading){
     return <Loading />
  }

  return (

    <div  className="h-screen bg-[#7fbc5d]  w-scrren  flex items-center justify-center">

           

    <div className='bg-white  w-[360px]  h-[300px]  p-10  text-center' >

        <input type="text"   value={username}   onChange={(e)=>setUsername(e.target.value)} placeholder='username' className='  bg-[#f2f2f2]  mb-5 p-2  w-[275px] outline-none'/>
        <input type="password"   value={password}   onChange={(e)=>setPassword(e.target.value)} placeholder='password' className='  bg-[#f2f2f2]  mb-5  p-2 w-[275px]  outline-none' />
        <button  className='  bg-[#7ebc5c]  text-white p-2  w-[275px]'   onClick={loginUser}>Login</button>

        <p  className='mt-4  text-[#b3b3b3] text-[12px] '>Not registered?
{/* 
        <a href=""  className='text-[#4CAF50]'> Create an account</a> */}
          <Link href='/singin'  className='text-[#4CAF50]'> Create an account</Link>
        
        </p>
    </div>
    
    
</div>
   
  )
 
}

export default Login