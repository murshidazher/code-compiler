const { exec, spawn } = require('child_process');

var executeCSharp = function (stdin, callback, exetime) {

    var flag = 1;
    let time = new Date().getTime() / 1000;
    exec('javac Main.java', (err, stdout, stderr) => {
        if (err) {
            output = err + ""
            console.log(err + "")
            output = output.replace('Error: Command failed: javac Main.java', '')
            callback(output, "", new Date().getTime() / 1000 - time)
        } else {
            if (stderr) {
                output = stderr + ""
                console.log(stderr)
                callback(output, "", new Date().getTime() / 1000 - time)
            } else {
                var process = spawn('java', ['Main'])
                var stderror = ''
                var stdoutput = ''
                var chk = false
                var timeout = setTimeout(function () {
                    process.stdin.pause();
                    process.kill()
                    chk = true
                    flag = 0
                }, 25000) // Max 25s runtime

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
        }
    })
}


const handleCSharpCompiler = () => (req, res) => {
    const { input } = req.body; // custom system args

    return executeCSharp(input, (stderr, stdout, exetime) => {
        res.status(200)
            .json({
                error: stderr,
                output: stdout,
                exetime: exetime
            });
    })
}

module.exports = {
    handleCSharpCompiler: handleCSharpCompiler
}