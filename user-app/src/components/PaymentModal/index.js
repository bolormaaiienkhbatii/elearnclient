import React from 'react';
import { formatPrice, tugrugSymbol } from '../../utils';
import constant from '../../constant';
import { useNavigate,  } from 'react-router-dom';
import {useSelector}  from 'react-redux'
import {ReactComponent as EnrollIcon} from '../../icons/enroll.svg';
import {ReactComponent as XIcon} from '../../icons/x.svg'
const PaymentModal = ({onClose=()=>{}, course=null}) => {
    const navigate=useNavigate()
    const currentUser = useSelector(state=>state.currentUser)
    const onClickPayed=async()=>{
        console.log("current user ", currentUser)
        const token = await localStorage.getItem("token")
        const header = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`,
        }
        const response = await fetch(`${constant.serverUrl}/api/course/enroll/${course._id}`,{
            method:"GET",
            headers:header
        })
        const result = await response.json()
        
        console.log("result ", result)
        navigate(`/watch/${course?._id}`);
        onClose()
        
        // if(currentUser.user==null||currentUser.user==undefined){
        //     return;
        // }
        // const body={
        //     course:course._id,
        //     user:currentUser.user?.id
        // }
        // const token = await localStorage.getItem("token")
        // console.log("token ", token)
        // try{
        //     const tempCourse = await fetch(`${constant.serverUrl}/api/payment/add`,{
        //         method:"POST",
        //         body:JSON.stringify(body),
        //         headers:{
        //             "authorization":`Bearer ${token}`,
        //             'Content-Type': 'application/json',
        //         }
        //     });
        //     let tt = await tempCourse.json()
        //     console.log("tt ", tt)
        //     if(tt.error==false){
        //         navigate("/mycourses")
        //     }else{
                
        //     }
        // }catch(e){
        //     console.log("courses error")
        // }
    }
    return (
        <div className='relative overflow-hidden'>
            <div className='fixed top-0 bg-slate-800 opacity-30 left-0 z-40 w-full h-screen flex justify-between items-center'>
            </div>
            <div className='fixed top-0 left-0 z-40 w-full h-screen flex justify-between items-center'>
                <div className='relative w-full h-full bg-transparent flex justify-center items-center'>
                    <div className='relative w-100 h-100 bg-white p-10 border rounded-md '>
                        <div onClick={()=>{
                            onClose()
                        }} className='absolute right-5 top-5 cursor-pointer'>
                            <XIcon/>
                        </div>
                        <div className='flex justify-center'>
                            <EnrollIcon/>
                        </div>
                        <div className='font-bold text-lg mt-3  text-center'>{course?.title}</div>
                        <div className='font-light text-xs mt-3 text-center text-gray-400'>Are you sure you want to enroll this course?</div>
                       
                        <div onClick={onClickPayed} className='bg-red-500 mt-6 cursor-pointer text-white text-sm text-center rounded-sm font-bold py-3 px-4 mx-3'>
                            Enroll Course
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}
export default PaymentModal