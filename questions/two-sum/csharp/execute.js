const {
    spawn,
    exec,
    execFile
} = require('child_process');


var executeCSharp = function (stdin, callback, exetime) {
    var flag = 1
    let time = new Date().getTime() / 1000;
    // let questionType = 'two-sum';
    // let path = __dirname + 'questions\\' + questionType + '\\java\\';
    const options = { cwd: __dirname };

    const compile = spawn('csc', ['SolutionTester.cs', 'Solution.cs', 'ParserUtil.cs'], options);

    compile.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });
      compile.stderr.on('data', (data) => {
        console.log(`compile-stderr: ${String(data)}`);
        callback('1', String(data)); // 1, compile error
      });


    compile.on('close', (data) => {
        if (data === 0) {
            
            var process1 = spawn('SolutionTester', options)
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
                        output = 'TimeLimitExceededException'
                    callback(output, "", new Date().getTime() / 1000 - time)
                }
            })
            if (chk)
                clearInterval(timeout)
        }
    })
}

module.exports = {
    excuteTestCase: executeCSharp
}