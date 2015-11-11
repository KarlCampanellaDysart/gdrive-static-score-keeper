angular
	.module('liveGoodies')
	.controller('mainController', function(goodies, $interval){
		var vm = this;

		var inter = function(){
		
		goodies.getStatsForName('Champ').then(function(data){

			vm.champ = {};
			vm.champ.total = parseInt(data.total);
			vm.champ.text = goodies.parseText(data.text);

			goodies.getStatsForName('Ian').then(function(data){

				vm.ian = {};
				vm.ian.total = parseInt(data.total);
				vm.ian.text = goodies.parseText(data.text);
				goodies.getStatsForName('Miles').then(function(data){

					vm.miles = {};
					vm.miles.total = parseInt(data.total);
					vm.miles.text = goodies.parseText(data.text);

					if(vm.champ.total < vm.ian.total && vm.champ.total < vm.miles.total && vm.ian.total < vm.miles.total){
						vm.champ.place = {text:'1st', color: 'label label-success'};
						vm.ian.place = {text:'2nd', color: 'label label-warning'};
						vm.miles.place = {text:'3rd', color: 'label label-danger'};
					}
					else if(vm.champ.total < vm.ian.total && vm.champ.total < vm.miles.total && vm.ian.total > vm.miles.total){
						vm.champ.place = {text:'1st', color: 'label label-success'};
						vm.miles.place = {text:'2nd', color: 'label label-warning'};
						vm.ian.place = {text:'3rd', color: 'label label-danger'};
					}
					else if(vm.ian.total < vm.champ.total && vm.ian.total < vm.miles.total && vm.champ.total < vm.miles.tota){
						vm.ian.place = {text:'1st', color: 'label label-success'};
						vm.champ.place = {text:'2nd', color: 'label label-warning'};
						vm.miles.place = {text:'3rd', color: 'label label-danger'};
					}
					else if(vm.ian.total < vm.champ.total && vm.ian.total < vm.miles.total && vm.champ.total > vm.miles.tota){
						vm.ian.place = {text:'1st', color: 'label label-success'};
						vm.miles.place = {text:'2nd', color: 'label label-warning'};
						vm.champ.place = {text:'3rd', color: 'label label-danger'};
					}
					else if(vm.miles.total < vm.champ.total && vm.miles.total < vm.ian.total && vm.ian.total < vm.champ.total){
						vm.miles.place = {text:'1st', color: 'label label-success'};
						vm.ian.place = {text:'2nd', color: 'label label-warning'};
						vm.champ.place = {text:'3rd', color: 'label label-danger'};
					}
					else{
						vm.miles.place = {text:'1st', color: 'label label-success'};
						vm.champ.place = {text:'2nd', color: 'label label-warning'};
						vm.ian.place = {text:'3rd', color: 'label label-danger'};
					}
				});
			});
		});
		};

		$interval(inter, 20000);
		inter();
	});


angular
	.module('liveGoodies')
	.factory('goodies', function($http){

		return {
	        getStatsForName: function(name) {
	      
	        	//return a promise
	        	return $http.get('/'+name).then(function(data){  
	        		return data.data;
	        	});
	        },

	        parseText: function(text){
	        	var ntext = text.split('\n');
	        	ntext.pop();
	        	return ntext;
	        }
	    };
	});