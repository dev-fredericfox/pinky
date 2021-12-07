self.importScripts(
  "https://unpkg.com/brain.js@2.0.0-beta.2/dist/brain-browser.min.js"
);

onmessage = (e) => {
  // console.log("inside worker: ", e);
  // // eslint-disable-next-line
  const net = new brain.NeuralNetwork();
  let settings = JSON.parse(e.data.data);
  net.fromJSON(settings);

  e.data.input.forEach((el) => {
    "running savnet inside worker";
    let result = el;
    let prediction = net.run(el);
    result[Object.keys(prediction)[0]] =
      prediction[[Object.keys(prediction)[0]]];

    postMessage(result);
  });

  postMessage(false);
};
