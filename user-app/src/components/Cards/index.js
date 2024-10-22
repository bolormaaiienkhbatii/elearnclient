import React from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';
import constant from '../../constant';
import { formatPrice, tugrugSymbol } from '../../utils';
const Cards=({info, purchased=false})=>{
    const navigate = useNavigate();
    return(
        <div className="card-container" onClick={()=>{
            if(purchased){
                navigate(`/watch/${info._id}`);
            }else{
                navigate(`/course/${info._id}`);
            }
            
        }}>
            <div className='image'>
                <img src={`${constant.imageUrl}/${info.image==''?'noimage.png':info.image}`} width={"100"} alt="Alps" />
            </div>
            <div className="title">
                <p>{info?.title?info?.title:""}</p>
            </div>
            <div className="brief-title">
                <p>{info?.briefTitle?info?.briefTitle:""} Learn the ins and outs of Canva while designing your own style guide and web page</p>
            </div>
            <div className='h-5'></div>
            {/* <div className="price">
                <p>{formatPrice(info?.price)}{tugrugSymbol()}</p>
            </div> */}
            
            {/* <div className='buy'>
                {purchased?(<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zm1.5 0v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-1.5A.375.375 0 003 5.625zm16.125-.375a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5A.375.375 0 0021 7.125v-1.5a.375.375 0 00-.375-.375h-1.5zM21 9.375A.375.375 0 0020.625 9h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5zM4.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5zM3.375 15h1.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h1.5a.375.375 0 00.375-.375v-1.5A.375.375 0 004.875 9h-1.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375zm4.125 0a.75.75 0 000 1.5h9a.75.75 0 000-1.5h-9z" clipRule="evenodd" />
                        </svg>)
                        :<i className="faicon-20 fa fa-shopping-cart" aria-hidden="true"></i>}
                &nbsp;
                {purchased?'Үзэх':'Худалдан Авах'}
            </div> */}
        </div>
    )
}
export default Cards;