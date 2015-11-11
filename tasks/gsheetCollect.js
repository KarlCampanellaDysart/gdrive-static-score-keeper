var GoogleSpreadsheet = require("google-spreadsheet"),
	schedule = require('node-schedule');
	fs = require('fs');

//input and totals google sheets
var inputSheet = new GoogleSpreadsheet('1UuGlMpJ1do1DZRojVA_YFBhYw3uQ5skl7K6q3AYahtU'),
	totalsSheet = new GoogleSpreadsheet('1JSUb74y3PpnMgeDjahTalpnVSeOvirg03yE2qFbgaKM');

//enums
var names = {
	Champ: 0,
	Ian: 1,
	Miles: 2
};

var creds = require('../goodie-feed-253089f4f2f0.json');

module.exports = {

	init: function(){

		//pull form submissions every 
		var graphCollect = schedule.scheduleJob('* * * * *', function(){
			inputSheet.useServiceAccountAuth(creds, function(err){
			    // getInfo returns info about the sheet and an array or "worksheet" objects 
			    inputSheet.getInfo(function(err, sheet_info){

			        var sheet1 = sheet_info.worksheets[0];
			        sheet1.getRows(function(err, allRows){

			            totalsSheet.useServiceAccountAuth(creds, function(err){

						    // getInfo returns info about the sheet and an array or "worksheet" objects 
						    totalsSheet.getInfo(function(err, sheet_info){

						        var sheet2 = sheet_info.worksheets[0];

						     
						        sheet2.getRows(function(err, rows){

						        	var totalText = '';

						            //go through all submitted goodies
						         	for(var i=0;i<allRows.length;i++){


						         		//get number of goodies and validate
						         		var num = parseInt(allRows[i].howmanygoodiesdidyougive);

						         		//name should be pre-validated
						         		var name = allRows[i].whodidyougivegoodiesto;
						         		if(num && num > 0){

						         			//get goodies and save new value
						         			var curGoodies = parseInt(rows[names[name]].total);
						         			rows[names[name]].total = curGoodies - num;

						         			//append text
						         			var appendedText = num + ' from ' + allRows[i].whatisyourname + ' (' + allRows[i].timestamp + ')' + ' for: ' + allRows[i].whydidyougivethegoodies + ' :to '+name+'\n';
						         			rows[names[name]].text += appendedText;
						         			totalText += appendedText;					   	
						         		}

						         		//clear cell
						         		allRows[i].del();
						         		allRows[i].save();
						         	}

									fs.appendFile('history.txt', totalText, function (err) {
										if (err) throw err;
									});

						         	for(var j=0;j<rows.length;j++){ 
						         		rows[j].save( function(){
						         			console.log('row '+ j + ' saved');
						         		}); 
						        	}
						        });
						    });
						});
			        });
			    });
			});
		});
	}
};
