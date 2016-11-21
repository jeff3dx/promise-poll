	import {
	  promisePoll
	} from 'promise-poll';
	var ONE_SECOND = 1000;
	var TEN_SECONDS = 10000;

	function main() {

	  // Declare a function that returns a Promise. promisePull() takes
	  // a function that returns a Promose like this one:
	  var asynchThing = function () {
	    return new Promise(function (resolve, reject) {
	      setTimeout(function () {
	        // Decide to resolve true or false.
	        //   true will stop the polling loop
	        //   false will allow polling to continue
	        var result = Math.random() > 0.7;
	        resolve(result);
	      }, ONE_SECOND);
	    });
	  }

	  var timeout = Date.now() + TEN_SECONDS;

	  // promisePoll() will do the looping and run the async operation many
	  // times until it resolves truthy or reaches the timeout
	  promisePoll(asynchThing, ONE_SECOND, timeout)
	    .then(function (result) {
	        console.log('Polling done. Result: ' + result;
	        });
	    }