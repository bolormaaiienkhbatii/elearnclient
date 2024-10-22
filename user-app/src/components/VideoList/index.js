import React from 'react';
import './style.css'
import VideoPlayer from '../VideoPlayer';
const VideoList=({videos=[], onPressVideo=()=>{} })=>{
    return(
        <div className='video-list'>
            {videos.length>0&&videos.concat(videos).map(vid=>{
                return(
                    <div className='video-item' key={vid._id}>
                        <div onClick={()=>onPressVideo(vid)} className='video-name'>{vid.name}</div>
                        <div>{vid.duration}</div>
                        
                    </div>
                )
            })}
        </div>
    )
}
export default VideoList;