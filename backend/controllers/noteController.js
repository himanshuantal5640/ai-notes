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

const getNotes = async (req,res) =>{
    try{
        const note = await Notes.find().sort({createdAt: -1});
        if(!note){
            return res.status(400).json({
                success:false,
                message:"Data not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Data found",
            data:note
        });
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        });
    }
}


const getSingleNotes = async(req,res) =>{
    try{
        const note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(400).json({
                success:false,
                message:"Not found"
            });
        }
        return res.status(200).json({
            success:true,
            message:"Data Found",
            data:note
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        });
    }
}


const updateNotes = async(req,res) =>{
    try{
        const {title,content} = req.body;
        const note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(400).json({
                success:false,
                message:"Data Not Found"
            });
        }
        note.title = title || note.title;
        note.content = content || note.content;
        await note.save();
        return res.status(200).json({
            success:true,
            message:"Data Updated",
            data:note
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        });
    }
}

const deleteNotes = async(req,res) =>{
    try{
        const note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).json({
                success:false,
                message:"Data Not Found"
            });
        }
        await note.deleteOne();
        return res.status(200).json({
            success:true,
            message:"Data deleted successfully"
        });
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        });
    }
}

const searchNotes = async(req,res)=>{
    try{
        const {q} = req.query;
        if(!q){
            return res.status(400).json({
                success:false,
                message:"Query parameter is required"
            });
        }
        const notes = await Notes.find({
            $or:[
                {
                    title:{
                        $regex:q,
                        $options:'i'
                    }
                },
                {
                    content:{
                        $regex:q,
                        $options:'i'
                    }
                }
            ]
        }).sort({createdAt: -1});
        if(!notes || notes.length === 0){
            return res.status(404).json({
                success:false,
                message:"Not found"
            });
        }
        return res.status(200).json({
            success:true,
            count:notes.length,
            data:notes
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
module.exports = {createNotes,getNotes,getSingleNotes,updateNotes,deleteNotes,searchNotes};

