<template>
  <div>
    <div class="content">
      <div class="columns">
        <div class="column has-text-centered is-12">
          <h1>Let's check the integrity of the parsed data</h1>
        </div>
      </div>
      <div class="columns">
        <div class="column has-text-left is-2"></div>
        <div class="column has-text-left is-4">
          <DataPreview />
        </div>
        <div class="column has-text-left is-4">
          <Datatypes />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
import Datatypes from "@/components/dataValidation/Datatypes.vue";
import DataPreview from "@/components/dataValidation/DataPreview.vue";
export default {
  name: "DataValidation",
  components: { Datatypes, DataPreview },
  setup() {
    const store = inject("store");
    return {
      store,
    };
  },
};
</script>

<style lang="scss" scoped></style>
