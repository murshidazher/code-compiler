/**
 * Note: java single-line execution command requires a minimum JDK v11.
 * For more Information read: https://openjdk.java.net/jeps/330
 * 
 */

const {
    spawn,
    exec,
    execFile
} = require('child_process');

const javaExecutor = require('../questions/two-sum/java/execute');

var executeJava = function (stdin, callback, exetime) {
    var flag = 1
    let time = new Date().getTime() / 1000;
    // let path = 'C:\Users\MurshidAzher\coderoom\code-compiler';
    let questionType = 'two-sum'; 
    let path = __dirname + 'questions\\'+ questionType +'\\java\\';
    exec("cd questions", (err, stdout, stderr) => {
        exec("dir", (err, stdout, stderr) => {
            console.log(stdout)
            exec('javac questions/two-sum/java/SolutionTester.java', (err, stdout, stderr) => {
                if (err) {
                    output = err + ""
                    console.log(err + "")
                    output = output.replace('Error: Command failed: javac SolutionTester.java', '')
                    callback(output, "", new Date().getTime() / 1000 - time)
                } else if (stderr) {
                    output = stderr + ""
                    console.log(stderr)
                    callback(output, "", new Date().getTime() / 1000 - time)
                } else {
                    var process1 = spawn('java', ['questions/two-sum/java/SolutionTester'])
                    var stderror1 = ''
                    var stdoutput1 = ''
                    var chk = false
                    var timeout = setTimeout(function () {
                        process1.stdin.pause();
                        process1.kill()
                        chk = true
                        flag = 0
                    }, 25000)
                    if (stdin != '') {
                        process1.stdin.write(stdin + " \n")
                        process1.stdin.end()
                    } else {
                        process1.stdin.write(stdin + " \n")
                        process1.stdin.end()
                    }
                    process1.stdout.on('data', (data) => {
                        stdoutput1 += data
                    })
                    process1.stdout.on('end', () => {
                        process1.kill()
                        chk = true
                    })
                    process1.stderr.on('data', (data) => {
                        stderror1 += data.toString()
                    })
                    process1.stderr.on('end', () => {
                        process1.kill()
                        chk = true
                    })
                    process1.on('close', (code) => {
                        if (code == 0) {
                            output = stdoutput1 + ""
                            console.log(stdoutput1)
                            callback("", output, new Date().getTime() / 1000 - time)
                        } else {
                            output = stderror1 + ""
                            process1.kill()
                            chk = true
                            console.log(stderror1)
                            if (flag == 0)
                                output = 'TimeLimitExceeded !'
                            callback(output, "", new Date().getTime() / 1000 - time)
                        }
                    })
                    if (chk)
                        clearInterval(timeout)
                }
            })
        })
    })
}


const handleJavaCompiler = () => (req, res) => {
    const {
        input
    } = req.body; // custom system args

    return javaExecutor.excuteTestCase(input, (stderr, stdout, exetime) => {
        res.status(200)
            .json({
                error: stderr,
                output: stdout,
                exetime: exetime
            });
    })
}

module.exports = {
    handleJavaCompiler: handleJavaCompiler
}