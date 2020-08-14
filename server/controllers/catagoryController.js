const slugify = require('slugify')
const Catagory = require('../models/catagoriesModel')

exports.createCatagory = (req,res) => {
    const catagoryObj = {
        name:req.body.name,
        slug:slugify(req.body.name)
    }
    if(req.body.parentId){
        catagoryObj.parentId = req.body.parentId
    }

    const cat = new Catagory(catagoryObj)
    cat.save((error,catagory)=>{
        if(error) return res.status(400).json({message:error})
        if(catagory) {
            res.status(201).json({message:catagory})
        }
    })
}