<template>
  <div>
    <div class="content">
      <div>
        <div
          v-for="(key, idx) in store.data.trainingSetInputJSON.meta.fields"
          :key="idx"
          class="mt-0"
        >
          <div class="columns">
            <div
              class="column is-narrow pb-0 mb-0 mt-1 pt-0"
              v-if="collapse[key]"
            >
              ▾
            </div>
            <div class="column is-narrow pb-0 mb-0 mt-1 pt-0" v-else>▸</div>
            <div
              @click="collapsible(key)"
              class="column pb-0 mb-0 mt-1 pt-0 toplevel"
            >
              {{ key }}
            </div>
          </div>
          <div class="mt-0 mb-0">
            <div class="columns">
              <div class="column is-narrow pb-1 pt-0"></div>
              <div class="column ml-5 pb-1 pt-0">
                <div v-if="collapse[key]" class="bold">
                  <div v-for="index in indiciesToLoad" :key="index">
                    {{ index - 1 }}:
                    {{ store.data.trainingSetInputJSON.data[index - 1][key] }}
                  </div>
                </div>
                <div @click="loadmore()" v-if="collapse[key] && showMoreButton">
                  <span class="more">more...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, inject } from "vue";
export default {
  setup() {
    const store = inject("store");
    const collapse = reactive({});
    const indiciesToLoad = ref(2);
    const showMoreButton = ref(true);

    const collapsible = function (key) {
      collapse[key] ? (collapse[key] = false) : (collapse[key] = true);
      console.log(collapse);
    };

    const loadmore = function () {
      if (
        store.data.trainingSetInputJSON.data.length >
        indiciesToLoad.value + 1
      ) {
        indiciesToLoad.value++;
      } else {
        showMoreButton.value = false;
      }
    };

    return {
      store,
      collapse,
      collapsible,
      indiciesToLoad,
      loadmore,
      showMoreButton,
    };
  },
};
</script>

<style lang="scss" scoped>
.bold {
  font-weight: bold;
}
.isCollapsed {
  display: none;
}

.plus div:before {
  content: "+";
  left: 0;
}
.more {
  text-decoration: underline;
  cursor: pointer;
}

.toplevel {
  cursor: pointer;
}
</style>
