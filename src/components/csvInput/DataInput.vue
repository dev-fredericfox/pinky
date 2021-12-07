<template>
  <div>
    <div class="content">
      <div class="columns">
        <div class="column has-text-centered pt-0 is-12">
          <h1>{{ props.title }}</h1>
        </div>
      </div>
      <div class="tabs columns is-centered">
        <div
          :class="[{ 'is-active': upload, underlineAnimate: upload }, 'csvTab']"
        >
          <p @click="switchTab">Upload CSV</p>
        </div>
        <div
          :class="[
            { 'is-active': !upload, underlineAnimate: !upload },
            'csvTab',
          ]"
        >
          <p @click="switchTab">Paste Data</p>
        </div>
      </div>

      <div class="columns">
        <div class="column is-2"></div>
        <div class="column has-text-centered is-8">
          <transition name="component-fade" mode="out-in">
            <component :is="tab"></component>
          </transition>
          <div class="mt-5 mb-0">
            <a
              v-if="props.dl === 'training'"
              href="/assets/HousingTraining70.csv"
              download="Housing TRAINING Data - Close to Ocean - 1 means close.csv"
              >Don't have a training dataset? Download the demo .csv!</a
            >
            <a
              v-else
              href="/assets/HousingPrediction30.csv"
              download="Housing PREDICTION Data - Close to Ocean - 1 means close.csv"
              >Don't have a prediction dataset? Download the demo .csv!</a
            >
          </div>
        </div>
        <div class="column is-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  inject,
  computed,
  watchEffect,
  onMounted,
} from "vue";
import UploadFile from "@/components/csvInput/UploadFile.vue";
import PasteContent from "@/components/csvInput/PasteContent.vue";
import Demo from "@/components/csvInput/DemoTrainingSet.vue";

export default {
  name: "TrainingUpload",
  props: {
    title: { default: "Upload your data", type: String },
    dl: { default: "training", type: String },
  },
  components: { UploadFile, PasteContent, Demo },
  setup(props) {
    const store = inject("store");
    const state = reactive({
      upload: true,
    });
    //Handle upload or paste tabs and resets any pasted or uploaded data
    const switchTab = function () {
      store.data.trainingSetInputCsv = "";
      store.data.trainingSetInputJSON = "";
      store.data.trainingSetFileName = "";
      state.upload = !state.upload;
    };
    const tab = computed(() => {
      return state.upload == true ? "UploadFile" : "PasteContent";
    });

    const checkIfFileExists = function () {
      if (store.data.trainingSetInputCsv.length > 1) {
        if (
          store.data.trainingSetFileType == "" ||
          store.data.trainingSetFileType == "text/csv"
        ) {
          store.ui.next = true;
        } else store.ui.next = false;
      } else {
        store.ui.next = false;
      }
    };
    watchEffect(() => {
      checkIfFileExists();
    });

    onMounted(() => {
      store.ui.back = true;
      checkIfFileExists();
    });

    return {
      ...toRefs(state),
      store,
      tab,
      switchTab,
      props,
    };
  },
};
</script>

<style lang="scss" scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: 0.4s ease-in-out;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.tabs .csvTab {
  color: gray;
  position: relative;
  margin: 10px 0;
  display: inline-block;
  padding: 12px 10px;
  cursor: pointer;
}

.tabs div {
  display: inline-block;
}

.tabs .csvTab::after {
  content: "";
  background: tomato;
  height: 2.5rem;
  position: absolute;
  bottom: 4px;
  transition: 0.16s all 0.025s;
  z-index: -1;
}

.tabs .csvTab::after {
  left: 100%;
  right: 0;
}

.tabs .underlineAnimate ~ .csvTab::after {
  left: 0;
  right: 100%;
}

.tabs .underlineAnimate::after {
  left: 0;
  right: 0;
}

.tabs .underlineAnimate {
  font-weight: bold;
  color: #000000;
  transition: 0.16s all 0.025s;
}

.tabs .is-active {
  color: #ffffff;
}
</style>
