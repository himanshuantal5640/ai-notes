const Note  = require('../models/Notes');
const {askAi} = require('../services/aiServices');

const summarize = async(req,res) =>{
    try{
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({
                success:false,
                message:"Not found"
            })
        }
        const prompt = `Summarize the following note in a concise paragraph. ${note.content}`;
        const summary = await askAi(prompt);
        res.json({
            success:true,
            feature:"Summary",
            original:note.content,
            aiOuput: summary
        });
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

const improveGrammar = async(req,res)=>{
    try{
        const notes = await Note.findById(req.params.id);
        if(!notes){
            return res.status(404).json({
                success:false,
                message:"Notes Not found"
            })
        }
        const prompt = `Improve Grammar without changign meaning. ${notes.content}`;
        const output = await askAi(prompt);
        res.json({
            success:true,
            feature:"Grammar",
            orignal:notes.content,
            aiOutput: output
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
}

const convertBullet = async(req,res)=>{
    try{
        const notes = await Note.findById(req.params.id);
        if(!notes){
            return res.status(404).json({
                success:false,
                message:"Notes not found"
            })
        }
        const prompt = `Convert the following note into clear bullet points. ${notes.content}`;
        const output = askAi(prompt);
        res.json({
            success:true,
            feature:"Bullet",
            original: notes.content,
            aiOutput: output
        });
    } catch(err){
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}

const generateTitle = async(req,res)=>{
    try{
        const notes = await Note.findById(req.params.id);
        if(!notes){
            return res.status(400).json({
                success: false,
                message: "Notes not found"
            })
        }
        const prompt = `Generate a better title for the following note. Current Title: ${notes.title} Content: ${notes.content} Return only the title`;
        const output = askAi(prompt);
        res.json({
            success:true,
            feature:"Generate Title",
            original: notes.title,
            aiOutput: output
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}



module.exports = {summarize,improveGrammar,convertBullet,generateTitle};