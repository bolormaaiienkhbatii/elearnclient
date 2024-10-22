import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import './style.css'
import { useLocation, useNavigate } from 'react-router-dom';
import VideoListSidebar from '../../components/VideoListSidebar';
import VideoPlayer from '../../components/VideoPlayer';
import constant from '../../constant';
import SectionDetail from '../../components/SectionDetail';
import { toHoursAndMinutes } from '../../utils';
import {ReactComponent as DotIcon} from '../../icons/dot.svg'
import {useSelector} from 'react-redux'
const WatchVideo=()=>{
    const query = useLocation();
    const navigate = useNavigate()
    const [course, setCourse]=useState(null);
    const [sectionIndex, setSectionIndex]=useState(-1);
    const [videoIndex, setVideoIndex] = useState(-1)

    const currentUser = useSelector(state=>state.currentUser)
    console.log("query ", query)
    useEffect(()=>{
        const path = query.pathname.match(/(?<=\/watch\/)[0-9a-z]+(?=\?|$)/g)
        loadCourse(path)
        
    },[query.pathname])
    const loadCourse = async (path)=>{
        const courseId=path
        try{
            console.log("courseId ", courseId)
            const token = await localStorage.getItem("token")
            const cc = await fetch(`${constant.serverUrl}/api/course/id/${courseId}`,{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                    "authorization":`Bearer ${token}`,
                },
            });
            const coursedata = await cc.json();
            console.log("course data ",coursedata)
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
                if(coursedata.data.sections.length>0){
                    setSectionIndex(0);
                    const videoLength = coursedata.data.sections[0].videos.length;
                    if(videoLength>0){
                        setVideoIndex(0);
                    }else{
                        setVideoIndex(-1)
                    }
                }else{
                    setSectionIndex(-1)
                }
                //const vid = coursedata.data.videos.filter(vid=>vid._id=vId[0])
                //console.log("vid ", vid)
                //setVideo(vid[0])
            }else{

                //setVideo(null)
            }
        }catch(e){
        setCourse(null)
        }
    }
    const onPressVideo=async(vid=null)=>{
        if(vid==null){return }
       //navigate(`/watch?course=${course._id}&video=${vid._id}`);
    }
    const onClickVideo=async(sectionId=0, videoId=0)=>{
        console.log("onClick video ", sectionId, videoId)
        setSectionIndex(sectionId)
        setVideoIndex(videoId)
    }
    return(
        <div>
            <Layout style={{backgroundColor:"white"}}>
                <div>
                    <div className='watch-container' >
                        <div className='watch-left'>
                            {sectionIndex>=0&&videoIndex>=0&&<VideoPlayer height='100%' width={'100%'} link={`${constant.videoUrl}/${course.sections[sectionIndex].videos[videoIndex].link}`}/>}
                            
                        </div>
                        
                        {/* <div className='watch-right'> 
                            <div className='watch-content-label'>
                                <p>Course content</p>
                                <p>Close</p>
                            </div>
                            {course&&
                            <VideoListSidebar
                                sections={course?.sections}
                                onPressVideo={onPressVideo}
                            />}

                        </div> */}
                    </div>
                    <div className='grid grid-cols-12'>

                        
                        <div className='mt-10 col-start-2 col-span-10'>
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
                        <div className='col-span-10 col-start-2'>
                            {
                                course?.sections.map((courseSec, sid)=>{
                                    return(
                                        <SectionDetail disabled={false} sid={sid} onClickVideo={onClickVideo} key={courseSec._id} section = {courseSec} title="Course Overview"  videoCount ={courseSec?.videoCount} videoLength={courseSec.totalVideoDuration}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default WatchVideo;