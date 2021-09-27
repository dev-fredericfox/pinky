<template>
  <div class="content">
    <div class="columns mb-3 pl-5">
      <div class="nav">
        <div
          v-for="(crumb, index) in breadcrumbs"
          :key="index"
          :class="[
            stage == index ? 'underlineAnimate' : '',
            'breadcrumbs',
            stage > index ? 'green' : '',
          ]"
        >
          {{ crumb }}
        </div>
      </div>
    </div>
    <div class="columns mb-0 pl-5"></div>
    <div class="columns mt-0">
      <div class="column mt-0 pt-0"></div>
    </div>
  </div>
</template>

<script>
import {} from "vue";

export default {
  name: "Breadcrumbs",
  props: {
    stage: {
      type: Number,
      default: 0,
      require: true,
    },
  },
  setup() {
    const breadcrumbs = [
      "Intro",
      "Data Upload",
      "Parse Settings",
      "Validation",
      "Output",
      "X-Validation",
      "Settings",
      "Training",
    ];

    return {
      breadcrumbs,
    };
  },
};
</script>

<style lang="scss" scoped>
.columns {
  margin: 0 auto;
}

.nav .breadcrumbs {
  color: gray;
  position: relative;
  margin: 10px 0;
  display: inline-block;
  padding: 12px 10px;
}

.nav div {
  display: inline-block;
}

.nav .breadcrumbs::after {
  content: "";
  background: tomato;
  height: 0.25rem;
  position: absolute;
  bottom: 0;
  transition: 0.16s all 0.025s;
}

.nav .breadcrumbs::after {
  left: 100%;
  right: 0;
}

.nav .underlineAnimate ~ .breadcrumbs::after {
  left: 0;
  right: 100%;
}

.nav .underlineAnimate::after {
  left: 0;
  right: 0;
}

.nav .underlineAnimate {
  font-weight: bold;
  color: #000000;
  transition: 0.16s all 0.025s;
}

.nav .green {
  color: green;
}
</style>
