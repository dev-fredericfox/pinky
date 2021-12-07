<template>
  <div>
    <HomeIntroduction/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeIntroduction from "@/components/HomeIntroduction.vue";

export default {
  name: "Home",
  components: {
    HomeIntroduction,
  },
};
</script>
