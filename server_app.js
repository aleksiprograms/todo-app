/*
A backend app to manage the requests from the frondend:
-return all tasks from database
-add a new task to database
-delete a existing task from database
-update a existing task in database

The app is using express and mongodb database
*/

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const databaseUrl = "mongodb://localhost:27017/";
const databaseName = "databaseTodoApp";
const collectionName = "collectionTasks";
const port = 8080;
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/tasks', function(req, res) {
  MongoClient.connect(databaseUrl, function(err, db) {
    if (err) throw err;
    db.db(databaseName).collection(collectionName).find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
});

app.post('/tasks', function(req, res) {
  MongoClient.connect(databaseUrl, function(err, db) {
    if (err) throw err;
    db.db(databaseName).collection(collectionName).insertOne(req.body, function(err, obj) {
      if (err) throw err;
      res.sendStatus(200);
      db.close();
    });
  });
});

app.delete('/tasks/:id', function(req, res) {
  MongoClient.connect(databaseUrl, function(err, db) {
    if (err) throw err;
    let query = {_id: new mongodb.ObjectID(req.params.id)};
    db.db(databaseName).collection(collectionName).deleteOne(query, function(err, obj) {
      if (err) throw err;
      res.sendStatus(200);
      db.close();
    });
  });
});

app.put('/tasks/:id', function(req, res) {
  MongoClient.connect(databaseUrl, function(err, db) {
    if (err) throw err;
    let query = {_id: new mongodb.ObjectID(req.params.id)};
    let newvalues = {$set: {item: req.body.item}};
    db.db(databaseName).collection(collectionName).updateOne(query, newvalues, function(err, obj) {
      if (err) throw err;
      res.sendStatus(200);
      db.close();
    });
  });
});

app.listen(port);
console.log("Listening port " + port + "...");
