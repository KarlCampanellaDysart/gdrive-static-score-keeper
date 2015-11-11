var GoogleSpreadsheet = require("google-spreadsheet");
var totalsSheet = new GoogleSpreadsheet('1JSUb74y3PpnMgeDjahTalpnVSeOvirg03yE2qFbgaKM');

//enums
var names = {
	Champ: 0,
	Ian: 1,
	Miles: 2
};

var creds = require('./../../goodie-feed-253089f4f2f0.json');

module.exports = {

	getStatus: function(name, callback){

		//data object
		var data = {};

		totalsSheet.useServiceAccountAuth(creds, function(err){

		    // getInfo returns info about the sheet and an array or "worksheet" objects 
		    totalsSheet.getInfo(function(err, sheet_info){

		        var sheet2 = sheet_info.worksheets[0];
		        sheet2.getRows(function(err, rows){
		           		        
		         	data.total = rows[names[name]].total;
		         	data.text = rows[names[name]].text;

		         	callback(data);
		        });
		    });
		});
	}
};