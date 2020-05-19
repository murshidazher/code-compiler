const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const fs=require('fs');
var path=require('path');

// handlers
const pythonFile = require('./controllers/pythonFile');
const javaFile = require('./controllers/javaFile');
const csFile = require('./controllers/csFile');

// middlewares
const writer = require('./middleware/writeToFile');

const PORT = process.env.PORT || 4001;
const app = express();

app.use(bodyParser.json());
app.use(cors());

// end points 
app.get('/', (req, res) => {
    res.json({ 'greeting': 'Helloo' });
})

app.post('/python', writer.writeToFile(fs, 'python'), pythonFile.handlePythonCompiler())
app.post('/java', writer.writeToFile(fs, 'java'), javaFile.handleJavaCompiler())
app.post('/csharp', writer.writeToFile(fs, 'csharp'), csFile.handleCSharpCompiler())

app.listen(PORT, () => {
	console.log(`🚀 Server is listening on port ${PORT}`)
})