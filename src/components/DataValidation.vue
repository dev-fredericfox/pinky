<template>
  <div>
    <div class="content">
      <div class="columns">
        <div class="column has-text-centered is-12">
          <h1>
            Let's check the compatibility of the parsed data with the neural
            network.
          </h1>
        </div>
      </div>
      <div class="columns">
        <div class="column has-text-left is-2"></div>
        <div class="column has-text-left is-4">
          <DataPreview :key="store.ui.componentKeyDataPreview"/>
        </div>
        <div class="column has-text-left is-4">
          <DataFormatting />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
import DataFormatting from "@/components/dataValidation/DataFormatting.vue";
import DataPreview from "@/components/dataValidation/DataPreview.vue";
export default {
  name: "DataValidation",
  components: { DataFormatting, DataPreview },
  setup() {
    const store = inject("store");
    return {
      store
    };
  },
};
</script>

<style lang="scss" scoped></style>
