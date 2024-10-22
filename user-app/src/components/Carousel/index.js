import "./styles.css"
import firstImage from './images/bl4.jpg'
import secondImage from './images/secondimage.jpg'
import thirdImage from './images/third.jpg'
import { useState } from "react"
const Component=()=>{
    const [activeIndex, setActiveIndex]=useState(1)
    const plusSlides=(ind)=>{
        if(activeIndex<=1&&ind==-1){
            setActiveIndex(3)
        }else
        if(activeIndex>=3 && ind==1){
            setActiveIndex(1)
        }
        else{
            setActiveIndex(activeIndex+ind)
        }
    }
    const currentSlide=(ind)=>{
        setActiveIndex(ind)
    }
  return(
        <div style={{ width: "100%"}}>
         <div className="slideshow-container">
         
          
         <div className="mySlides fade active" style={{display: activeIndex==1?"block":"none"}}>
             <div className="numbertext">1 / 3</div>
             <img src={firstImage} width={100} height={100} style={{width:"100%"}}/>
             <div className="text">Caption Text</div>
           </div>
         
           <div className="mySlides fade active" style={{display: activeIndex==2?"block":"none"}}>
             <div className="numbertext">2 / 3</div>
             <img src={secondImage} style={{width:"100%"}}/>
             <div className="text">Caption Two</div>
           </div>
         
           <div className="mySlides fade active" style={{display:activeIndex==3?"block":"none"}}>
             <div className="numbertext">3 / 3</div>
             <img src={thirdImage} style={{width:"100%"}}/>
             <div className="text">Caption Three</div>
           </div>
         
           <a className="prev" onClick={()=>plusSlides(-1)}>&#10094;</a>
           <a className="next" onClick={()=>plusSlides(1)}>&#10095;</a>
         </div>
         
         <div style={{textAlign:"center"}}>
           <span className="dot" onClick={()=>currentSlide(1)}></span>
           <span className="dot" onClick={()=>currentSlide(2)}></span>
           <span className="dot" onClick={()=>currentSlide(3)}></span>
         </div> 
         </div>
    
  )
}
export default Component;