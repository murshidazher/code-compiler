# [Code Compiler](https://github.com/murshidazher/code-compiler)

> A super light-weight code compiler using Express.js
 
A light-weight code compiler with test case checking and much more... implemented using Express.js

## Technology Stack
* :zap: [ExpressJS](https://expressjs.com/) - lightweight web framework for Nodejs.

### Native Compiler Dependencies

You need to have the following compilers installed

* :package: [JavaSE JDK 11+](https://www.oracle.com/java/technologies/javase-jdk13-downloads.html) - Java SDK 11+ for single-line compilation
* :package: [Python 3](https://www.python.org/downloads/) - download the Python 3.+ version and set the `env` path
* :package: [.NET Compiler](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-options/command-line-building-with-csc-exe) - Enable command-line compilation for CSharp .NET and the set the `env` variable to access `csc` compiler

### Instructions

Step by Step Instructions:

| Task             | Description                                                                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| dependencies         | Run `npm i` to download the required node modules 
| start         | Run `npm start` to start react in dev mode using nodemon
| test        | Run `npm run test` to run unit tests.

### :open_file_folder: What's inside?

A quick look at the folder structure of this project.
    
    .
    └── root
        ├─controllers
        ├───csFile.js
        ├───javaFile.js
        └───pythonFile.js
        ├─middleware
        └───writeToFile.js
        ├─questions
          ├─question_name
          ├───csharp
              ├───Solution.cs
              ├───SolutionTester.cs
              ├───RealSolution.cs
              └───Template.cs
          ├───java
          ├───javascript
          ├───python
          └───testcase.txt 
        ├─package.json
        ├─package-lock.json
        ├─server.js
        └─README.md

### Support Programing Languages

>:bulb: You can use this tool to escape code characters when testing [code-santizer](https://www.freeformatter.com/java-dotnet-escape.html#ad-output)

- [x] Python
- [x] Java
- [x] CSharp
- [x] JavaScript


## Body Request Configuration

#### Argument 1
Name: `code`<br/>
Type: `String`  
> Default: :warning: This field is required

This contains the solution for the given problem. 

> :warning: Sanitize the code before sending it through the body.

#### Argument 2
Name: `input`<br/>
Type: `String`  
Default: `null`

This contains the user inputs for the given problem. It could be `null` if there isn't any user inputs.


Example:
```json
// endpoint - http://localhost:4001/python
{
    "code":"class Solution(object):\r\n    
                def twoSum(self, nums, target):\r\n       
                    if nums is None :\r\n            
                        return [1,0]\r\n        
                    if len(nums) <= 1:\r\n            
                        return [0,0]\r\n        
                    buff_dict = {}\r\n       
                    for i in range(len(nums)):\r\n            
                        if nums[i] in buff_dict:\r\n               
                            return [buff_dict[nums[i]], i]\r\n            
                        else:\r\n                
                            buff_dict[target - nums[i]] = i",
	"input":"10"
}
```

### Supporting Test Case Languages

- [x] Python
- [x] Java
- [x] CSharp
- [x] JavaScript

## Contributors

**Murshid Azher**

- Github: [@murshidazher](https://github.com/murshidazher)