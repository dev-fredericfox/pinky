<template>
  <Breadcrumbs :stage="count" />
  <div class="mainComponent">
    <transition name="component-fade" mode="out-in">
      <component :is="current"></component>
    </transition>
  </div>
  <Navigation />

  <div>counter: {{ count }}</div>
  <button @click="count += 2">+1</button>
  <button @click="count--">-1</button>
  <router-link to="/Datavalidation">Next</router-link>
  <router-view />
  {{ current }}
</template>

<script>
import store from "@/store/global.js";
import { reactive, toRefs, computed, provide } from "vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import Intro from "@/components/Intro.vue";
import TrainingUpload from "@/components/TrainingUpload.vue";
import Navigation from "@/components/Navigation.vue";
import DataValidation from "@/components/DataValidation.vue";
import ParseSettings from "@/components/ParseSettings.vue";
import Crossvalidation from "@/components/Crossvalidation.vue";
import SelectOutput from "@/components/SelectOutput.vue";
import BrainSettings from "@/components/BrainSettings.vue";
import Train from "@/components/Train.vue";

export default {
  name: "Start",
  components: {
    Breadcrumbs,
    Intro,
    TrainingUpload,
    Navigation,
    DataValidation,
    ParseSettings,
    SelectOutput,
    Crossvalidation,
    BrainSettings,
    Train,
  },
  props: {
    stage: {
      type: Number,
      required: true,
    },
  },
  setup() {
    provide("store", store);
    const state = reactive({
      count: 0,
      steps: [
        "Intro",
        "TrainingUpload",
        "ParseSettings",
        "DataValidation",
        "SelectOutput",
        "Crossvalidation",
        "BrainSettings",
        "Train"
      ],
      test: "test",
    });

    //Returns the component to load based on the step count.
    const current = computed(() => {
      return state.steps[state.count];
    });
    provide("state", state);
    return {
      ...toRefs(state),
      current,
    };
  },
};
</script>

<style lang="scss" scoped>
.mainComponent {
  min-height: 600px;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: 0.4s ease-in-out;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
