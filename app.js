// const path = require('path');
const express = require('express');
const expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');
const models = require('./models');
var bodyParser = require('body-parser');

const app = express();

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(expressValidator());
app.use(express.static('./public'));

app.get('/', function (req, res) {
  // res.render('index');
  // res.send('we are listening');
  models.TodoList.findAll().then(function(listItems){
    res.render('index', {listItems: listItems})
  });
});
app.post('/', function(req, res){
    newItem = req.body.todoListItem;
    const newListItem = models.TodoList.build({
      listItem: newItem,
      completed: false,
    });
    newListItem.save().then(function (newListItem){
      console.log(newListItem.listItem);
    });

    res.redirect('/');
});
app.get('/completed/:id', function(req, res){
  res.send("we connected fo sho");
})
app.post('/completed/:id', function(req, res){
  let id = req.params.id;
  // models.TodoList.findOne({where: {id: id}}).then(function(listItem){
  //   res.send(listItem);
  //   console.log(listItem);
  models.TodoList.update({completed: true}, {where: {id: id}}).then(function(){
    res.redirect('/');
  })
  })
  // res.send(id);

  // res.redirect('/completed/:id');


app.listen(3000, function () {
  console.log('Successfully started express application!');
});
