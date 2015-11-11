//inport things
var express = require('express');
var app = express();

//init to schedule 
var gsheetCollect = require('./tasks/gsheetCollect');
gsheetCollect.init();

var gsheet = require('./app/services/googleSheet');

app.use(express.static(__dirname + '/public'));

app.get('/champ', function(req, res) {

	gsheet.getStatus('Champ', function(data){
		res.json(data);
	});
});

app.get('/ian', function(req, res) {

	gsheet.getStatus('Ian', function(data){
		res.json(data);
	});
});

app.get('/miles', function(req, res) {

	gsheet.getStatus('Miles', function(data){
		res.json(data);
	});
});

//listen
app.listen(3000, function() { console.log('Listening on port 3000'); });