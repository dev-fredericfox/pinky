<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item mr-0 pr-0" to="/">
        <img src="../../public/assets/pinkyLogo.svg" height="38" width="38" />
      </router-link>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        @click="activeNav = !activeNav"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      :class="[{ 'is-active': activeNav }, 'navbar-menu']"
    >
      <div class="navbar-start">
        <router-link
          class="navbar-item ml-0 pl-1 mr-5"
          @click="activeNav = !activeNav"
          to="/"
          >Pinky</router-link
        >
        <router-link class="navbar-item" @click="startAndReset()" to="/start"
          >Train a Brain</router-link
        >
      </div>
      <div class="navbar-end">
        <router-link
          class="navbar-item"
          @click="activeNav = !activeNav"
          to="about"
          >About</router-link
        >
        <router-link
          class="navbar-item"
          @click="activeNav = !activeNav"
          to="/imprint"
          >Imprint</router-link
        >
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  setup() {
    const state = reactive({
      count: 0,
      activeNav: false,
    });

    const startAndReset = () => {
      state.activeNav = !state.activeNav;
      if (window.location.href.indexOf("start") > 0) {
        window.location.reload();
      } else {
        location.href("/start");
      }
    };
    return {
      ...toRefs(state),
      startAndReset,
    };
  },
};
</script>

<style lang="scss" scoped>
.navbar-item {
  font-weight: bold;
}
</style>
