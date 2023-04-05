const { PythonShell } = require('python-shell')

let x = 10

const options = {
    scriptPath: 'public/assets/python',
    args: [x]
}
PythonShell.run('test.py', options, (err, result) => {
if (err) throw err
// Send the prediction results back to the frontend
// res.send({ prediction: result })
if (result) console.log(result)
})