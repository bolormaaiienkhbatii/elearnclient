import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import './style.css'
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';
import VideoList from '../../components/VideoList';
import constant from '../../constant';
import cart from '../../icons/cart';
import { formatPrice, tugrugSymbol, useQuery } from '../../utils';
import Cards from '../../components/Cards';
import PaymentModal from '../../components/PaymentModal';
import {useSelector} from 'react-redux'
import SectionDetail from '../../components/SectionDetail';
import { toHoursAndMinutes } from '../../utils';
import {ReactComponent as DotIcon} from '../../icons/dot.svg'
import DropdownMenu from '../../components/DropDownMenu';
const Detail=()=>{
    const query = useLocation();
    const navigate = useNavigate()
    const [course, setCourse]=useState(null);
    
    const [courseList, setCourseList]=useState([])
    const [showPayment, setShowPayment]=useState(false)
    const currentUser = useSelector(state=>state.currentUser)
    const queryq = useQuery()
    useEffect(()=>{
        
        const path = query.pathname.match(/(?<=\/course\/)[0-9a-z]+(?=\?|$)/g)
        loadCourse(path);
    },[query.pathname]);
    const loadCourses=async()=>{
        
        try{const path = query.pathname.match(/(?<=\/course\/)[0-9a-z]+(?=\?|$)/g);
            const coursesRes = await fetch(`${constant.serverUrl}/api/course/similar/${path}`,{
                method:"GET"
            })
            const courses = await coursesRes.json();
            console.log("courses ", courses)
            if(courses.error==false){
                setCourseList(courses.data);
            }
            
        }catch(e){
            setCourseList([])
        }
    }
    const loadCourse = async (path)=>{
        try{
            const cc = await fetch(`${constant.serverUrl}/api/course/public/${path}`,{
                method:"GET"
            });
            const coursedata = await cc.json();
            console.log("course data ",coursedata.data)
            if(coursedata.error==false){
                
                let course1 = {
                    ...coursedata.data, 
                    videoCount:0,
                    sectionDetails:[]

                }
                const courseVideoNumber = course1.sections.map(sec=>sec.videos.length).reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0,
                );
                course1.videoCount=courseVideoNumber;
                
                let sumVideoDuration = 0;
                for(let i =0; i<course1.sections.length; i++){
                    let videos = [...course1.sections[i].videos];
                    let totalVideoDuration = 0;
                    for(let j = 0; j<videos.length;j++){
                        sumVideoDuration+=videos[j].duration;
                        totalVideoDuration+= videos[j].duration;
                    }
                    course1.sections[i].totalVideoDuration = totalVideoDuration;

                }
                course1.sum=sumVideoDuration;
                if(currentUser!==null && currentUser!==undefined){
                    const enrolled =  course1.users.filter(user=>user===currentUser?.user.id);
                    console.log("Enrolled ", enrolled)
                    course1.enrolled = enrolled.length>0?true:false
                }else{
                    course1.enrolled=false;
                }
                setCourse(course1);

                
                loadCourses(coursedata.data.category?._id)
                if(queryq.get('showPay')){
                    setShowPayment(true)
                }
            }else{
                setCourse(null)
            }
        }catch(e){
        setCourse(null)
        }
    }
    const onClickPayed=()=>{
        //api 
        navigate("/mycourses")
    }
    const onClickPay=()=>{
        if(currentUser.user!=null&&currentUser.user!=undefined){
            setShowPayment(true)
        }else{
            navigate(`/login?reload=/course/650d13a3339f93ae685bb513?showPay=true`)
        }
        
    }
    return(
        <div style={{}}>
            <Layout>
                <div className=' detail w-full h-full bg-gray-100  grid grid-cols-12'>
                    <div className='col-span-12 py-10 w-full bg-slate-800'>
                        <div className='grid grid-cols-12 md:mx-0 mx-10 '>
                            <div className='md:col-start-2 md:col-span-10 col-span-12 '>
                                <div className='grid grid-cols-12 gap-8 place-items-center'>
                                    <div className='md:col-start-1 md:col-span-8  col-span-12 '>
                                        <div className='md:hidden mb-5'>
                                            {course&&<img src={`${constant.imageUrl}/${course?.image==''?'noimage.png':course.image}`}/>}
                                        </div>
                                        
                                        <div className='text-white font-bold text-rose-900 mb-5 capitalize'>
                                            {course?.category.name}
                                        </div>
                                        <div className='text-white font-bold text-3xl xl:mr-14 mb-5'>
                                        {course?.title}
                                        </div>
                                        <div className='text-sm text-white xl:mr-14'>
                                            {course?.briefTitle}
                                        </div>
                                        {
                                            course?.enrolled ==true?
                                                (
                                                    <div onClick={()=>{
                                                        navigate(`/watch/${course?._id}`);
                                                    }} className='checkout bg-red-600 mt-3'>
                                                        Go to Course
                                                    &nbsp;
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                        <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                )
                                            :
                                                (
                                                    <div onClick={()=>onClickPay()} className='checkout bg-red-600 mt-3'>
                                                        Enroll Course
                                                        &nbsp;
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                        <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                )
                                        }
                                        
                                    
                                    </div>
                                    <div className='md:col-span-4 md:flex hidden'>
                                        {course&&<img src={`${constant.imageUrl}/${course?.image==''?'noimage.png':course.image}`}/>}
                                    </div>
                                    
                                </div>
                            
                            </div>
                        </div>
                        
                        
                    </div>
                    <div className=' md:col-start-2 md:col-span-10 col-span-12 bg-tranparent md:mx-0 mx-10'>
                        
                        
                        <div className='mt-10'>
                            <h3 className='font-bold text-xl mb-8'>Course content</h3>
                            <div className='flex justify-between'>
                                <div className='text-xs flex'>
                                    
                                    {course?.sections.length} sections <DotIcon/> {course?.videoCount} lectures <DotIcon/> {course? `${toHoursAndMinutes(course?.sum).h}:${toHoursAndMinutes(course?.sum).m}:${toHoursAndMinutes(course?.sum).s}`:0} total length
                                </div>
                                <div>
                                    {/* Expand all section */}
                                </div>
                            </div>
                        </div>
                        <div>
                            
                            <div>
                                {
                                    course?.sections.map(courseSec=>{
                                        return(
                                            <SectionDetail key={courseSec._id} section = {courseSec} title="Course Overview"  videoCount ={courseSec?.videoCount} videoLength={courseSec.totalVideoDuration}/>
                            
                                        )
                                    })
                                }
                            </div>
                            <div className='my-3 font-bold text-xl mt-5'>
                                Similar Courses
                            </div>
                            <div className='grid grid-cols-12 gap-4 lg:gap-10'>
                            {
                                courseList!==undefined&&courseList&&courseList.length>0 && courseList.map((course=>{
                                    return(
                                        <div className=' col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3'  key={course._id}> 
                                            <Cards info={course} />
                                        </div>
                                    )
                                }))
                            }
                            </div>
                        </div>
                    </div>
                    {showPayment&&<PaymentModal course={course} onClose={()=>{setShowPayment(false)}}/>}
                </div>
                {/* <DropdownMenu/> */}
                
            </Layout>
        </div>
    )
}
export default Detail;