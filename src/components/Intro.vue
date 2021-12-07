<template>
  <div class="content">
    <div class="columns">
      <div class="column has-text-centered">
        <h1 class="title is-4">Welcome to Pinky, the assistant for Brain.js</h1>
        <h2 class="title is-6">In the next steps you will be able to:</h2>
        <ul class="has-text-left">
          <li>sUpload or paste your csv training data</li>
          <li>sValidate the type and integrity of the</li>
          <li>sDelete unused columns or do some very basic modifications.</li>
          <li>sSet the output ie. what the model should be predicting</li>
          <li>sTrain your Brain.js model</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, reactive, toRefs, onMounted } from "vue";

export default {
  setup() {
    const store = inject("store");
    const state = reactive({
      count: 0,
    });

    onMounted(() => {
      store.methods.clearCache();
      store.ui.next = true;
    });
    return {
      ...toRefs(state),
      store,
    };
  },
};
</script>

<style lang="scss" scoped></style>
