// created by Reynold Harbin on 5/24/17
// reynold@digitalocean.com

// module dependencies
var express = require('express');
var exphbs = require('express-handlebars');  
var _ = require('underscore');
var request = require('request');
var app = express();
var PORT = process.env.port || 80;
var prefix = '/dofindme/';

//other code
var config = require('./config-web.js');
var actions = require('./actions-web.js');

//variables
var logTag = "web-devquest.js:";

if (config.build.forProduction) {
	console.log(logTag + "initializing for production environment.");
	var findmeAPIUrl = config.settings.prodAPIUrl;
} else {
	console.log(logTag + "initializing for development environment.");
	var findmeAPIUrl = config.settings.devAPIUrl;
};

//use handlebars templating engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//GET index
app.get('/', function(req, res){
	if (req.headers.host == 'api.devquest.io' ) {
		console.log(logTag+"api.dofind.me, rendering index page.  header:"+req.headers.host);
		res.render('index');
	} else {
		console.log(logTag+"www.dofind.me, rendering index page.  header:"+req.headers.host);
		res.render('index');
	}
})

//GET index page 
app.get('/index', function(req, res){
	res.render('index');  
})


// GET 
app.get('/search', function (req, res) { //was app.get('/search/:site', function (req, res) {
	
	//this should generate a web page with:
	// 1. An widget to input the search term
	// 2. A selector for which developer sites (gihub, stackexchange, others) to search
	// 3. A search results table


	// captured input should populate these variables
	var searchTerm = req.query.searchterm;
	var searchSiteArray = [];
	searchSiteArray.push("github"); //at least one developer site, but array can have as many as the max sites where we have integrated the sites search API
	searchSiteArray.push("stackexchange");
	
	if (searchSiteArray) {
		console.log(logTag+"search:with searchSiteArray: "+searchSiteArray);
	} else {
		console.log(logTag+"search:nil searchSiteArray");
	}

	if (searchTerm) {
		console.log(logTag+"search:with searchTerm: "+searchTerm);
	} else {
		console.log(logTag+"search:nil searchTerm");
		res.render('index');
	}

	console.log(logTag+"search:calling APIUrl: "+findmeAPIUrl);


		
	var requestBody = {};
    requestBody.searchterm = searchTerm;
    requestBody.searchsite = "github";
    requestBody.searchsitearray = searchSiteArray;
		
	request({
		url: findmeAPIUrl, 
    	method: 'POST', //Specify the method
    	
    	headers: { //Specify headers 
    		'Content-Type': 'application/json',
	        'X-Application-Id': config.apikeys.doFindMeAppId,  //future
	        'X-REST-API-Key': config.apikeys.doFindMeClientAppId //future
	    	},
	    
		body: JSON.stringify(requestBody)

	   


	}, function(error, response, body){
		if (error){
			console.log("search:unable to search with error:"+JSON.stringify(body));
			res.render('error');
			
		} else {
			
			var responseStatusCode = response.statusCode;
			var responseHeaders = response.headers;
			var bodyObject = JSON.parse(body);
			console.log("ZOO:0:"+logTag+"search:with body.searchTerm:"+bodyObject.searchTerm);
			console.log("ZOO:1:"+logTag+"search:with body.totalResultsCount:"+bodyObject.totalResultsCount);
			console.log("ZOO:2:"+logTag+"search:with body.itemsReturnedCount:"+bodyObject.itemsReturnedCount);
			//console.log("ZOO:3:"+logTag+"search:with body:"+body);

			//set up variables to send into the view //RMH-HERE-99-NOW
			var sterm = body.searchTerm, 
				ssite = "github",
				stotalResultsCount = bodyObject.totalResultsCount,
				sreturnedReturnedCount = bodyObject.itemsReturnedCount,  
				sresultsperpage = bodyObject.resultsPerPage,
				
				stotalpages = bodyObject.totalPages,
				scurrentpage = bodyObject.currentPage, 
				sresultsarray = bodyObject.resultsArray;

			if (body) {
				//check resultsMeta //meta about the results, like searchSite, searchTerm, resultsAvailable
				res.render('results', { //generate eventfullUserConfirmed.html
					searchTerm: searchTerm,
					searchSite: ssite,
					totalResults: numberWithCommas(stotalResultsCount),
					returnedResults: sreturnedReturnedCount,
					resultsArray: sresultsarray


				});


			} else {
				console.log("ERROR:"+logTag+"nil searchResult...");
				res.render('error'); 
			};
		}
	})
});


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

app.use(express.static(__dirname + '/public'));
console.log(__dirname);

app.listen(PORT, function(){
	console.log("******************************************************");
	console.log("**--> DevQuest.io web server started on port:" + PORT);
	console.log("");
});
