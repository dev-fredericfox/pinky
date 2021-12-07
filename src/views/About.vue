<template>
  <div class="content p-5">
    <div class="about">
      <h1>This is an about page, ok?</h1>
      {{ count }}
      <button class="button is-success" @click="count++">+1?</button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  setup() {
    const state = reactive({
      count: 0,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped></style>
