var app_pdf = angular.module('app', ['pdf']);
(function(app){

	app.controller('pdfCtrl', function($scope) {

		$scope.pdfName = 'apis-php-en';
		$scope.pdfUrl = url_pdf.key;
		$scope.scroll = 0;

	  	$scope.getNavStyle = function(scroll) {
		    if(scroll > 100) return 'pdf-controls fixed';
		    else return 'pdf-controls';
	  	}

	});
})(app_pdf)
