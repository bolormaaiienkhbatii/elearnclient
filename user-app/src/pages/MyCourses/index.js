import React from 'react';
import Layout from '../../components/Layout';
import { useState } from 'react';
import {useSelector} from 'react-redux'
import { useEffect } from 'react';
import constant from '../../constant';
import Cards from '../../components/Cards';
const MyCourses= ()=>{
    const [courseList, setCourseList]=useState([])
    const currentUser = useSelector(state=>state.currentUser)
    useEffect(()=>{
        loadCourses()
    },[])
    const loadCourses=async(load=false)=>{
        console.log("currentUser null ", currentUser)
        // if(load==false && courseList?.length>0){
        //     return;
        // }
        try{
            if(currentUser.user==null){
                
                return;
            }
            const body = {
                user:currentUser.user?.id
            }
            const token = await  localStorage.getItem("token")
            console.log(" token ", token)
            const coursesRes = await fetch(`${constant.serverUrl}/api/course/my`,{
                method:"POST",
                body:JSON.stringify(body),
                headers:{
                    "authorization":`Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
                
            })
            const courses = await coursesRes.json();
            console.log("courses ", courses)
            if(courses.error==false){
                const coursesTemp = courses.data;
                setCourseList(coursesTemp);
            }
            
        }catch(e){
            console.log("course list error here ", e)
            setCourseList([])
        }
    }
    return(
        <div>
            <Layout>
                <div className='grid grid-cols-12 py-10'>
                    <div className='col-span-12 font-bold text-xl mb-5 xl:col-span-10 xl:col-start-2'>
                        My Courses
                    </div>
                    <div className='col-span-12 xl:col-span-10 xl:col-start-2 grid grid-cols-12 gap-10 '>
                    
                    {
                        courseList!==undefined&&courseList&&courseList.length>0 && courseList.map((course=>{
                            return(
                                <div  key={course._id} className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3'>
                                    <Cards info={course} purchased={true} />
                                </div>
                            )
                        }))
                    }
                    </div>
                </div>
                
            </Layout>
            
        </div>
    )
}
export default MyCourses;