<template>
  <div>
    <div class="content">
      <div class="columns is-centered">
        <div class="column is-6 has-text-centered">
          <h1>Cross validation</h1>
          <p>
            Do you have a cross validation set, or do you want to take out 30%
            of your data and transform it into a crossvalidation set?
          </p>
          <div class="columns">
            <div class="column has-text-centered">
              <button class="button is-primary" disabled>
                Upload set (comming soon)
              </button>
            </div>
            <div class="column has-text-centered">
              <button class="button is-primary" @click="skip()">
                Skip this step
              </button>
            </div>
            <div class="column has-text-centered">
              <button @click="splitXval()" class="button is-primary">
                Split off 30% of current data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  setup() {
    const store = inject("store");
    const state = inject("state");

    const splitXval = function () {
      store.data.xValInputJSON = [];
      let xValSize = Math.floor(store.data.brainTraining.length * (30 / 100));
      for (let i = 0; i < xValSize; i++) {
        let rand = Math.floor(store.data.brainTraining.length * Math.random());
        store.data.xValInputJSON.push(store.data.brainTraining.splice(rand, 1));
      }
      store.ui.next = true;
    };

    const skip = function () {
      store.data.xValInputJSON = "";
      state.count += 1;
    };

    return {
      store,
      splitXval,
      skip,
    };
  },
};
</script>

<style lang="scss" scoped></style>
