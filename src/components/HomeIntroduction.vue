<template>
  <div class="content p-4">
    <div class="columns mt-5 mb-5"></div>
    <div class="columns is-centered">
      <div class="column is-6 has-text-justified">
        <h1 class="title is-4 has-text-centered mb-5">Welcome to Pinky!</h1>
        <p>
          This is a small project to hone my Vue 3 Composition API skills as
          well as to practice some Machine Learning, especially Neural Networks
          with brain.js.
        </p>
        <p>
          Furthermore I used this project to learn about Bulma CSS, which I then
          also used in my Portfolio.
        </p>
        <p>
          Lastly, upon programming this app, I also learned about parsing csvs,
          using JS Workers to offload some heavy work and making files available
          for download and writing to the browsers local storage.
        </p>
        <p>
          I have many more ideas to make this app better and add features, so
          <b> consider this an MVP</b>.
        </p>
        <p>
          <b>Some features on my "road-map": </b><br />
          - Optimize App for Mobile use<br />
          - Adding ability to uplaod a trained brain or select from local
          browser storage <br />
          - Add Cross Validation <br />
          - More and better datavalidation checks <br />
          - Better Data Pre-processing<br />
          - Different Training Algorithms such as Long-Short Term Memory and
          Time Step Networks.
        </p>
        <p>
          Thank you<br />
          Fred
        </p>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-6 has-text-centered">
        <router-link class="cta" to="/start">
          <button class="button is-info">Try training a Neural Network</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
