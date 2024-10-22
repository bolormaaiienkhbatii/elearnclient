import React, { useState } from 'react';
import './style.css'
import {useSelector, useDispatch} from 'react-redux';
import allActions from '../../actions';
import { useEffect } from 'react';
import constant from '../../constant';
import {useNavigate} from 'react-router-dom'
import { useSearchParams } from 'react-router-dom';
import DropdownMenu from '../DropDownMenu/index';

const Navbar=()=>{
    const dispatch = useDispatch();
    const currentUser = useSelector(state=>state.currentUser)
    const category = useSelector(state=>state.category);
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(()=>{
        loadCategory()
    },[])
    const logout=async()=>{
        console.log("logut clicked ")
        try{    
            await localStorage.setItem("token",null);
            dispatch(allActions.userActions.setToken(null));
            dispatch(allActions.userActions.setUser(null));
        }catch(e){
            await localStorage.setItem("token",null);
            dispatch(allActions.userActions.setToken(null));
            dispatch(allActions.userActions.setUser(null));
        }
    }
    const loadCategory=async(load=false)=>{
        
        try{
            const coursesRes = await fetch(`${constant.serverUrl}/api/category/list`,{
                method:"GET",
                'Content-Type': 'application/json'
            })
            const p = await coursesRes.json();
            console.log("cats ", p)
            if(p.error==false){
                dispatch(allActions.categoryActions.setCategory(p.data.list))
               
            }else{
                dispatch(allActions.categoryActions.setCategory([]))
            }
            
        }catch(e){
            dispatch(allActions.categoryActions.setCategory([]))
        }
    }
    const onSubmitSearch=(e)=>{
        e.preventDefault()
        console.log("vlaue ", search)
        setSearchParams({ search: search });
        dispatch(allActions.courseActions.setCourseSearch(search));
        navigate(`/?search=${search}`)
    }
    return(
        <div className='navbar-container'>
            <div className='mcontainer z-40'>
                <div className='navbar'>
                    <div className='navbar-item'><a href="/" ><span className='brand-name'>LEARN</span></a></div>
                    <div className='navbar-item navbar-dropdown z-40 relative'>
                        <a href="#home">Courses  <div><i className="faicon-10 fa fa-chevron-down" aria-hidden="true"></i></div></a>
                        <div className='navbar-dropdown-container'>
                            <div className='mcontainer'>
                                <div className='course-dropdown'>
                                    <div className='grid grid-cols-4 ' >
                                        <div className='course-dropdown-item'><a className='course-dropdown-link'>All courses <i className="faicon-20 fa fa-long-arrow-right" aria-hidden="true"></i></a></div>
                                        {
                                            category&&category.categoryList.map(cat=>{

                                                return(
                                                    <div key = {cat._id} className='course-dropdown-item'><a href={`/?search=null&page=1&category=${cat._id}`} className='course-dropdown-link capitalize'>{cat.name}</a></div>
                                                )
                                            })
                                        }
                                        
                                       
                                    
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='navbar-item navbar-search-container'>
                        <i className="fa fa-search" aria-hidden="true"></i>
                        <form onSubmit={onSubmitSearch}>
                        <input value={search} onChange={(e)=>{setSearch(e.target.value)}}  placeholder='Search for courses'/>
                        </form>
                        
                    </div>
                    {currentUser.user==null?<div className='navbar-item '><a href="/login">Log in</a></div>:<div className='navbar-item' ><div onClick={()=>{
                        navigate("/mycourses")
                    }}>{currentUser?.user?.username}'s courses</div></div>}
                    <div>&nbsp;</div>
                    {currentUser.user!=null&&<div onClick={logout} className='navbar-item cursor-pointer'>Logout</div>}
                    {currentUser.user==null&&<div className='navbar-item' style={{marginRight:'0'}}><a className='btn-red' href="/signup">Sign up</a></div>}
                    {/* <DropdownMenu/>  */}
                </div>
            </div>
            
        </div>
       
    );
}
export default Navbar;