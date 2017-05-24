//  Created by Reynold Harbin on 5/24/16.
//  Copyright © 2017 DigitalOcean, LLC. All rights reserved.
//

// module dependencies
var nPromise = require('promise'); 
var _ = require('underscore');
//var moment = require('moment');
var request = require('request');

//other code
var config = require('./config-web.js');
var logTag = "actions-web.js:";

module.exports = {
	
	//exported helper functions
	arrayUnique: function (array) {
	  	var a = array.concat();
	    for(var i=0; i<a.length; ++i) {
	        for(var j=i+1; j<a.length; ++j) {
	            if(a[i] === a[j])
	                a.splice(j--, 1);
	        }
	    }
	    return a;
	 }

}