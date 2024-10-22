import React from 'react';
import Navbar from '../Navbar';
import './style.css';
const Layout=({children, style={}, showFooter=true})=>{
    return(
        <div>
            <div className='layout-container'>
            
                <div className='header-container'>
                    <Navbar/>
                </div>
                <div className='body-container' style={style}>
                    {children}
                </div>
                {/* {showFooter&&<div className='footer-container'>
                    Footer 2023
                </div>} */}
            </div>
        </div>
        
    )
}
export default Layout;