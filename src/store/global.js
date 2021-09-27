import { reactive } from "vue";
import Papa from "../../node_modules/papaparse";

const data = reactive({
  demo: "abc",
  //Features to be parsed
  trainingSetInputCsv: "",
  //Features parsed by papa, is obj {data:[{},{},{}...], errors:[], meta:{aborted:false, ...,fields:[], linebreak: \n, etc.}}
  trainingSetInputJSON: "",
  //Training Output aka result (ex: titani = survivors)
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
  brainTraining: [],
});

const ui = reactive({
  parsing: false,
  loading: true,
  next: true,
  step: 0,
});

const parseOptions = reactive({
  header: true,
  dynamicTyping: true,
  delimiter: "",
  skipEmptyLines: true,
  worker: true,
});

const brainOptions = reactive({
  iterations: 2000,
  binaryThresh: 0.5,
  learningRate: 0.3,
  hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
  activation: "Sigmoid", // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
  leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
  timeout: Infinity,
});

let cold = { storage: "" };

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
      let myWorker = new Worker("/scripts/worker/sumTypeof.js", {
        type: "module",
      });
      console.log("Sending data to worker...");
      myWorker.postMessage({
        meta: [...data.trainingSetInputJSON.meta.fields],
        data: cold.storage.data,
      });
      myWorker.onmessage = function (e) {
        data.trainingSetInputTypes = e.data;
        ui.next = true;
        ui.loading = false;
      };
    } else {
      data.trainingSetInputTypes =
        "Workers not supported in your Browser. Please update your browser.";
    }
  },
  modifyTypes: function (key, target) {
    let myWorker = new Worker("/scripts/worker/formatTypes.js", {
      type: "module",
    });
    console.log("Sending data to worker n2...");
    myWorker.postMessage({
      data: cold.storage.data,
      replace: key,
    });
    myWorker.onmessage = function (e) {
      console.log(e);
      cold.storage.data = e.data;
      data[target].data = e.data;
      methods.sumTypeof();
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
