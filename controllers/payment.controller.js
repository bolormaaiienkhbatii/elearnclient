const db = require("../models");
const Video = require("../models/video.model");
const Payment = require('../models/payment.model');
const User = require("../models/user.model");
const Course = require("../models/course.model");
exports.list=async(req, res)=>{
    
    try{
        const search =  req.body.search!=null&& req.body.search!==undefined&&req.body?.search.length>0?req.body.search:null;
        const searchParams = search==null? {}:{}
        // { 
        //     "name": { "$regex": search, "$options": "i" },
        //     "description": { "$regex": search, "$options": "i" },
        // };
        const catsTotal = await Payment.find(searchParams,{})
        const limit = req.query&&req.query.limit?req.query.limit:10
        const page = req.query&&req.query.page?req.query.page:1
        const skip = (page-1)*limit;
        const payment = await Payment.find(searchParams,{},{ skip: skip, limit }).populate("user").populate(
            {
                path:"course",
                populate:{
                    path:"category"
                }
            }
        );
        const data  = {
            list:payment,
            total:catsTotal.length,
            page:page,
            limit
        }
       
        console.log("payment length ", payment.length)
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
            message:"error occured to get payment",
            data:null
        });
    }
}
exports.add = async(req, res) => {
    /*
    try{
        console.log("req ", req.body)
        console.log("req.userId", req.userId);
        const user = req.userId
        if(user==null||user==undefined){
            return res.status(200).json({error:true,message:"user is not found"});
        }else {
            const userFound = await User.findOne({_id: user});
            if(userFound==null || userFound==undefined){
                return res.status(200).json({error:true,message:"user not found"});
            }
        }
        const course = req.body.courseId;
        if(course==null||course==undefined){
            return res.status(200).json({error:true,message:"course is not found"});
        }else {
            const courseFound = await Course.findOne({_id: course});
            if(courseFound==null || courseFound==undefined){
                return res.status(200).json({error:true,message:"course not found"});
            }else{
            
            console.log("courseFound ", courseFound)
            const {products} = req.body
            
            const lineItems = [
                {
                    price_data:{
                        currency:"usd",
                        product_data:{
                            name: "product name",
                            images: [""]
                        },
                        unit_amount: 100,
                    },
                    quantity: 1
                }
            ];

            const session = await stripe.checkout.sessions.create({
                payment_method_types:["card"],
                line_items: lineItems,
                mode:"payment",
                success_url: "",
                cancel_url:""
            });


            const newpayment = new Payment({
                user:user,
                course:course,
                status:"active",
                date:new Date()
            });
            await newpayment.save();

            res.status(200).send({error:false, message:"Success ", id: session.id});
            }
        }
        
    }catch(e){
        console.log("error ", e)
        res.status(500).json({error:true,message:"Server Error.", id:""});
    }
    */
};
// exports.update=async(req,res)=>{
//     try{
        
        
//         let count = await Post.estimatedDocumentCount();
//         if(count>0){
//             const sec = await Post.findOne({
//                 _id:req.body._id
//             });
//             if(sec==null||sec==undefined){
//                 res.status(400).json({error:true,message:"_id not found."});
//                 return;
//             }
//         }else{
//             if(sec==null||sec==undefined){
//                 res.status(400).json({error:true,message:"Post not found."});
//                 return;
//             }
//         }
//         const updateSection = await Post.findOne({_id:req.body._id});
//         updateSection.title=req.body.title;
//         updateSection.description = req.body.description;
//         updateSection.image=req.body.image;
//         await updateSection.save();

//         res.status(200).send({error:false, message:"Success ",data:updateSection});
//     }catch(e){
//         console.log("error ", e)
//         res.status(500).json({error:true,message:"Server Error."});
//     }
// }
// exports.delete = async(req, res) => {
//     try{
//         const _id = req.body._id;
//         if(_id ==null|| _id == undefined){
//             res.status(400).json({error:true,message:"_id not found."});
//             return;
//         }
//             const vid = await Post.findOne({
//                 _id:_id
//             });
//             if(vid==null||vid==undefined){
//                 res.status(400).json({error:true,message:"Post was not found."});
//                 return;
//             }
        
//         await Post.findOneAndDelete({_id:_id})

//         res.status(200).send({error:false, message:"Success ",data:null});
//     }catch(e){
//         console.log("error ", e)
//         res.status(500).json({error:true,message:"Server Error."});
//     }
// };