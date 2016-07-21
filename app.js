const express = require('express');
const bodyParser= require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended: true}))

//app.use(express.static('html/images'));
app.use(express.static('html/car'));
app.set('views',(__dirname, 'views'));
app.set('view engine', 'ejs');

var type;
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
    var url = 'mongodb://192.168.2.108/auto';

    MongoClient.connect(url, function(err, db) { 
	
	
	
app.get('/', function(req, res) {
	var collection = db.collection('categories_auto');
		assert.equal(null, err);
		console.log("Connected correctly to server");
		collection.find({},{_id:0}).toArray(function(err, results) {
    //    console.log(results[0]);
	
		res.render('index', {results:results});
	//type = result[0].type;
    });
		
  //res.send('Hello World');

})
//



app.post('/sedan', (req, res) => {
	var collection = db.collection('avto');
	assert.equal(null, err);
	console.log("Connected correctly to server");
	
	collection.find({type:"седан"},{_id:0}).toArray(function(err, results) {
    //    console.log(results[0]);
	
		res.render('car', {results:results});
	
    });

	 });


  
 
	 
	 
	 
});


app.post('/choiscar', (req, res) => {
	var model = "honda civic";
	res.render('registration', {model:model });
	
	
	
	});
/*

	app.post('/graphic', (req, res) => {
var collection = db.collection('auto-grafic');
	assert.equal(null, err);
	console.log("Connected correctly to server");
	
	collection.find({},{_id:0}).toArray(function(err, results) {
    //    console.log(results[0]);
	
		res.render('graphic_car', {results:results});
	
    });

});
	*/
	app.post('/regform', (req, res) => {
 console.log(req.body);
  
  // добавлення дока
  var insertDocuments = function(db, callback) {
  // Get the documents collection 
  var collection = db.collection('registration');
  // Insert some documents 
  collection.insertOne(
  req.body, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted 1 documents into the document collection");
    callback(result);
  });
}
  

  MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  
  insertDocuments(db, function() {
    db.close();
	
  });
}); 

  
})






app.listen(3000, function() {
  console.log('listening on 3000');
})