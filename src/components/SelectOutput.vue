<template>
  <div>
    <div class="content">
      <div class="columns is-centered">
        <div class="column is-6 has-text-centered">
          <h1>What is your output?</h1>
          My output should be:
          <div class="select is-small">
            <select v-model="selection">
              <option
                v-for="key in store.data.trainingSetInputJSON.meta.fields"
                :key="key"
              >
                {{ key }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-6 has-text-centered">
          <button
            :class="[{ 'is-loading': buttonspinner }, 'button', 'is-primary']"
            @click="arrangeData()"
            :disabled="processButton"
          >
            Process
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, watch } from "vue";

export default {
  name: "SelectOutput",
  setup() {
    const store = inject("store");
    const selection = ref();
    const processButton = ref(true);
    const buttonspinner = ref(false);

    const arrangeData = function () {
      store.data.brainTraining = [];
      for (let i = 0; i < store.data.trainingSetInputJSON.data.length; i++) {
        let brainObject = {
          input: store.data.trainingSetInputJSON.data[i],
          output: {
            [selection.value]:
              store.data.trainingSetInputJSON.data[i][selection.value],
          },
        };
        store.data.brainTraining.push(brainObject);
        delete store.data.brainTraining[i].input[selection.value];
      }
      store.ui.next = true;
    };

    watch(selection, () => {
      store.data.trainingSetInputJSON.output = selection.value;
      if (selection.value) {
        processButton.value = false;
      }
    });
    return {
      store,
      selection,
      processButton,
      arrangeData,
      buttonspinner,
    };
  },
};
</script>

<style lang="scss" scoped></style>
