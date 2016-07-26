const express = require('express');
const bodyParser= require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//app.use(express.static('html/images'));
app.use(express.static('html/car')); // папка з статичними елементами (картінки)
app.set('views',(__dirname, 'views'));
app.set('view engine', 'ejs');


var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var url = 'mongodb://192.168.2.108/auto';

// підключення до монго сервера
MongoClient.connect(url, function(err, db) { 
	
	
	//головна сторінка 
	app.get('/', function(req, res) {

		var collection = db.collection('categories');
		assert.equal(null, err);
		console.log("Connected correctly to server");
		collection.find({},{_id:0}).toArray(function(err, results) {
   		 //    console.log(results[0]);
	
			res.render('index', {results:results});
	
    	});
		
	});



	//після вибору категорії вивести кілька авто
	app.post('/categories', (req, res) => {
	
		var collection = db.collection('auto');
		assert.equal(null, err);
		console.log("Connected correctly to server");
	
		collection.find({type:req.body.type}).toArray(function(err, results) {
   		 //    console.log(results[0]);
	
			res.render('car', {results:results});
	
    	});

	});

	// після вибору авто виведення графіку тест драйвів
	app.post('/choiscar', (req, res) => {
		//console.log(req.body.model);
 


		var collection = db.collection('auto');
		assert.equal(null, err);
		console.log("Connected correctly to server");

	 	collection.find({model:req.body.model}).toArray(function(err, results){
	
			res.render('graphic_car', {results:results});
	
		});

	});

	//виведення форми для реєстрації користувачів
	app.post('/formrender', (req, res) => {
/*
var updateDocument = function(db, callback) {
  // Get the documents collection 
  var collection = db.collection('auto');
  // Update document where a is 2, set b equal to 1 
  collection.updateOne({ model: 'akcent'}
    , { $set: {graphic[0].[0].emploi:'true'} }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document ");
    callback(result);
  });  
}
 updateDocument(db, function() {
     
    });

*/

		//console.log(req.body.model);
	 console.log(req.body.i);
		var modelavto = req.body.model;
		var timeavto = req.body.times;
		var markaavto = req.body.marka;
	

		res.render('registration', {modelavto:modelavto, timeavto:timeavto, markaavto:markaavto});
	
	});

	 
// монго сервер 
});



	app.post('/regform', (req, res) => {
 		console.log(req.body);
  
  		// добавлення дока
  		var insertDocuments = function(db, callback) {
  			// Get the documents collection 
  			var collection = db.collection('users');
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
  
  
  		insertDocuments(db, function() {
   		 db.close();
	
 
		}); 

	 
	});






app.listen(3000, function() {

	console.log('listening on 3000');

})