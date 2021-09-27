onmessage = (e) => {
  console.log("worker received data, start mapping.");

  // Return object with typeof for every value in the object
  const types = function (key) {
    return e.data.data.map((el) => {
      return typeof el[key];
    });
  };
  // Tallys the types to return how many of each type each key has.
  const tallyTypes = function () {
    let obj = {};
    e.data.meta.forEach((key) => {
      obj[key] = {};
      types(key).map((el) => {
        obj[key][el] = obj[key][el] + 1 || 1;
      });
    });
    return obj;
  };
  const workerResult = tallyTypes();
  postMessage(workerResult);
};
