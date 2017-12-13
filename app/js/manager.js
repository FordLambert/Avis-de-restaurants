$(document).ready(function () {

	 $.ajax({
	 	type: "GET",
	 	url: "js/data/restaurant_list.json",
	 	success: function(result) {
 			console.log(result);
 		},

 		error : function(XMLHttpRequest, textStatus, errorThrown){
 			console.log('XHR ERROR ' + XMLHttpRequest.status);
       }

 	});
});