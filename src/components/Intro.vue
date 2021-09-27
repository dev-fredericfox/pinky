<template>
  <div class="content">
    <div class="columns">
      <div class="column"></div>
      <div class="column has-text-centered is-narrow">
        <h1>Welcome to Pinky, the assistant for Brain.js</h1>
        <h2>In the next steps you will be able to:</h2>
        <ul>
          <li>Upload or paste your csv training data</li>
          <li>Validate the type and integrity of the data</li>
          <li>Upload a Crossvalidation set or split your training Data</li>
          <li>Train your Brain.js model</li>
        </ul>
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  setup() {
    const state = reactive({
      count: 0,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped></style>
