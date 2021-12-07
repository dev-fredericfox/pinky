<template>
  <Breadcrumbs :stage="count" :trainOrPredict="'train'" />
  <div class="mainComponent">
    <transition name="component-fade" mode="out-in">
      <component :is="current"></component>
    </transition>
  </div>
  <Navigation />
</template>

<script>
import store from "@/store/global.js";
import { reactive, toRefs, computed, provide, onMounted } from "vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import Intro from "@/components/Intro.vue";
import TrainingUpload from "@/components/TrainingUpload.vue";
import Navigation from "@/components/Navigation.vue";
import DataValidation from "@/components/DataValidation.vue";
import ParseSettings from "@/components/ParseSettings.vue";
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
        "BrainSettings",
        "Train",
      ],
      test: "test",
    });

    onMounted(() => {
      store.ui.back = false;
      store.ui.next = true;
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
