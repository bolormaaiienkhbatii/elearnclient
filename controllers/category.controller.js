const db = require("../models");

const Category = db.category; 
exports.categoryList = async(req, res) => {
    
    try{
        const search = {}
        const catsTotal = await Category.find(search,{})
        const limit = req.query&&req.query.limit?req.query.limit:100
        const page = req.query&&req.query.page?req.query.page:1
        const skip = (page-1)*limit;
        const cats = await Category.find(search,{},{ skip: skip, limit })
        const data  = {
            list:cats,
            total:catsTotal.length,
            page:page,
            limit
        }
        return res.status(200).send({error:false, message:"Success ",data});
    }catch(e){
        console.log("error ", e)
        return res.status(500).json({error:true,message:"Server Error."});
    }
}; 