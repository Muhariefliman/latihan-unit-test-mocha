const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(3000, () => {console.log('Server is running on port 3000')});

let tasks = [
    {
        id: 1,
        name: 'Learn NodeJS',
        status: 'In Progress'
    },
    {
        id: 2,
        name: 'Learn ReactJS',
        status: 'In Progress'
    },
    {
        id: 3,
        name: 'Learn AngularJS',
        status: 'In Progress'
    },
    {
        id: 4,
        name: 'Learn VueJS',
        status: 'Done'
    }
]

const wrapper = (data, code, status) =>{
    return {
        code: code,
        status: status,
        data: data
    }
}

app.get('/task/all', (req, res) => {
    try {
        res.send(wrapper(tasks, 200, 'OK'));
    } catch (error) {
        res.send(wrapper(error.message, 404, 'FAILED'));
    }
});

app.get('/task/:id', (req, res) => {
    let id = req.params.id;
    let task = tasks.find(t => t.id == id);
    if(task){
        res.send(wrapper(task, 200, 'OK'));
    }else{
        res.send(wrapper(null, 404, 'Not Found'));
    }
});

app.post('/task/add', (req, res) => {
    let task = req.body;
    task.id = tasks.length + 1;
    tasks.push(task);
    res.send(wrapper(task, 200, 'OK'));
});

app.post('/task/update', (req, res) => {
    let task = req.body;
    let index = tasks.findIndex(t => t.id == task.id);
    if(index >= 0){
        tasks[index] = task;
        res.send(wrapper(task, 200, 'OK'));
    }else{
        res.send(wrapper(null, 404, 'Not Found'));
    }
});

app.post('/task/delete', (req, res) => {
    let task = req.body;
    let index = tasks.findIndex(t => t.id == task.id);
    if(index >= 0){
        tasks.splice(index, 1);
        res.send(wrapper(task, 200, 'OK'));
    }else{
        res.send(wrapper(null, 404, 'Not Found'));
    }
});

module.exports = app;