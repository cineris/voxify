const { PythonShell } = require('python-shell')


let x = [
    {
        'YTS': '10',
        'WIP': '0',
        'APPROVED': '0' 
    },
    {
        'YTS': '9',
        'WIP': '1',
        'APPROVED': '0' 
    },
    {
        'YTS': '8',
        'WIP': '2',
        'APPROVED': '0' 
    },
    {
        'YTS': '7',
        'WIP': '2',
        'APPROVED': '1'
    },
    {
        'YTS': '5',
        'WIP': '4',
        'APPROVED': '1'
    },
    {
        'YTS': '4',
        'WIP': '3',
        'APPROVED': '3'
    },
    {
        'YTS': '3',
        'WIP': '4',
        'APPROVED': '3'
    },
    {
        'YTS': '1',
        'WIP': '6',
        'APPROVED': '3'
    },
    {
        'YTS': '0',
        'WIP': '5',
        'APPROVED': '5'
    },
    {
        'YTS': '0',
        'WIP': '3',
        'APPROVED': '7'
    },
    {
        'YTS': '0',
        'WIP': '1',
        'APPROVED': '9'
    },
    {
        'YTS': '0',
        'WIP': '0',
        'APPROVED': '10'
    },
]

var json_string = JSON.stringify(x)

const options = {
    scriptPath: 'public/assets/python',
    pythonOptions: ['-u'],
    args: json_string
}
PythonShell.run('test.py', options).then( (messages) => {
    console.log(messages)
    result = JSON.parse(messages)
    console.log(result)
})