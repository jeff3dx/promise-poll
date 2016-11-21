/**
 * promise-poll
 * Poll an asynchronous operation that is itself a Promise.
 * @author jbutsch@netflix.com https://github.com/jeff3dx/promise-poll
 *
 * @param   {func}   targetPromiseFn - Your function that returns a Promise. Resolve falsy to poll again or truthy to finish
 * @param   {Number} intervalMs      - Wait time between polls
 * @param   {Number} timeoutMs       - Polling quits after this duration. Won't interupt the poll in progress.
 * @returns {Promise}                - The resulting Promise resolves when polling is finished
 */
function pollPromise(targetPromiseFn, intervalMs, timeoutMs) {
  var endTime = Date.now() + timeoutMs;
  return new Promise(function(resolve, reject) {
    _poll(targetPromiseFn, intervalMs, endTime, resolve);
  });
}

function _poll(targetPromiseFn, intervalMs, endTime, resolve) {
  var pollagain = _poll.bind(this, targetPromiseFn, intervalMs, endTime, resolve);
  return targetPromiseFn()
  .then(function(done) {
    if (!!done) {
      resolve(done);
    } else if (Date.now() > endTime) {
      console.log('pollPromise resolve on timeout');
      resolve(null);
    } else {
      setTimeout(pollagain, intervalMs);
    }
  })
  .catch(function(ex) {
    resolve(null);
  })
}

module.exports = {
  pollPromise: pollPromise
};