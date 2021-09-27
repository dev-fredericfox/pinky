<template>
  <div class="content">
    <div class="nav">
      <Navbar />
    </div>
    <div class="about">
      <h1>This is an about page, ok?</h1>
      {{ count }}
      <button class="button is-success" @click="count++">+1?</button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import Navbar from "@/components/Navbar.vue";

export default {
  components: { Navbar },
  props: {},
  setup() {
    const state = reactive({
      count: 0,
    });

    return {
      ...toRefs(state),
      Navbar,
    };
  },
};
</script>

<style lang="scss" scoped></style>
