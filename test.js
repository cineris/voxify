const { PythonShell } = require('python-shell')

let x = 10

const options = {
    scriptPath: 'public/assets/python',
    pythonOptions: ['-u'],
    args: [x]
}
PythonShell.run('test.py', options).then( (messages) => {
    console.log(messages)
})