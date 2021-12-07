onmessage = (e) => {
  //replace values
  // console.log(e)
  e.data.replace.forEach((el) => {
    // console.log(el);
    e.data.data.forEach((data) => {
      // console.log(data[el.key]);
      if (el.replace === typeof data[el.key]) {
        // console.log(`${data[el.key]} I am a ${el.replace}`);
        switch (el.with) {
          case 0:
            break;
          case 1:
            data[el.key] = 0;
            break;
          case 2:
            data[el.key] = 1;
            break;
          case 3:
            data[el.key] =
              1 -
              1 /
                (Math.log10(
                  data[el.key] -
                    (e.data.min[el.key] > 0 ? e.data.min[el.key] : 0) +
                    1
                ) +
                  1);
            break;
          case 4:
            data[el.key] = data[el.key] / e.data.max[el.key];
            break;
          case 5:
            data[el.key] = e.data.bin.objKey[el.key].indexOf(data[el.key]);
            break;
          case 6:
            delete data[el.key];
            break;
        }
      } else if (el.with == 6) {
        switch (el.with) {
          case 6:
            delete data[el.key];
            break;
        }
      }
    });
  });

  const workerResult = e.data.data;
  postMessage(workerResult);
};
