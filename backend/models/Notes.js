const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,"Title is required"],
            trim:true,
            maxlength:100
        },
        content:{
            type:String,
            required:[true,"Content is required"],
            trim:true
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("Notes",notesSchema);
