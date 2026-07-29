const Notes = require('../models/Notes');

const createNotes = async(req,res)=>{
    try{
        const {title,content} = req.body;
        if(!title || !content){
            return res.status(400).json({
                success:false,
                message:"Title and Content both are required"
            });
        }

        const note = await Notes.create({
            title,
            content
        });
        return res.status(201).json({
            success:true,
            message:"Notes created successfully",
            data:note
        })
    }catch(err){
        return res.status(500).json({
            success:true,
            message:err.message
        });
    }
}

module.exports = {createNotes};

