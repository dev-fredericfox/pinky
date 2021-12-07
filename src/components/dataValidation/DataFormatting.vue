<template>
  <div>
    <div v-if="store.ui.loading">
      <ul>
        <li
          v-for="(key, idx) in store.data.trainingSetInputJSON.meta.fields"
          :key="idx"
        >
          {{ key }}

          <div class="columns">
            <div class="column is-7 mt-1 mb-1">
              <div class="content-wrapper">
                <div class="placeholder">
                  <div class="animated-background"></div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <div
        v-for="(item, idx) in Object.entries(store.data.trainingSetInputTypes)"
        :key="idx"
        class="column with-background pb-5 pt-3 mb-4"
      >
        <div class="columns is-mobile">
          <div class="column"><b>Feature:</b> {{ item[0] }}</div>
          <div class="column is-narrow has-text-right">
            <span class="tag is-danger" @click="delKey(item[0])"
              >delte feature <button class="delete is-small"></button
            ></span>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div v-for="(type, idy) in Object.keys(item[1])" :key="idy">
              <div class="columns is-mobile is-justify-content-space-between">
                <div class="column is-half-mobile pb-0 pt-1">
                  <div
                    :class="[
                      { 'green bold': typeSum[item[0]] == item[1][type] },
                      { 'red bold': typeSum[item[0]] > item[1][type] },
                    ]"
                  >
                    {{
                      type == "object"
                        ? "Empty"
                        : type.charAt(0).toUpperCase() + type.slice(1)
                    }}
                  </div>
                </div>
                <div class="column is-half-mobile has-text-right pb-0 pt-1">
                  <span
                    :class="[
                      { 'green bold': typeSum[item[0]] == item[1][type] },
                      { 'red bold': typeSum[item[0]] > item[1][type] },
                    ]"
                    >{{ item[1][type] }}/{{
                      Object.values(item[1]).reduce((a, b) => a + b)
                    }}</span
                  >
                </div>
              </div>
              <div class="columns">
                <div class="column has-text-left pb-0 pt-1">
                  <div class="select is-small">
                    <select v-model="selected[idx + '-' + idy]">
                      <option
                        v-for="option in options"
                        :key="option.value"
                        :value="{
                          key: item[0],
                          replace: type,
                          with: option.value,
                        }"
                        :disabled="
                          (option.value == 5 &&
                            store.data.trainingSetBin.objSize[item[0]] !== 2) ||
                          ((option.value == 3 || option.value == 4) &&
                            type !== 'number')
                        "
                      >
                        {{ option.text }}
                      </option>
                    </select>
                  </div>
                </div>

                <div
                  class="column has-text-left pb-0 pt-0"
                  v-if="selected[idx + '-' + idy]"
                >
                  <div v-if="selected[idx + '-' + idy].with === 4">
                    <div class="field is-horizontal">
                      <div class="field-label is small m-0 pr-1">
                        <label class="label is-small">Max</label>
                      </div>
                      <div>
                        <input
                          class="input is-small"
                          v-model.number="store.data.trainingSetMax[item[0]]"
                        />
                      </div>
                    </div>
                    <div class="field is-horizontal">
                      <div class="field-label is small m-0 pr-1">
                        <label class="label is-small">Min</label>
                      </div>
                      <div>
                        <input
                          class="input is-small"
                          v-model.number="store.data.trainingSetMin[item[0]]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="
                  type == 'number' &&
                  (store.data.trainingSetMin[item[0]] < 0 ||
                    store.data.trainingSetMin[item[0]] > 1 ||
                    store.data.trainingSetMax[item[0]] < 0 ||
                    store.data.trainingSetMax[item[0]] > 1)
                "
                class="columns"
              >
                <div class="column is-8 pb-3 pt-0">
                  <div class="tag is-danger">
                    Number should to be between 0 and 1 for accurate results.
                  </div>
                </div>
              </div>
              <div v-if="type !== 'number'" class="columns">
                <div class="column is-8 pb-3 pt-0">
                  <div class="tag is-danger">
                    Feature must to be a number between 0 and 1.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns mt-4">
      <div class="column has-text-centered">
        <button @click="applyChanges()" class="button is-primary">
          Apply All
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, inject, computed, onMounted } from "vue";
export default {
  setup() {
    const store = inject("store");
    const types = reactive({
      summary: {},
    });

    //Dropdown to format types
    const dropdown = reactive({
      options: [
        { text: "--", value: false, disabled: false },
        { text: "Set to 0", value: 1, disabled: false },
        { text: "Set to 1", value: 2, disabled: false },
        //ToDo Auto-Normalize, Manual-Normalize, BagOfWords, Binaray Conversion
        { text: "Auto Scale (log10())", value: 3, disabled: false },
        { text: "Manual Scale", value: 4, disabled: false },
        { text: "Convert Text to 0 and 1", value: 5, disabled: true },
        { text: "Delete Entire Key", value: 6, disabled: false },
      ],
      selected: [],
    });

    //Formats types
    const applyChanges = function () {
      let settings = [];
      let settingsExtend = [];
      store.ui.loading = true;
      Object.keys(dropdown.selected).forEach((el) => {
        console.log(dropdown.selected[el].key);
        console.log(dropdown.selected[el].replace);
        settings.push({
          key: dropdown.selected[el].key,
          replace: dropdown.selected[el].replace,
          with: dropdown.selected[el].with,
        });
        settingsExtend.push({
          key: dropdown.selected[el].key,
          replace: dropdown.selected[el].replace,
          with: dropdown.selected[el].with,
          max: store.data.trainingSetMax[dropdown.selected[el].key],
          min: store.data.trainingSetMin[dropdown.selected[el].key],
          bin: store.data.trainingSetBin.objKey[dropdown.selected[el].key],
        });
        //Delete Key in meta as well (case 6)
        if (dropdown.selected[el].with === 6) {
          store.data.trainingSetInputJSON.meta.fields.splice(
            store.data.trainingSetInputJSON.meta.fields.indexOf(
              dropdown.selected[el].key
            ),
            1
          );
        }
      });
      store.data.trainingSetSettings = [
        ...store.data.trainingSetSettings,
        ...settingsExtend,
      ];
      store.methods.modifyTypes(settings, "trainingSetInputJSON");
      // formatTypes(settings);
      dropdown.selected = [];
      store.ui.componentKeyDataPreview += 1;
    };

    const delKey = function (key) {
      let settings = [];
      console.log(key);
      store.ui.loading = true;
      settings.push({
        key: key,
        replace: "object",
        with: 6,
      });
      store.data.trainingSetInputJSON.meta.fields.splice(
        store.data.trainingSetInputJSON.meta.fields.indexOf(key),
        1
      );
      store.methods.modifyTypes(settings, "trainingSetInputJSON");
    };

    //Returns the sum of all types combined per Key. Example Numbers: 3, Objects: 2, this computes to 5. Use to display Number: 3/5, Object: 2/5.
    const typeSum = computed(() => {
      let results = {};
      Object.keys(store.data.trainingSetInputTypes).map((key) => {
        results[key] = Object.values(
          store.data.trainingSetInputTypes[key]
        ).reduce((a, b) => {
          return a + b;
        });
      });
      return results;
    });

    onMounted(() => {
      store.methods.sumTypeof();
    });

    return {
      ...toRefs(types),
      ...toRefs(dropdown),
      store,
      typeSum,
      applyChanges,
      delKey,
    };
  },
};
</script>

<style lang="scss" scoped>
.bold {
  font-weight: bold;
}

.green {
  color: green;
}

.red {
  color: red;
}

.placeholder {
  max-width: 200px;
  min-height: 18px;
  background-color: #eee;
}

@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

.animated-background {
  animation-duration: 1.25s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: darkgray;
  background: linear-gradient(to right, #eeeeee 10%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  height: 18px;
  position: relative;
}

.label {
  font-size: 0.8rem !important;
  font-weight: normal;
}

.with-background {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%),
    0 0px 0 1px rgb(10 10 10 / 2%);
  color: #4a4a4a;
}
</style>
