const mongoose = require("mongoose");
const Note = require("../models/Notes");
const { askAI } = require("../services/aiServices");

const findNote = async (id) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Invalid Note ID.");
        error.statusCode = 400;
        throw error;
    }

    const note = await Note.findById(id);

    if (!note) {
        const error = new Error("Note not found.");
        error.statusCode = 404;
        throw error;
    }

    return note;
};

const summarizeNote = async (req, res, next) => {

    try {

        const note = await findNote(req.params.id);

        const prompt = `
Summarize the following note clearly and concisely.

Do not add information that is not present in the note.

Note:
${note.content}
`;

        const summary = await askAI(prompt);

        res.status(200).json({
            success: true,
            feature: "summary",
            original: note.content,
            aiOutput: summary
        });

    } catch (error) {
        next(error);
    }
};
const improveGrammar = async (req, res, next) => {

    try {

        const note = await findNote(req.params.id);

        const prompt = `
Improve the grammar and clarity of the following note.

Do not change its original meaning.

Note:
${note.content}
`;

        const output = await askAI(prompt);

        res.status(200).json({
            success: true,
            feature: "grammar",
            original: note.content,
            aiOutput: output
        });

    } catch (error) {
        next(error);
    }
};


const convertToBullets = async (req, res, next) => {

    try {

        const note = await findNote(req.params.id);

        const prompt = `
Convert the following note into clear and concise bullet points.

Do not add information that is not present.

Note:
${note.content}
`;

        const output = await askAI(prompt);

        res.status(200).json({
            success: true,
            feature: "bullets",
            original: note.content,
            aiOutput: output
        });

    } catch (error) {
        next(error);
    }
};


const generateTitle = async (req, res, next) => {

    try {

        const note = await findNote(req.params.id);

        const prompt = `
Generate a concise and meaningful title for this note.

Current Title:
${note.title}

Content:
${note.content}

Return only the new title.
`;

        const output = await askAI(prompt);

        res.status(200).json({
            success: true,
            feature: "title",
            original: note.title,
            aiOutput: output
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {summarizeNote,improveGrammar,convertToBullets,generateTitle};