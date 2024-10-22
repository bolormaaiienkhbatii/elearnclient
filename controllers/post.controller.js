const db = require("../models");
const Video = require("../models/video.model");
const Post = require('../models/post.model');
const Category = db.category;
const Section = db.section;
exports.list=async(req, res)=>{
    try{
        const search =  req.body.search!=null&& req.body.search!==undefined&&req.body?.search.length>0?req.body.search:null;
        const searchParams = search==null? {}:{ 
            "name": { "$regex": search, "$options": "i" },
            "description": { "$regex": search, "$options": "i" },
        };
        searchParams.status="active";
        console.log("getAllPost")
        const catsTotal = await Post.find(searchParams,{})
        const limit = req.query&&req.query.limit?req.query.limit:10
        const page = req.query&&req.query.page?req.query.page:1
        const skip = (page-1)*limit;
        const post = await Post.find(searchParams,{},{ skip: skip, limit });
        const data  = {
            list:post,
            total:catsTotal.length,
            page:page,
            limit
        }
       
        console.log("course length ", post.length)
        res.json({
            data:data,
            error:false,
            message:"success"
        })
        return
    }catch(e){
        console.log("error get posts ",e)
        res.status(400).json({
            error:true,
            message:"error occured to get posts",
            data:null
        });
    }
}