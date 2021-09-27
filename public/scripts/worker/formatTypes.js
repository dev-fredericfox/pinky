onmessage = (e) => {
  console.log("worker received data, start mapping. DU CLOWN");
  console.log(e);

  e.data.replace.forEach((el) => {
    console.log(el.key);
    e.data.data.forEach((data) => {
      //   console.log(data[el.key]);
      if (el.replace === typeof data[el.key]) {
        // console.log(`${data[el.key]} I am a ${el.replace}`);
        switch (el.with) {
          case 0:
            break;
          case 1:
            data[el.key] = data[el.key].toString();
            break;
          case 2:
            data[el.key] = 0;
            break;
          case 3:
            data[el.key] = null;
            break;
          case 4:
            data[el.key] = true;
            break;
          case 5:
            data[el.key] = false;
            break;
        }
      }
    });
  });

  const workerResult = e.data.data;
  postMessage(workerResult);
};
