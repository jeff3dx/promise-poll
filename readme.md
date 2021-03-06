# Promise Poll
It's easy to poll based on the result of a predicate function, but what about Promises?

Promises return immediately and only "resolve" later. How can you poll a Promise operation without it returning immediately and end up with hundreds of unresolved Promises on the stack? Save time figuring this out by using promisePoll!

##Install
	npm install https://github.com/jeff3dx/promise-poll --save


## Usage
	import { promisePoll } from 'promise-poll';
	
	promisePoll(targetPromiseFn, intervalMs, timeoutMs)
	  .then(function(result) { 
	    // todo after polling stops 
	  });

#### targetPromiseFn
Function that returns a Promise. The Promise should perform your asynchronous operation (AJAX, etc.) and resolve either truthy or falsy.

- If it resolves truthy polling will stop.
- If it resolve falsy polling will continue.

#### intervalMs
Idle time to wait between each poll. Duration of the async operation itself is not counted.

#### timeoutMs
Duration after which polling will stop regardless of the asynch operation result. Will not interupt a poll in progress.

#### return value
Returns a Promise. When polling is done promisePoll will resolve itself with the data from the target promise.

You can resolve complex data. Just resolve either your `data` (truthy ) or `null` (falsy).

## Example
(see example.js):

	import { promisePoll } from 'promise-poll';
	var ONE_SECOND = 1000;
	var TEN_SECONDS = 10000;
	
	function main() {
	
	  // Declare a function that returns a Promise. promisePull() takes
	  // a function that returns a Promose like this one:
	  var asynchThing = function () {
	    return new Promise(function (resolve, reject) {
	      setTimeout(function () {
	        // Decide to resolve truthy or falsy
	        var result = Math.random() > 0.7;
	        resolve(result);
	      }, ONE_SECOND);
	    });
	  };
	
	  var timeout = Date.now() + TEN_SECONDS;
	
	  // promisePoll() will do the looping and run the async operation many
	  // times until it resolves truthy or reaches the timeout
	  promisePoll(asynchThing, ONE_SECOND, timeout)
	    .then(function (result) {
	      console.log('Polling done. Result: ' + result);
	    });
	}
