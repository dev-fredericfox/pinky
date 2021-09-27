<template>
  <div>
    <div class="content">
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
        <ul>
          <li
            v-for="(item, idx) in Object.entries(
              store.data.trainingSetInputTypes
            )"
            :key="idx"
          >
            {{ item[0] }}
            <ul>
              <div
                class="columns"
                v-for="(type, idy) in Object.keys(item[1])"
                :key="idy"
              >
                <div class="column is-2 pb-1 pt-1">
                  <li
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
                  </li>
                </div>
                <div class="column is-2 has-text-right pb-1 pt-1">
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
                <div class="column is-narrow has-text-right pb-1 pt-1">
                  <div class="select is-small">
                    <select v-model="selected[idx + '-' + idy]">
                      <option
                        v-for="(option, idz) in options"
                        :key="idz"
                        :value="{
                          key: item[0],
                          replace: type,
                          with: option.value,
                        }"
                      >
                        {{ option.text }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </ul>
          </li>
        </ul>
        <div class="columns">
          <div class="column has-text-centered">
            <button @click="applyChanges()" class="button is-primary">
              Convert
            </button>
          </div>
        </div>
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
        { text: "--", value: false },
        { text: "Convert to string", value: 1 },
        { text: "Set to 0", value: 2 },
        { text: "Erase", value: 3 },
        { text: "Boolen: True", value: 4 },
        { text: "Boolen: False", value: 5 },
      ],
      selected: [],
    });

    //Formats types
    const applyChanges = function () {
      let settings = [];
      store.ui.loading = true;
      Object.keys(dropdown.selected).forEach((el) => {
        console.log(dropdown.selected[el].key);
        settings.push({
          key: dropdown.selected[el].key,
          replace: dropdown.selected[el].replace,
          with: dropdown.selected[el].with,
        });
      });
      store.methods.modifyTypes(settings, "trainingSetInputJSON");
      // formatTypes(settings);
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

    onMounted(store.methods.sumTypeof);

    return {
      ...toRefs(types),
      ...toRefs(dropdown),
      store,
      typeSum,
      applyChanges,
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
</style>
