const { spawn } = require('child_process');


var executePython = function (stdin, callback, exetime) {
    let flag = 1;
    let time = new Date().getTime() / 1000;
    var process = spawn('python', ['questions/two-sum/python/SolutionTester.py']);
    var stderror = '';
    var stdoutput = '';
    var chk = false;

    var timeout = setTimeout(function () {
        process.stdin.pause();
        process.kill()
        chk = true
        flag = 0
    }, 20000) // more than 20 seconds


    if (stdin != '') {
        process.stdin.write(stdin + " \n")
        process.stdin.end()
    } else {
        process.stdin.write(stdin + " \n")
        process.stdin.end()
    }

    process.stdout.on('data', (data) => {
        stdoutput += data
    })

    process.stdout.on('end', () => {
        process.kill()
        chk = true
    })

    process.stderr.on('data', (data) => {
        stderror += data.toString()
    })

    process.stderr.on('end', () => {
        process.kill()
        chk = true
    })

    process.on('close', (code) => {
        if (code == 0) {
            output = stdoutput + ""
            console.log(stdoutput)
            callback("", output, new Date().getTime() / 1000 - time)
        } else {
            output = stderror + ""
            process.kill()
            chk = true
            console.log(stderror)
            if (flag == 0)
                output = 'TimeLimitExceededException'
            callback(output, "", new Date().getTime() / 1000 - time)
        }
    })

    if (chk)
        clearInterval(timeout)
}


const handlePythonCompiler = () => (req, res) => {
    const { input } = req.body; // custom system args

    return executePython(input, (stderr, stdout, exetime) => {
        res.status(200)
            .json({
                error: stderr,
                output: stdout,
                exetime: exetime
            });
    })
}

module.exports = {
    handlePythonCompiler: handlePythonCompiler
}