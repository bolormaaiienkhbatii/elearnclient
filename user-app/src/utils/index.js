import React from 'react'
import {useLocation} from 'react-router-dom'
export const formatPrice=(x=1000)=>{
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
export const tugrugSymbol=()=>{
    return'₮';
}

export const useQuery=()=> {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const toHoursAndMinutes=(totalSeconds)=> {
    const totalMinutes = Math.floor(totalSeconds / 60);
  
    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    let sec = Math.floor(seconds)
  
    return { h: `${hours<10?'0'+hours:hours}`, m: `${minutes<10?'0'+minutes: minutes}`, s: `${sec<10?'0'+sec:sec}` };
}
export const toHoursAndMinutesString=(totalSeconds)=> {
    const totalMinutes = Math.floor(totalSeconds / 60);
  
    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    let sec = Math.floor(seconds)
    let result = "";
    result+=hours==0?"":hours+" hour ";
    result+=minutes==0?"":minutes+" min ";
    result+=sec==0?"":sec+" sec"
    return result;
}