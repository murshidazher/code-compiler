const express = require('express');
const bodyParser = require('body-parser');

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

// end points 
app.get('/', (req, res) => {
    res.json({ 'greeting': 'Helloo' });
})

app.post('/python', writer.writeToFile(fs), pythonFile.handlePythonCompiler())
app.post('/java', writer.writeToFile(fs), javaFile.handleJavaCompiler())
app.post('/csharp', writer.writeToFile(fs), csFile.handleCSharpCompiler())

app.listen(PORT, () => {
	console.log(`🚀 Server is listening on port ${PORT}`)
})