import React from 'react';
import {useSelector} from 'react-redux'
import constant from '../../constant';
import Layout from '../../components/Layout';
const PostDetail=()=>{
    //const dispatch = useDispatch();
    const post = useSelector(state=>state.post)

    return(
        <div className='w-full'>
            <Layout>
            {
                post.post&&
                (
                    <div className='my-10'>
                        <div className='w-full'>
                            <img src={`${constant.imageUrl}/${post.post.image}`} className='w-full h-96 object-cover'/>    
                        </div>
                        <div className='grid grid-cols-12'>
                            <div className='col-span-12 md:col-span-10  md:col-start-2'>
                                <div className='text-2xl text-center my-4' >{post.post.title}</div>
                                <div className='text-gray-700'>{post.post.description}</div>
                            </div>
                        </div>
                    </div>
                )
            } 
            </Layout>
        </div>
    )
}
export default PostDetail;