<template>
  <div>
    <div class="content">
      <div class="columns is-centered">
        <div class="column has-text-centered pt-0 is-6">
          <h1 class="title is-4">How should we parse your data?</h1>
        </div>
      </div>
      <Parseoptions />
      <div class="columns is-centered mt-5 mb-5">
        <div class="column has-text-centered mt-5 is-6">
          <button
            @click="
              store.methods.papaparse(
                store.data.trainingSetInputCsv,
                store.parseOptions,
                'trainingSetInputJSON'
              )
            "
            :class="[
              { 'is-loading': store.ui.parsing },
              'button is-primary mt-5 is-large',
            ]"
            :disabled="store.ui.parsing"
          >
            Parse
          </button>
          <div
            class="columns is-centered mt-4"
            v-if="
              store.data.trainingSetInputJSON.errors &&
              store.data.trainingSetInputJSON.errors.length > 0
            "
          >
            <div class="column is-6">
              <div class="notification is-danger">
                <p
                  v-for="(error, idx) in store.data.trainingSetInputJSON.errors"
                  :key="idx"
                >
                  {{ error.message }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
import Parseoptions from "@/components/csvInput/ParseOptions.vue";
export default {
  name: "ParseSettings",
  components: { Parseoptions },
  setup() {
    const store = inject("store");
    return {
      store,
    };
  },
};
</script>

<style lang="scss" scoped></style>
