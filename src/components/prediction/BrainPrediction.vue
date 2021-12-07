<template>
  <div>
    <div class="content">
      <div class="columns is-centered">
        <div class="column is-6 has-text-centered">
          <h1>Predicting Numbers</h1>
          <div v-if="!store.ui.predictionReady">
            <p>Neural Network Prediction in Progress...</p>
          </div>
          <div v-else>
            <div class="column is-12 has-text-centered">
              <p>Find your predictions below</p>
              <textarea
                v-model="results.csv"
                readonly
                class="results"
                rows="30"
                cols="70"
              ></textarea>
            </div>
            <div class="column is-12 has-text-centered">
              <button
                class="button ml-2"
                :disabled="store.data.predictionReady"
                @click="clickDownload()"
              >
                Download .csv
              </button>
              <a href="/predict">
                <button
                  class="button ml-2"
                  :disabled="store.data.predictionReady"
                >
                  Make an other prediction
                </button>
              </a>
            </div>
            <a
              href="/assets/HouseingResult30.csv"
              download="Housing acutal results - Close to Ocean - 1 means close.csv"
              >Using the demo data? Download the real results to compare with
              the Neural Net Prediction and see how your trained neural net performed!</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, inject, watch, reactive, onUnmounted } from "vue";
export default {
  setup() {
    const store = inject("store");
    const results = reactive({
      csv: "",
    });

    onMounted(() => {
      store.methods.runPrediction();
      store.ui.showNext = false;
    });
    onUnmounted(() => {
      store.ui.showNext = true;
    });

    const download = (content) => {
      const a = document.createElement("a");
      const file = new Blob([content], { type: "text/csv" });
      a.href = URL.createObjectURL(file);
      a.download = "results.csv";
      a.click();
    };
    const clickDownload = () => {
      download(results.csv);
    };

    watch(() => {
      if (store.ui.predictionReady) {
        let header = Object.keys(store.data.brainPredictionResult[0]);
        let headerString = header.join() + "\n";
        let body = store.data.brainPredictionResult
          .map((el) => {
            let line = header.map((key) => {
              return el[key];
            });
            return line.join();
          })
          .join("\n");
        results.csv = headerString.concat(body);
      }
    });
    return {
      store,
      download,
      clickDownload,
      results,
    };
  },
};
</script>
.results { font-family: monospace; }
<style lang="scss" scoped></style>
