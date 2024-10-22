import React, { useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import './style.css'
const VideoPlayer=({link="", width='640px', height="360px"})=>{
    const [playing, setPlaying]=useState(false)
    return(
        <div className='video-player'>
             <ReactPlayer
             width={width}
             height={height}
             
                controls={true}
             playing={playing} onPlay={()=>{
                setPlaying(true)
             }} onPause={()=>{
                setPlaying(false)
             }}  url={link}  />
        </div>
    )
}
// Lazy load the YouTube player
export default VideoPlayer;