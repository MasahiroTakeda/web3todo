var Web3 = require('web3');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://<GETHO_SUBDOMAIN>.getho.io:80/jsonrpc'));

const todoAddr = '<TODO_CONTRACT_ADDRESS>';
const abi = [{"constant":false,"inputs":[{"name":"text","type":"string"}],"name":"newTask","outputs":[{"name":"taskID","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"done","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfTasks","outputs":[{"name":"length","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getByIndex","outputs":[{"name":"text","type":"string"},{"name":"done","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]

var todoContract = new web3.eth.Contract(abi, todoAddr);

web3.eth.getAccounts()
    .then((accounts) => {
        web3.eth.defaultAccount = accounts[0];
        console.log('set default account to ' + accounts[0]);
        app.listen(3000)
        console.log('app is running');
    }
);

app.get('/', function(req, res, next){
    function getTask(index, addr) {
        return todoContract.methods.getByIndex(index).call({ from: addr })
    }

    todoContract.methods.getNumberOfTasks().call({ from: web3.eth.defaultAccount })
        .then((r) => {
            var promises = [];
            for (var i = 0; i < r; i++) {
                promises.push(getTask(i, web3.eth.defaultAccount))
            }
            Promise.all(promises)
                .then((results) => {
                    res.render('./index.ejs', { tasks: results })
            });
    })
});

app.post('/tasks', function(req, res, next){
    var todoText = req.body.todo_text;
    var p = todoContract.methods.newTask(todoText).send({ from: web3.eth.defaultAccount });
    p.then((r) => {
        res.redirect(302, '/');
    });
});

app.post('/:id*/done', function(req, res, next) {
    var p = todoContract.methods.done(req.params.id).send({ from: web3.eth.defaultAccount });
    p.then((r) => {
        res.redirect(302, '/');
    });
});