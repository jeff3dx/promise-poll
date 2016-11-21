/**
 * promise-poll
 * Poll an asynchronous operation that is itself a Promise.
 * @author jbutsch@netflix.com https://github.com/jeff3dx/promise-poll
 *
 * @param   {func}   targetPromiseFn - Your function that returns a Promise. Resolve falsy to poll again or truthy to finish
 * @param   {Number} intervalMs      - Idle wait time between polls
 * @param   {Number} timeoutMs       - Polling quits after this duration. Won't interupt a poll in progress.
 * @returns {Promise}                - promisePoll returns a Promise that resolves when polling is done
 */
function promisePoll(PromiseFn, intervalMs, timeoutMs) {
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
      console.log('promisePoll stopped polling on timeout');
      resolve(null);
    } else {
      setTimeout(pollagain, intervalMs);
    }
  })
  .catch(function(ex) {
    throw new Error('Error within promisePoll:' + ex);
  })
}

module.exports = {
  promisePoll: promisePoll
};