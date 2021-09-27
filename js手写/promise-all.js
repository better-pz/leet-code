Promise.prototype.all = function(promises) {
  let results = [];
  let promiseCount = 0;
  let promisesLength = promises.length;
  return new Promise(function(resolve, reject) {
    for (let i; i< promisesLength; i++) {
      Promise.resolve(promises[i]).then(function(res) {
        promiseCount++;
        // results.push(res);
        results[i] = res;
        // 当所有函数都正确执行了，resolve输出所有返回结果。
        if (promiseCount === promisesLength) {
          return resolve(results);
        }
      }, function(err) {
        return reject(err);
      });
    }
  });
};
