import React from 'react';
import './style.css'
const Button =({text="", style={}, onClick=()=>{}})=>{
    return(
        <div onClick={onClick} className="button-container" style={style}>
            {text}
        </div>
    )
}
export default Button