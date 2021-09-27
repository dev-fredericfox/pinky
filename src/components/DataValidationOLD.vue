<template>
  <div>
    <Debug />
    <!-- <div class="content">
      <div class="columns">
        <div class="column has-text-centered is-12">
          <h1>Let's check the integrity of the parsed data</h1>
        </div>
      </div>
      <div class="columns">
        <div class="column has-text-left is-4">
          <ul>
            <li
              v-for="(key, idx) in store.data.trainingSetInputJSON.meta.fields"
              :key="idx"
            >
              {{ key }}
              <ul>
                <li>{{ store.data.trainingSetInputJSON.data[0][key] }}</li>
                <li>{{ store.data.trainingSetInputJSON.data[1][key] }}</li>
                <li>{{ store.data.trainingSetInputJSON.data[2][key] }}</li>
                <li>...</li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="column has-text-centered is-4">


          <div v-if="Object.keys(summary).length < 1">Loading your data...</div>
          <div v-else>
            <ul>
              <li v-for="(item, idx) in Object.entries(summary)" :key="idx">
                {{ item[0] }}: {{ item[1] }}
              </li>
            </ul>
          </div>


        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Debug from "@/components/dataValidation/Debug.vue";
import {  inject } from "vue";

export default {
  name: "DataVailidation",
  compontents: { Debug: Debug },
  setup() {
    const store = inject("store");
    // const state = reactive({
    //   count: 0,
    // });
    // const types = reactive({
    //   summary: {},
    // });

    // if (window.Worker) {
    //   let myWorker = new Worker("/scripts/worker.js", { type: "module" });
    //   console.log("Main thread started JSON stringify:");
    //   myWorker.postMessage({
    //     meta: [...store.data.trainingSetInputJSON.meta.fields],
    //     data: store.cold.storage.data,
    //   });
    //   console.log("Main thread done with JSON stringify:");
    //   myWorker.onmessage = function (e) {
    //     types.summary = e.data;
    //   };
    // } else {
    //   types.summary =
    //     "Workers not supported in your Browser. Please update your browser.";
    //   // console.log(noProx);
    // }

    return {
      // ...toRefs(state),
      store,
    };
  },
};
</script>

<style lang="scss" scoped></style>
