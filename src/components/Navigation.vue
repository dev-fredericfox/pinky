<template>
  <div>
    <div class="content">
      <div class="columns">
        <div class="column is-4"></div>
        <div class="column has-text-centered">
          <button
            v-if="state.count > 0 && store.ui.back"
            class="button mr-1"
            @click="prev"
          >
            Back
          </button>
          <button
            v-if="store.ui.showNext"
            class="button ml-1"
            @click="next"
            :disabled="!store.ui.next"
          >
            Next
          </button>

          <!-- <p>Child Count: {{ state.count }} - {{ state.steps.length }}</p>
          <input v-model="state.count"> -->
        </div>
        <div class="column is-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  Name: "Navigation",
  setup() {
    let state = inject("state");
    let store = inject("store");
    const next = () => {
      store.ui.next = false;
      state.count++;
    };
    const prev = () => {
      state.count--;
    };

    return {
      next,
      prev,
      state,
      store,
    };
  },
};
</script>

<style lang="scss" scoped></style>
