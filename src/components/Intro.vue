<template>
  <div class="content">
    <div class="columns is-centered">
      <div class="column is-6 has-text-centered">
        <h1 class="title is-4">Welcome to Pinky, the assistant for Brain.js</h1>
        <h2 class="title is-6">In the next steps you will be able to:</h2>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-4 has-text-centered">
        <ul class="has-text-left">
          <li>Upload or paste your csv training data</li>
          <li>Validate the type and integrity of the</li>
          <li>Delete unused columns or do some very basic modifications.</li>
          <li>Set the output ie. what the model should be predicting</li>
          <li>Train your Brain.js model</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted } from "vue";

export default {
  setup() {
    const store = inject("store");

    onMounted(() => {
      store.methods.clearCache();
      store.ui.next = true;
    });
    return {
      store,
    };
  },
};
</script>

<style lang="scss" scoped></style>
