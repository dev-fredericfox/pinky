import { reactive } from "vue";
import Papa from "../../node_modules/papaparse";

const data = reactive({
  //Features to be parsed
  trainingSetInputCsv: "",
  //Features parsed by papa, is obj {data:[{},{},{}...], errors:[], meta:{aborted:false, ...,fields:[], linebreak: \n, etc.}}
  trainingSetInputJSON: "",
  //Training Output aka result (ex: titanic = survivors)
  trainingSetOutputJSON: "",
  //Data types of features: {Feature1: {Number: count}, {String: count}}
  trainingSetInputTypes: "",
  //file.csv
  trainingSetFileName: "",
  // 61990 (number) // empty when pasted via form
  trainingSetFileSize: "",
  //text/csv or empty when pasted via form
  trainingSetFileType: "",
  //Cross validation, either paresed or split from trainingSet.
  xValInputJSON: "",
  //Contains the lowest number found in a feature, used for auto-scaling
  trainingSetMin: "",
  //Contains the highest number found in a feature, used for auto-scaling
  trainingSetMax: "",
  //Contains the sum of unique values per features. Used to convert a string with only 2 values (male & female for ex) to binary (0 & 1).
  trainingSetBin: "",
  // Settings to save in order to format and validate test and data sets.
  trainingSetSettings: "",
  // Format for brain.js to understand how to train. Array of objects: [{input: {feature01: 1, feature02: 0}, output: {result: 1}, {}, {}}]
  brainTraining: [],
  // Hosts the trained net in JSON once training is done. It can be used to download or make predictions.
  trainedNet: false,
  // Hosts the values that require a prediction [{featuer01: 1, feature02: 0}, {},{}]
  brainPrediction: [],
  // Hosts the predicted results
  brainPredictionResult: [],
});

const ui = reactive({
  parsing: false,
  loading: true,
  next: true,
  showNext: true,
  back: false,
  step: 0,
  componentKeyDataPreview: 0,
  trainingStatus: 0,
  trainingError: 0,
  predictionReady: false,
});

const parseOptions = reactive({
  header: true,
  dynamicTyping: true,
  delimiter: "",
  skipEmptyLines: true,
  worker: true,
});

const brainOptions = reactive({
  callbackPeriod: 1,
  iterations: 2000,
  binaryThresh: 0.5,
  learningRate: 0.3,
  log: false,
  logPeriod: 10,
  hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
  activation: "sigmoid", // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
  leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
  timeout: 90000,
});

let cold = { storage: "" };
let myWorker;

const methods = {
  papaparse: function (input, options, target) {
    ui.parsing = true;
    Papa.parse(input, {
      ...options,
      complete: function (results) {
        ui.parsing = false;
        ui.next = true;
        data[target] = results;
        cold.storage = results;
        if (!parseOptions.header) {
          data.trainingSetInputJSON.meta.fields = Object.keys(results.data[0]);
        }
      },
    });
  },
  sumTypeof: function () {
    if (window.Worker) {
      ui.loading = true;
      myWorker = new Worker("/scripts/worker/sumTypeof.js", {
        type: "module",
      });
      console.log("Sending data to worker...");
      myWorker.postMessage({
        meta: [...data.trainingSetInputJSON.meta.fields],
        data: cold.storage.data,
      });
      myWorker.onmessage = function (e) {
        data.trainingSetInputTypes = e.data.workerResult;
        data.trainingSetMin = e.data.min;
        data.trainingSetMax = e.data.max;
        data.trainingSetBin = e.data.bin;
        cold.trainingSetMin = e.data.min;
        cold.trainingSetMax = e.data.max;
        cold.trainingSetBin = e.data.bin;
        ui.next = true;
        ui.loading = false;
      };
    } else {
      data.trainingSetInputTypes =
        "Workers not supported in your Browser. Please update your browser.";
    }
  },
  modifyTypes: function (key, target) {
    myWorker = new Worker("/scripts/worker/formatTypes.js", {
      type: "module",
    });
    console.log("Sending data to worker n2...");
    myWorker.postMessage({
      data: cold.storage.data,
      replace: key,
      min: cold.trainingSetMin,
      max: cold.trainingSetMax,
      bin: cold.trainingSetBin,
    });
    myWorker.onmessage = function (e) {
      console.log(e);
      cold.storage.data = e.data;
      data[target].data = e.data;
      methods.sumTypeof();
    };
  },
  clearCache: function () {
    const dataKeys = Object.keys(data);
    dataKeys.forEach((key) => {
      if (typeof data[key] === "string") {
        data[key] = "";
      } else if (typeof data[key] === "boolean") {
        data[key] = false;
      } else {
        data[key] = [];
      }
    });
  },
  trainBrain: function () {
    myWorker.terminate();
    myWorker = new Worker("/scripts/worker/neuralNet.js");
    console.log("Booting Brain...");
    console.log("Here we go: ");
    ui.trainingStatus = 0;
    let deepBrain = JSON.parse(JSON.stringify(data.brainTraining));
    let deepOptions = JSON.parse(JSON.stringify(brainOptions));
    myWorker.postMessage({
      data: deepBrain,
      brainOptions: deepOptions,
    });
    myWorker.onmessage = function (e) {
      if (e.data.savedNet == "") {
        console.log(e.data);
        ui.trainingStatus = e.data.update.iterations;
        ui.trainingError = e.data.update.error;
      } else {
        data.trainedNet = e.data.savedNet;
        window.localStorage.setItem(
          "neuralNet",
          JSON.stringify(data.trainedNet)
        );
        console.log("Trained Net:", data.trainedNet);
        // ui.trainingStatus = brainOptions.iterations;
      }
    };
  },
  runPrediction: function () {
    ui.predictionReady = false;
    console.log("booting prediction worker");
    myWorker = new Worker("/scripts/worker/runPrediction.js");
    let getTrainedNet = window.localStorage.getItem("neuralNet");
    myWorker.postMessage({
      data: getTrainedNet,
      input: JSON.parse(JSON.stringify(data.trainingSetInputJSON.data)),
    });
    myWorker.onmessage = function (e) {
      if (e.data) {
        data.brainPredictionResult.push(e.data);
      } else {
        ui.predictionReady = true;
        console.log(e.data);
      }
    };
  },
};

export default {
  data,
  ui,
  methods,
  parseOptions,
  cold,
  brainOptions,
};
