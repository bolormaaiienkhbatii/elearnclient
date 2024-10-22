const db = require("../models");
const mongoose = require("mongoose")
const Course = db.course;
const Payment = db.payment;
exports.courseListPublic = async(req, res) => {
    try{
        console.log("course list public =========,  ", req.query)
        //console.log("course list public =========,  ", req.body)
        const category = req.query.category!=null&& req.query.category!==undefined&&req.query?.category.length>0?req.query.category:null;
        const search =  req.query.search!=null&& req.query.search!==undefined&&req.query?.search.length>0?req.query.search:null;
        const searchParams = search==''||search=='null'|| search==null? {}:{ 
            "title": { "$regex": search, "$options": "i" },
            "briefTitle": { "$regex": search, "$options": "i" },
            
        };
        if(category){
            searchParams.category = category;
        }
        const catsTotal = await Course.find(searchParams,{})
        //console.log("cats total ", req.body)
        const limit = req.query&&req.query.limit?req.query.limit:10
        const page = parseInt(req.query&&req.query.page?req.query.page:1)
        const skip = (page-1)*limit;
        const courses = await Course.find(searchParams,{},{ skip: skip, limit }).populate(["category"]).populate({
            path:"sections",
            populate:{
                path:"videos"
            }
        });
        const data  = {
            list:courses,
            total:catsTotal.length,
            page:page,
            limit
        }
        return res.json({
            data:data,
            error:false,
            message:"success"
        })
        
    }catch(e){
        console.log("error get Courses ",e)
        res.status(400).json({
            error:true,
            message:"error occured to get courses",
            data:null
        });
    }
};
exports.courseListMy= async(req, res) => {
    try{
        console.log("req. body ", req.userId)
        const userId= req.userId;
        const courses = await Course.find({users:{$all:[userId]}});


        res.json({
            error:false,
            data:courses,
            message:"req body"
        })
        
        
    }catch(e){
        console.log("error get Courses ",e)
        res.status(400).json({
            error:true,
            message:"error occured to get courses",
            data:null
        });
    }
};
exports.courseByIdPublic = async(req, res) => {
    try{
        console.log("getAllcourse1 ", req.params.id)
        const course = await Course.findOne({_id:req.params.id}).populate(["category"]).populate(
            {
                path:"sections",
                populate:{
                    path:"videos"
                }
            }
        );
        console.log("course length ", course)
        res.json({
            data:course,
            error:false,
            message:"success"
        })
        return
    }catch(e){
        console.log("error get Courses ",e)
        res.status(400).json({
            error:true,
            message:"error occured to get courses",
            data:null
        });
    }
};
exports.courseSimilar=async(req, res)=>{
    const course = await Course.findOne({_id:req.params.id});
    if(course!==null&&course!==undefined){
        try{
            const category = course.category;
            const courses = await Course.find({category: category._id, _id:{$ne: course._id}})
            .limit(10);
            res.json({
                data:courses,
                error:false,
                message:"success"
            })
        }catch(err){
            console.log("err course similar ", err)
            res.status(400).json({
                error:true,
                message:"Server error",
                data:null
            });
        }
    }else{
        res.status(400).json({
            error:true,
            message:"course does not exist.",
            data:null
        });
    }
}


exports.courseByIdPrivate = async(req, res) => {
    try{
        console.log("getAllcourse1 ", req.params.id)
        const course = await Course.findOne({_id:req.params.id}).populate(["category"]).populate(
            {
                path:"sections",
                populate:{
                    path:"videos"
                }
            }
        );
        console.log("course length ", course)
        res.json({
            data:course,
            error:false,
            message:"success"
        })
        return
    }catch(e){
        console.log("error get Courses ",e)
        res.status(400).json({
            error:true,
            message:"error occured to get courses",
            data:null
        });
    }
};
exports.courseUserAdd=async(req, res)=>{
    try{
        const courseOne = await Course.where('_id').equals(req.params.id);
        if(courseOne.length==0){
            return res.json({
                success:false,
                message:"Course not found."
            })
        }
        let courseTemp = courseOne[0];
        const users = courseTemp.users.filter(user=>user.toString()==req.userId);
        if(users.length==0){
            const course = await Course
                .findByIdAndUpdate(req.params.id, {$push:{users: req.userId}}, { new:true, upsert:true});
            //console.log("course length ", course)
            res.json({
                success:true,
                message:"Congratulations. You successfully enrolled to this course."
            })
        }else{
            return res.json({
                success:false,
                message:"You already enrolled to this course."
            })
        }
        
        
    }catch(err){
        console.log("err ", err)
        res.json({
            success:false,
            message:"Sorry, error occured."

        })
    }
}
//   exports.userBoard = (req, res) => {
//     res.status(200).send("User Content.");
//   };
  
//   exports.adminBoard = (req, res) => {
//     res.status(200).send("Admin Content.");
//   };
  
//   exports.moderatorBoard = (req, res) => {
//     res.status(200).send("Moderator Content.");
//   };