import React from 'react';
import './style.css';
import Input from '../../components/Input';
import Layout from '../../components/Layout';
import { useState } from 'react';
import constant from '../../constant';
import { useNavigate } from 'react-router-dom';
const Signup=()=>{
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [email, setEmail]=useState('')
    const navigate=useNavigate()

    const signup=async()=>{
        try{
            const body1 = {
                username:username,
                email:email,
                password:password
            }
            const result = await fetch(`${constant.serverUrl}/api/auth/signup`,{
                method:"POST",
                body: JSON.stringify(body1),
                headers:{
                    'Content-Type': 'application/json'
                },
                
            });
            let tt = await result.json()
            if(tt.error==false){
                setUsername('')
                setPassword('')
                setEmail('')
                console.log("tt ", tt);
                alert("successfuly registered")
                navigate("/login")
            }else{
                alert(tt.message)
            }
           

        }catch(e){
            setUsername('')
            setPassword('')
            setEmail('')
            alert("error")

        }
    }
    return(
        <Layout showFooter={false}>
            
        <div className='signup  grid grid-cols-12 max-h-full h-6/6 bg-gradient-to-r from-purple-500 to-pink-500'>
            <div className='col-span-12 h-screen md:h-fit py-10  md:col-span-8 md:col-start-3 lg:col-span-4 lg:col-start-5  bg-white shadow-md px-10 mt-0 md:mt-10 lg:mt-20 rounded-sm'>
                <div className='brand-name text-red-500 text-2xl'>
                    Domestika
                </div>
                <div className='mt-5'>
                    <Input value={username} onChange={(e)=>setUsername(e.target.value)} label={"Username"} placeholder="Jane" />
                </div>
                <div className='mt-5'>
                    <Input value={email} onChange={(e)=>setEmail(e.target.value)} label={"email"} type="email" />
                </div>
                <div className='mt-5'>
                    <Input value={password} onChange={(e)=>setPassword(e.target.value)} label={"Password"}  type="password"/>
                </div>
                <div  onClick={signup} className="cursor-pointer bg-red-700 flex justify-center rounded-sm mt-10 text-white">
                    <p className='py-3'>
                        Sign Up
                    </p>
                    
                </div>
                <div className='flex items-center justify-end '>
                    <p className='text-sm font-light text-gray-400'>Already registered?</p>
                    <div className=' text-xs py-4 ml-3 text-gray-600 font-bold  cursor-pointer ' onClick={()=>navigate("/login")}>login</div>
                </div>
            </div>
        </div>

        </Layout>
    )
}
export default Signup;