import Note from "../models/Note.js";





export async function getAllNotes (_, res) { // since req never used in this function, use _ instead
    

    try {
        const notes = await Note.find().sort({createdAt:-1}); // show newest entry first
        res.status(200).json(notes);

    } catch (error) {
        console.error("error in getAllNotes controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function getNoteById(req,res) {
    try {
        const foundNote = await Note.findById(req.params.id);
        if(!foundNote) return res.status(404).json({message: "specific note not found"});
        res.json(foundNote);
        
    } catch (error) {
        console.error("error in getNoteById controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function createNote(req,res) {
    
    try {
        const {title,content} = req.body;
        const note = new Note({title, content});

        const savedNote = await note.save();
        res.status(201).json(savedNote);

    } catch (Error) {
        console.error("error in createNote controller", error);
        res.status(500).json({message:"Internal server error"});

    }

}

export async function updateNote(req,res) {
    

    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            {
                new: true,
            }
        );

        if(!updatedNote) return res.status(404).json({message:"file not found"});

        res.status(200).json({message:"note updated successfully"});
    } catch (error) {
        console.error("error in updateNote controller", error);
        res.status(500).json({message:"Internal server error"});
    }

}

export async function deleteNote (req,res) {


    try {
        const { title, content} = req.body;
        const deletedNote = await Note.findByIdAndDelete(
            req.params.id,
            { title, content }
        );

        if(!deletedNote) return res.status(404).json({message: "file not found cant delete"});

        // if u leave out status code , it will generate automatically
        res.json({message: " file deleted successfully"});
    } catch (error) {
        console.error("Error in deleteNode controller", error);
        res.status(500).json({message: "internal server error"});
    }

}