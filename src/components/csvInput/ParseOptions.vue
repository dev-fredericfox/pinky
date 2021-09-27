<template>
  <div>
    <div class="content">
      <div class="columns is-centered">
        <div class="column is-3 has-text-left">
          <h3>{{ store.data.trainingSetFileName }}</h3>
          <div class="field">
            <label class="label">CSV Sparator type</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Auto Detect"
                v-model="store.parseOptions.delimiter"
              />
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <label class="checkbox">
                <input
                  type="checkbox"
                  v-model="store.parseOptions.dynamicTyping"
                />
                <span class="ml-2 bold"
                  >Dynamic Typing: Auto-recognize numbers & booleans</span
                >
              </label>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <label class="checkbox">
                <input type="checkbox" v-model="store.parseOptions.header" />
                <span class="ml-2 bold">Data has labeled header</span>
              </label>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="control">
                <p class="bold">Skip empty lines?</p>
                <label class="radio">
                  <input
                    type="radio"
                    value="false"
                    v-model="store.parseOptions.skipEmptyLines"
                  />
                  No
                </label>
                <label class="radio">
                  <input
                    type="radio"
                    value="true"
                    v-model="store.parseOptions.skipEmptyLines"
                  />
                  Yes
                </label>
                <label class="radio">
                  <input
                    type="radio"
                    value="greedy"
                    v-model="store.parseOptions.skipEmptyLines"
                  />
                  Greedy
                </label>
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

export default {
  name: "Parseoptions",
  setup() {
    const store = inject("store");
    return {
      store,
    };
  },
};
</script>

<style lang="scss" scoped>
.bold {
  font-weight: bold;
}
</style>
