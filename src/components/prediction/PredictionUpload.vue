<template>
  <DataInput
    :title="'Upload Your Data for Brain analysis'"
    :dl="'prediction'"
  />
</template>

<script>
import DataInput from "@/components/csvInput/DataInput.vue";
import { inject, onBeforeMount } from "vue";

export default {
  name: "TrainingUpload",
  components: { DataInput },
  setup() {
    const store = inject("store");
    onBeforeMount(() => {
      store.methods.clearCache();
    });
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
