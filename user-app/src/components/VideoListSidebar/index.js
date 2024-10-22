import React from 'react';
import './style.css'
import VideoPlayer from '../VideoPlayer';
const VideoListSidebar=({sections=[], onPressVideo=()=>{} })=>{
    return(
        <div className='sb-video-list'>
            {
                sections.length>0 && sections.map(mm=>{
                    if(mm.videos.length>0){
                        return(
                            <div>
                                <div>{mm.name}</div>
                                {
                                    mm.videos.map((vv)=>{
                                        return(
                                            <div>

                                            {vv.name}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }else{
                        return <div/>
                    }
                })
            }
            {/* {sections.length>0&&videos.concat(videos).map((vid, vi)=>{
                return(
                    <div className='sb-video-item' key={vi}>

                        <div onClick={()=>onPressVideo(vid)} className='sb-video-name'>{vid.name}</div>
                        <div className='sb-duration'>{vid.duration}</div>
                        
                    </div>
                )
            })} */}
        </div>
    )
}
export default VideoListSidebar;