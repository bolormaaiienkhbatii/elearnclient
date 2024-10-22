import React, { useEffect, useState } from 'react';
import Cards from '../../components/Cards';
import Layout from '../../components/Layout';
import './style.css';
import constant from '../../constant';

import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import allActions from '../../actions';
import  CarouselWithContent  from '../../components/Carousel';
import currentUser from '../../reducers/userReducers';
import { useSearchParams, useLocation } from 'react-router-dom';


const Home = ()=>{

    const [searchParams, setSearchParams] = useSearchParams();
    const searchParam = searchParams.get('search');
    const [courseList, setCourseList]=useState([])
    const [postList, setPostList] = useState([])
    const course = useSelector(state=>state.course)
    const categoryList = useSelector(state=>state.category)
    const user = useSelector(state=>state.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const location = useLocation();

    // Function to parse query parameters
    const useQuery = () => {
        return new URLSearchParams(location.search);
    };

    const query = useQuery();
    const searchTerm = query.get('search'); // Assuming the query is like /search?query=term
    const categoryTerm = query.get('category'); // Assuming the query is like /search?query=term




    useEffect(()=>{
        
        if(searchTerm==''){
            loadCourses(true, searchTerm, course.page, categoryTerm)
        }else if (searchTerm==null){
            loadCourses(true, '')
        }else{
            loadCourses(false, searchTerm, course.page, categoryTerm)
        }
            
            getMe()
    },[])
    useEffect(()=>{

        if(searchTerm==''){
            loadCourses(true, searchTerm, course.page, categoryTerm);
        }else if (searchTerm==null){
            loadCourses(true, '', course.page, categoryTerm);
        }else{
            loadCourses(false, searchTerm,course.page, categoryTerm);
        }
        
    },[searchTerm, categoryTerm])
    const getMe=async()=>{
        try{
            const token = await localStorage.getItem("token")
            const me = await fetch(`${constant.serverUrl}/api/auth/me`,{
                method:"GET",
                headers:{
                    "authorization":`Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            const meUser = await me.json();
            
            if(meUser.error==false){
                console.log("meUser", meUser)
                dispatch(allActions.userActions.setToken(meUser.data.token))
                dispatch(allActions.userActions.setUser(meUser.data))
            }else{
                // dispatch(allActions.userActions.setToken(null))
                // dispatch(allActions.userActions.setToken(null))
            }
        }catch(e){

        }
    }
    const loadCourses=async(load=false, searchParam="", page=1, categoryValue='')=>{
        if(categoryValue==null||categoryValue==undefined||categoryValue=='null'||categoryValue=='undefined'){
            categoryValue=''
        }
            

        if(load===false && courseList?.length>0&& searchParam===""){
            return;
        }

        try{
            const coursesRes = await fetch(`${constant.serverUrl}/api/course/all?search=${searchParam}&page=${page}&category=${categoryValue}`,{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({search: searchParam, userId: user})
            })
            const courses = await coursesRes.json();
            console.log("courses ", courses);

            if(courses.error===false){
                let ll = courses.data.list
                setCourseList(ll);
                const hasNext=courses.data.total>course.limit*(courses.data.page);
                const hasPrev=courses.data.page>1?true:false
                dispatch(allActions.courseActions.setCourse(ll))
                dispatch(allActions.courseActions.setCoursePage(courses.data.page))
                dispatch(allActions.courseActions.setCourseTotal(courses.data.total))
                dispatch(allActions.courseActions.setCourseHasPrev(hasPrev))
                dispatch(allActions.courseActions.setCourseHasNext(hasNext))
            }
            
        }catch(e){
            setCourseList([])
            dispatch(allActions.courseActions.setCourse([]))
            dispatch(allActions.courseActions.setCoursePage(0))
            dispatch(allActions.courseActions.setCourseTotal(0))
            dispatch(allActions.courseActions.setCourseHasPrev(false))
            dispatch(allActions.courseActions.setCourseHasNext(false))
        }
    }
    console.log("course ", course)
    
    return(
        <div>
            <Layout style={{paddingTop:'0px',"backgroundColor":"white"}}>
                <div className='overflow-scroll'>   
                    <div>
                        
                        {
                                    <CarouselWithContent />
                        }
                    </div>
                    
                        
                    <div className='grid grid-cols-12 gap-6 mx-11 my-10'>
                        {
                            courseList!==undefined&&courseList&&courseList.length>0 && courseList.map((course=>{
                                return(
                                    <div className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2'>
                                    <Cards info={course} key={course._id} />
                                    </div>
                                )
                            }))
                        }
                    </div>
                    {
                        course.hasNext == true && course.hasPrev==true&&
                        (<div className='flex justify-between w-[400px] bg-transparent overflow-hidden mx-auto mb-10'>
                        <div className={`px-5 py-2  text-white border rounded-md text-sm  ${course.hasPrev? 'bg-red-600 cursor-pointer ':'bg-red-400 cursor-auto'}`}
                            onClick={()=>{
                                const hasPrev=course.page>1;
                                dispatch(allActions.courseActions.setCourseHasPrev(hasPrev))       
                                if(hasPrev){
                                        const prev = course.page -1;
                                        dispatch(allActions.courseActions.setCoursePage(prev)) 
                                        
                                        loadCourses(true, searchTerm,prev )
                                }
                                }}
                        >Prev</div>
                        
                        <div className='flex'>
                            {
                                course.page-1>0 && (
                                    <div className='px-5 py-2 bg-red-300 text-white border rounded-md text-sm'>{course.page-1}</div>
                                )

                            }

                            <div className='px-5 py-2 bg-red-600 text-white border-2 rounded-md text-sm border-red-800 '>{course.page}</div>
                            
                            {
                                course.hasNext==true && (
                                    <div className='px-5 py-2 bg-red-300 text-white border rounded-md text-sm'>{course.page+1}</div>
                                )
                            }
                            
                        </div>
                        
                        <div  className={`px-5 py-2 text-white border rounded-md text-sm ${course.hasNext? 'bg-red-600 cursor-pointer ':'bg-red-400 cursor-auto'}`} 
                            onClick={()=>{
                            const hasNext=course.total>course.limit*(course.page);
                            dispatch(allActions.courseActions.setCourseHasNext(hasNext))       
                            if(hasNext){
                                    const next = course.page +1;
                                    dispatch(allActions.courseActions.setCoursePage(next)) 
                                    
                                    loadCourses(true, searchTerm,next )
                            }
                            }}
                            >Next</div>
                    </div>)
                    }
                </div>
            </Layout> 
        </div>
    );
}
export default Home;