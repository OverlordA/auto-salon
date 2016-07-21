const express = require('express');
const bodyParser= require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('html/images'));
app.use(express.static('html/car'));
app.set('views',(__dirname, 'views'));
app.set('view engine', 'ejs');


var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
    var url = 'mongodb://192.168.2.108/auto';

    MongoClient.connect(url, function(err, db) { 
	var collection = db.collection('avto');
	
	
app.get('/', function(req, res) {
	var imgtype1 = "sedan.png" ;
	var type1 = "Седан";
	var imgtype2 = "hetchbac.png" ;
	var type2 = "Хетчбек";
	
  //res.send('Hello World');
	res.render('index', { 
	imgtype1: imgtype1,
	type1:type1,
	imgtype2: imgtype2,
	type2:type2,
  });
})
//



app.post('/sedan', (req, res) => {
	assert.equal(null, err);
	console.log("Connected correctly to server");
	
	collection.find({type:"седан"},{_id:0}).toArray(function(err, results) {
        console.log(results[0]);
		
		//перша машина 
		var imgs1 = "sedan/ford.jpg";
		var typeavto1 = "седан";
		var probig1 = "54 т.км";
		var typeengine1 = "бензин 1.4";
		var transmision1 = "механічна";
		var privod1 = "передній";
		var vitraty1  = "4л.100км";
		//друга машина 
		var imgs2 = "sedan/hunday.jpg";
		var typeavto2 = "седан";
		var probig2 = "54 т.км";
		var typeengine2 = "бензин 1.4";
		var transmision2 = "механічна";
		var privod2 = "передній";
		var vitraty2  = "4л.100км";
		//третя машина 
		var imgs3 = "sedan/toyota.jpg";
		var typeavto3 = "седан";
		var probig3 = "54 т.км";
		var typeengine3 = "бензин 1.4";
		var transmision3 = "механічна";
		var privod3 = "передній";
		var vitraty3  = "4л.100км";
		
		res.render('cars', results);
		
		res.render('car', { 
		imgs1:imgs1,
		typeavto1:typeavto1,
		probig1:probig1,
		typeengine1:typeengine1,
		transmision1:transmision1,
		privod1:privod1,
		vitraty1:vitraty1,
		imgs2:imgs2,
		typeavto2:typeavto2,
		probig2:probig2,
		typeengine2:typeengine2,
		transmision2:transmision2,
		privod2:privod2,
		vitraty2:vitraty2,
		imgs3:imgs3,
		typeavto3:typeavto3,
		probig3:probig3,
		typeengine3:typeengine3,
		transmision3:transmision3,
		privod3:privod3,
		vitraty3:vitraty3
	  });
    });

	 });


  
 
	 
	 
	 
})


app.post('/choiscar', (req, res) => {
	var model = "honda civic";
	res.render('registration', {model:model });
	
	
	
	})
	
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