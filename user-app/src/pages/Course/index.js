import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import './style.css'
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';
import VideoList from '../../components/VideoList';
import constant from '../../constant';

const Courses=()=>{
    const query = useLocation();
    const navigate = useNavigate()
    const [course, setCourse]=useState(null);
    console.log("query ", query);
    useEffect(()=>{
        const path = query.pathname.match(/(?<=\/course\/)[0-9a-z]+(?=\?|$)/g)
        loadCourse(path)
    },[query.pathname])
    const loadCourse = async (path)=>{
        try{
            const cc = await fetch(`${constant.serverUrl}/api/course/id/${path}`,{
                method:"GET"
            });
            const coursedata = await cc.json();
            console.log("course data ",coursedata)
            if(coursedata.error==false){
                setCourse(coursedata.data)
            }else{
                setCourse(null)
            }
        }catch(e){
            setCourse(null)
        }
    }
    const onPressVideo=async(vid=null)=>{
        if(vid==null){return }
        navigate(`/watch?course=${course._id}&video=${vid._id}`);
    }
    return(
        <div>
            <Layout>
                <div className="detail-container">
                    <div className='detail-main-back'>
                        
                        <div className='detail-main-info'>
                            <h3 className='detail-title'>{course&&course.title}</h3>
                            <p className='detail-briefTitle'>{course&&course.briefTitle}</p>
                            <p className='detail-smallDetail'>Buy count: {course? course.buyCount:0}&nbsp; Video Count: {course?course.videos.length:0}</p>
                           
                        </div>
                    </div>
                    <div className='detail-other-info'>
                        <h3>Description</h3>
                       
                       <div style={{"marginBottom":"15px"}}>
                       {course&&course.description}
                       </div>
                       {
                        course&&course.videos.length>0&&
                        (<div>
                            <div style={{"marginBottom":'15px'}}>Videos: {course.videos.length}</div>
                            <VideoList onPressVideo={onPressVideo} videos={course.videos}/>
                        </div>)
                       }
                       <div>
                    
                       </div>
                    </div>

                    <div className='detail-sidebar'>
                        <img src={course&&course.image} width={"100%"}/>
                        <div className='detail-sidebar-container'>
                            
                            <br/>
                            <div className='detail-price-container'>
                                <div style={{color:"#999"}}>Price: </div>
                                <div className='detail-price'>20'000</div>
                            </div>
                            
                            <Button text={"Buy Now"}/>
                            
                        </div>
                    </div>

                </div>
            </Layout>
        </div>
    )
}
export default Courses;