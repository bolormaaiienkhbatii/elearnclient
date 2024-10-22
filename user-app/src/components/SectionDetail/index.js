import React from 'react';
import {ReactComponent as DotIcon} from '../../icons/dot.svg'
import {ReactComponent as DownIcon} from '../../icons/down.svg';
import {ReactComponent as UpIcon} from '../../icons/up.svg'
import {ReactComponent as MovieIcon} from '../../icons/movie.svg'
import { toHoursAndMinutes, toHoursAndMinutesString } from '../../utils';
const SectionDetail=({sid=0, disabled=true,title="", videoCount=1, videoLength="", section=null, onClickVideo=()=>{}})=>{
    return(
        <div className='border  border-slate-300'>
            <div className='border-b border-slate-300 flex justify-between items-center bg-slate-200  h-16 w-100'>
                <div className='flex  items-center'>
                    <div className='ml-6 mr-3'>
                        <DownIcon/>
                    </div>
                    <h3 className='text-bold'>
                        {section.name}
                    </h3>
                </div>
                
                <div className='flex mr-6 text-xs'>
                    <div>
                        {section.videos.length} lectures
                    </div>
                    
                    <DotIcon/>
                    <div>
                        {`${toHoursAndMinutesString(videoLength)}`}
                    </div>
                    
                </div>

            </div>
            <div className='pt-5 pb-5'>
                {
                    section?.videos.map((video, vid)=>{
                        return(
                            <div onClick={()=>{
                                    if(disabled==false){
                                        onClickVideo(sid,vid)
                                    }
                                    
                                }} key={vid} className={`flex  justify-between h-12 items-center ${disabled==true?'':'hover:bg-slate-200'} ${disabled==true?'cursor-default':'cursor-pointer'}`}>
                                <div className='flex items-center ml-6'>
                                    <div className='mr-4'>
                                        <MovieIcon/>
                                    </div>
                                    <div className='text-xs mr-4'>
                                        {video.name}
                                    </div>
                                    <div className='bg-slate-200 w-6 h-6 border rounded-full flex justify-center items-center'>
                                        <DownIcon/>
                                    </div>
                                </div>
                                <div className='mr-6 text-xs ml-10'>
                                    {`${toHoursAndMinutes(video.duration).m}:${toHoursAndMinutes(video.duration).s}`}
                                </div>
                                
                            </div>
                        )
                    })
                }
                
                
            </div>
            
        </div>
    )
}

export default SectionDetail;