self.importScripts(
  "https://unpkg.com/brain.js@2.0.0-beta.2/dist/brain-browser.min.js"
);

onmessage = (e) => {
  console.log("inside net", e);
  const statusUpdate = (e) => {
    console.log(e.iterations, e.error)
    postMessage({ update: e, savedNet: "" });
  };
  e.data.brainOptions.callback = statusUpdate;
  // eslint-disable-next-line
  const net = new brain.NeuralNetwork(e.data.brainOptions);
  console.log("brain options inside worker:", e.data.brainOptions);
  const trainingData = e.data.data;
  net.train(trainingData);

  // // save trained network to json
  const savedNet = net.toJSON();
  console.log("Saved net inside worker: ", savedNet);
  postMessage({ update: "", savedNet: savedNet });
};
