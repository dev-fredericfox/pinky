<template>
  <DataInput :title="'Upload Your Training Set'" :dl="'training'" />
</template>

<script>
import DataInput from "@/components/csvInput/DataInput.vue";

export default {
  name: "TrainingUpload",
  components: { DataInput },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
