const Notes = require('../models/Notes');

const createNotes = async(req,res,next)=>{
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
        next(err);
    }
}

const getNotes = async (req,res,next) =>{
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
        next(err);
    }
}


const getSingleNotes = async(req,res,next) =>{
    try{
        const { id } = req.params;

        // Validate MongoDB ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Note ID."
            });
        }

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found."
            });
        }
        res.status(200).json({
            success: true,
            data: note
        });
    }
    catch(err){
        next(err);
    }
}


const updateNotes = async(req,res,next) =>{
    try{
        const { id } = req.params;
        const { title, content } = req.body;
        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Note ID."
            });
        }

        // Validate title
        if (title !== undefined && !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Title cannot be empty."
            });
        }

        // Validate content
        if (content !== undefined && !content.trim()) {
            return res.status(400).json({
                success: false,
                message: "Content cannot be empty."
            });
        }

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found."
            });
        }

        if (title !== undefined) {
            note.title = title.trim();
        }

        if (content !== undefined) {
            note.content = content.trim();
        }

        await note.save();

        res.status(200).json({
            success: true,
            message: "Note updated successfully.",
            data: note
        });

    }
    catch(err){
        next(err);
    }
}

const deleteNotes = async(req,res,next) =>{
    try{
        const { id } = req.params;

        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Note ID."
            });
        }

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found."
            });
        }

        await note.deleteOne();
        res.status(200).json({
            success: true,
            message: "Note deleted successfully."
        });
    }catch(err){
        next(err);
    }
}

const searchNotes = async(req,res,next)=>{
    try{
        const { q } = req.query;

        if (!q || !q.trim()) {
            return res.status(400).json({
                success: false,
                message: "Search query is required."
            });
        }

        const searchTerm = q.trim();

        const notes = await Note.find({
            $or: [
                {
                    title: {
                        $regex: searchTerm,
                        $options: "i"
                    }
                },
                {
                    content: {
                        $regex: searchTerm,
                        $options: "i"
                    }
                }
            ]
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            count: notes.length,
            data: notes
        });
    }
    catch(err){
        next(err);
    }
}
module.exports = {createNotes,getNotes,getSingleNotes,updateNotes,deleteNotes,searchNotes};

