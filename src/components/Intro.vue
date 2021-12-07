<template>
  <div class="content">
    <div class="columns">
      <div class="column has-text-centered">
        <h1 class="title is-3">Welcome to Pinky, the assistant for Brain.js</h1>
        <h2 class="title is-5">In the next steps you will be able to:</h2>
        <p>Upload or paste your csv training data</p>
        <p>Validate the type and integrity of the</p>
        <p>Delete unused columns or do some very basic modifications.</p>
        <p>Set the output ie. what the model should be predicting</p>
        <p>Train your Brain.js model</p>
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

<style lang="scss" scoped>
p {
  line-height: 0.4rem;
}
</style>
