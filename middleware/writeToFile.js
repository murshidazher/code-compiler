const cleanCode = (code) => {
    let refactored = code.toString();
    refactored.replace("\r\n"," ");
    return refactored;
}

const getFileName = (filetype) => {
    if(filetype=='python') 
        return 'Solution.py';
    else if(filetype=='java') 
        return 'Solution.java';
    else if(filetype=='csharp') 
        return 'Main.cs';
    else 
        'example.txt'; // if non of the types matched
}

const writeToFile = (fs, filetype) => (req, res, next) => {
    console.log(req.body)
    let { code } = req.body;

    let clnCode = cleanCode(code);

    let filename = getFileName(filetype);
    let filepath = "./questions/two-sum/" + filetype + "/" + filename;

    fs.writeFile(filepath, clnCode, (err)=>{
        if(err) {
            console.log(err);
            return res.status(600).json(err);
        }

        return next(); // else the write was success move to the next
    })
}

module.exports = {
    writeToFile: writeToFile
}