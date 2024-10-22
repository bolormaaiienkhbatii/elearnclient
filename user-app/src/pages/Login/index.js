import React from 'react';
import Input from '../../components/Input';
import Layout from '../../components/Layout';
import { useNavigate,  } from 'react-router-dom';
import { useState } from 'react';
import constant from '../../constant';
import {useSelector, useDispatch} from 'react-redux'
import allActions from '../../actions';
import { useQuery } from '../../utils';
const Login=()=>{
    const dispatch = useDispatch();
    const query = useQuery();
    const [password, setPassword]=useState('');
    const [email, setEmail]=useState('')
    const navigate=useNavigate()

    const login=async()=>{
        try{
            const body1 = {
                email:email,
                password:password
            }
            const result = await fetch(`${constant.serverUrl}/api/auth/signin`,{
                method:"POST",
                body: JSON.stringify(body1),
                headers:{
                    'Content-Type': 'application/json'
                },
                
            });
            let tt = await result.json()
            console.log("tt ", tt)
            if(tt.error==false){
                setPassword('')
                setEmail('')
                await localStorage.setItem("token", tt.data.token)
                dispatch(allActions.userActions.setUser(tt.data))
                dispatch(allActions.userActions.setToken(tt.data.token))
                console.log("ttafter  ", tt);
                // alert("successfuly registered")
                const reload = query.get("reload");
                if(reload){
                    navigate(reload)
                }else{
                    navigate("/")
                }
                
                
            }else{
                alert(tt.message)
                await localStorage.setItem("token", null)
                dispatch(allActions.userActions.setUser(null))
                dispatch(allActions.userActions.setToken(null))
            }
           

        }catch(e){
            console.log("login catch ", e)
            setPassword('')
            setEmail('')
            alert("error")
            await localStorage.setItem("token", null)
            dispatch(allActions.userActions.setUser(null))
            dispatch(allActions.userActions.setToken(null))

        }
    }
    console.log(query.get('reload1'))
    return(
        <Layout showFooter={false}>
            
        <div className='signup  grid grid-cols-12 max-h-full h-6/6  from-orange-400  to-pink-500 bg-gradient-to-tl' >
            <div className='col-span-12 h-screen md:h-fit py-10  md:col-span-8 md:col-start-3 lg:col-span-4 lg:col-start-5  bg-white shadow-md px-10 mt-0 md:mt-10 lg:mt-20 rounded-sm'>
                <div className='brand-name text-red-500 text-2xl'>
                    Domestika {query.get('reload2')}
                </div>
               
                <div className='mt-5'>
                    <Input value={email} onChange={(e)=>setEmail(e.target.value)} label={"email"} type="email" />
                </div>
                <div className='mt-5'>
                    <Input value={password} onChange={(e)=>setPassword(e.target.value)} label={"Password"}  type="password"/>
                </div>
                <div onClick={login} className=" bg-red-700 flex justify-center rounded-sm mt-10 text-white">
                    <p className='py-3 text-sm'>
                        Login
                    </p>
                    
                </div>
                <div className='flex items-center justify-end '>
                    <p className='text-sm font-light text-gray-400'>Don't have an account?</p>
                    <div className=' text-xs py-4 ml-3 text-gray-600 font-bold  cursor-pointer ' onClick={()=>navigate("/signup")}>Signup</div>
                </div>
            </div>
        </div>

        </Layout>
    )
}
export default Login;