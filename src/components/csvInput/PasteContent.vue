<template>
<div>
  <textarea
    class="textarea"
    placeholder="paste your csv data here:"
    rows="10"
    v-model="store.data.trainingSetInputCsv"
  ></textarea>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  name: "PasteContent",
  setup() {
    const store = inject("store");

    return {
      store,
    };
  },
};
</script>

<style lang="scss" scoped></style>
