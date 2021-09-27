onmessage = (e) => {
  console.log("worker received data, start mapping. DU CLOWN");
  console.log(e);
  const test = () => import("@/store/global.js");

  //   for (let i = 0; i++; i <= e.data.replace.length) {
  //     console.log(e.data.replace[i].key);
  //     for (let j = 0; j++; j <= e.data.data.length) {
  //         console.log("h")
  //       }
  //   }

  //   for (let keys in e.data.replace) {
  //     for (let object in e.data.data) {
  //       console.log(object, keys.key, object[keys.key]);
  //     }
  //   }

  console.log(test())

  e.data.replace.forEach((el) => {
    console.log(el.key);
    e.data.data.forEach((data) => {
      console.log(data[el.key]);
      if (el.replace === typeof data[el.key]) {
        console.log(`${data[el.key]} I am a ${el.replace}`);
    //          switch (el.with) {
    //           case 0:
    //             break;
    //           case 1:
    //             store.methods.modifyTypes(
    //               dropdown.selected[el].key,
    //               idx,
    //               dat[dropdown.selected[el].key].toString()
    //             );
    //             break;
    //           case 2:
    //             store.methods.modifyTypes(dropdown.selected[el].key, idx, 0);
    //             break;
    //           case 3:
    //             store.methods.modifyTypes(dropdown.selected[el].key, idx, "");
    //             break;
    //         }
      }
    });
  });

  const workerResult = "";
  postMessage(workerResult);
};
