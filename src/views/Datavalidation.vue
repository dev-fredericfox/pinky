<template>
  <div>
    <Breadcrumbs :stage="count" />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";

export default {
  components: { Breadcrumbs },
  setup() {
    const state = reactive({
      count: 1,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped></style>
