<template>
  <div>
    <div class="content">
      <div class="columns is-centered">
        <div class="column is-6 has-text-centered">
          <h1 class="title is-4">Training Brain</h1>
          <p>Neural Network Training in Progress...</p>
          <p>{{ store.ui.trainingStatus }} training iterations.</p>
          <p>Error Rate: {{ store.ui.trainingError }}</p>
          <a href="./predict">
            <button class="button m-2" :disabled="!store.data.trainedNet">
              Make Predictions
            </button>
          </a>

          <button
            class="button m-2"
            :disabled="!store.data.trainedNet"
            @click="clickDownload()"
          >
            Download Brain .json
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, inject, ref, onUnmounted } from "vue";
export default {
  setup() {
    const store = inject("store");
    const statusTraining = ref("Training...");

    onMounted(() => {
      store.methods.trainBrain();
      store.ui.back = true;
      store.ui.showNext = false;
    });

    onUnmounted(() => {
      store.ui.showNext = true;
    });

    const download = (content) => {
      const a = document.createElement("a");
      const file = new Blob([content], { type: "text/plain" });
      a.href = URL.createObjectURL(file);
      a.download = "brain.json";
      a.click();
    };
    const clickDownload = () => {
      download(JSON.stringify(store.data.trainedNet));
    };

    return {
      store,
      download,
      clickDownload,
      statusTraining,
    };
  },
};
</script>

<style lang="scss" scoped></style>
