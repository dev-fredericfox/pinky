onmessage = (e) => {
  console.log("worker received data, start mapping.");
  console.log(e);

  console.log("evaluating min.");
  const getMin = function () {
    let obj = {};
    e.data.meta.forEach((key) => {
      obj[key] = e.data.data.reduce((acc, val) => {
        if (
          (val[key] || val[key] === 0) &&
          typeof val[key] == "number" &&
          (acc > val[key] || acc == undefined)
        ) {
          acc = val[key];
        }
        return acc;
      }, undefined);
    });
    return obj;
  };

  console.log("evaluating max.");
  const getMax = function () {
    let obj = {};
    e.data.meta.forEach((key) => {
      obj[key] = e.data.data.reduce((acc, val) => {
        if (
          val[key] &&
          typeof val[key] == "number" &&
          (acc < val[key] || acc == undefined)
        ) {
          acc = val[key];
        }
        return acc;
      }, undefined);
    });
    return obj;
  };

  const checkBinary = function () {
    let objSize = {};
    let objKey = {};
    e.data.meta.forEach((key) => {
      let uniques = new Set();
      e.data.data.forEach((el) => {
        uniques.add(el[key]);
      });
      objSize[key] = uniques.size;
      objKey[key] = [...uniques];
    });
    return { objSize, objKey };
  };

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
  const min = getMin();
  const max = getMax();
  const bin = checkBinary();
  console.log(min, max, bin);
  postMessage({ workerResult, min, max, bin });
};
