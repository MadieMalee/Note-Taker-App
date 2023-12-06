const router = require('express').Router();
var fs = require("fs");
const dbFilePath = './db/db.json';

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}

const readFile = () => {
    try {
        if (fs.existsSync(dbFilePath)) {
            const fileContents = fs.readFileSync(dbFilePath);
            return JSON.parse(fileContents);
        }else{
            console.log('Unable to find file');
            return null;
        }
    }catch(e){
        console.log(e);
    }
    return null;
}

router.get('/', (req, res) => {
    //read the file
    let notesData = readFile();
    if (!notesData){
        res.status(404).send('There was a problem reading the file')
    }
    return res.status(200).send(notesData);
});

router.post('/', (req, res) => {
    //get the title and text
    const title = req?.body?.title;
    const text = req?.body?.text;
    if (!title || !text){
        return res.status(400).send("Missing title or text for note");
    }

    //read the file
    let notesData = readFile();
    if (!notesData){
        res.status(404).send('There was a problem reading the file');
    }
    
    //create a unique id
    const newId = uuidv4();
    //add our fields
    const newNote = {
        id: newId,
        text,
        title
    };

    //add object to json
    notesData.push(newNote);

    //save the data
    fs.writeFileSync(dbFilePath, JSON.stringify(notesData));
    return res.status(200).send(`Successfully created new note`);
})

router.delete('/:id', (req, res) => {
    const noteId = req?.params?.id;
    if (!noteId){
        return res.status(400).send("Missing title or text for note");
    }

    //load the data
    let notesData = readFile();
    if (!notesData){
        return res.status(404).send('There was a problem reading the file');
    }

    //modify the list
    const modifiedData = notesData.filter(singleNote => singleNote.id != noteId);

    //save the data
    fs.writeFileSync(dbFilePath, JSON.stringify(modifiedData));
    
    //return a good status
    return res.status(200).send(`Successfully delete note with id: ${noteId}`);
})

module.exports = router;