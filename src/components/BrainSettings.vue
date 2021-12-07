<template>
  <div>
    <div class="content">
      <div class="columns is-centered">
        <div class="column is-6 has-text-centered">
          <div class="content"><h1 class="title is-4">Brain Settings</h1></div>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-6 has-text-left">
          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label">Max Iterations</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input
                    :class="['input']"
                    type="number"
                    placeholder="2000"
                    v-model.number="store.brainOptions.iterations"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="columns is-centered">
        <div class="column is-6 has-text-left">
          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label">Timeout (in ms)</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input
                    :class="[{ 'is-danger': !iterations }, 'input']"
                    type="number"
                    placeholder="Leave empty for infinity"
                    v-model.number="timeout"
                  />
                </div>
                <p v-if="!iterations" class="is-danger">
                  Please add the maximum times to iterate the training data.
                  Default is 2000.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="columns is-centered">
        <div class="column is-6 has-text-left">
          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label">Binary Threshold</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input
                    :class="[{ 'is-danger': !threshold }, 'input']"
                    type="number"
                    placeholder="Auto Detect"
                    v-model.number="store.brainOptions.binaryThresh"
                  />
                </div>
                <p v-if="!threshold" class="is-danger">
                  Please add a Binary Threshold between 0 and 1.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="columns is-centered">
        <div class="column is-6 has-text-left">
          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label">Learning Rate</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input
                    :class="[{ 'is-danger': !learningRate }, 'input']"
                    type="number"
                    placeholder="Auto Detect"
                    v-model.number="store.brainOptions.learningRate"
                  />
                </div>
                <p v-if="!learningRate" class="is-danger">
                  Please add a Learning Rate between 0 and 1.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="columns is-centered">
        <div class="column is-6 has-text-left">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Activation</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="store.brainOptions.activation">
                      <option selected>sigmoid</option>
                      <option>relu</option>
                      <option>leaky-relu</option>
                      <option>tanh</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="columns is-centered">
        <div class="column is-6 has-text-left">
          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label">Leaky-Relu Alpha</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input
                    :class="[{ 'is-danger': !reluAlpha }, 'input']"
                    type="number"
                    placeholder="Only available for Leaky-Relu"
                    v-model.number="store.brainOptions.leakyReluAlpha"
                    :disabled="store.brainOptions.activation !== 'Leaky-Relu'"
                  />
                </div>
                <p v-if="!reluAlpha" class="is-danger">
                  Please add Leaky-Relu Alpha usually 0.01
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="columns is-centered">
        <div class="column is-6">
          <div class="columns is-centered">
            <div class="column has-text-centered is-6">
              <hr />
              <h4 class="title mb-1">Hidden Layers</h4>
            </div>
          </div>
          <div class="columns is-centered">
            <div v-for="layer in amount" :key="layer" class="column is-1">
              <div class="field">
                <div class="field-label">
                  <label class="label"
                    ><span class="pl-1">L{{ layer }}</span></label
                  >
                </div>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <input
                        :class="[
                          { 'is-danger': !layers[layer - 1] },
                          'input',
                          'is-small',
                        ]"
                        type="number"
                        placeholder="3"
                        size="10"
                        v-model.number="
                          store.brainOptions.hiddenLayers[layer - 1]
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-for="layer in amount"
            :key="layer"
            class="column has-text-centered m-0 p-0"
          >
            <p v-if="!layers[layer - 1]" class="is-danger mt-0">
              Please add amount of neurons in hidden layer.
            </p>
          </div>

          <div class="columns is-centered mb-5">
            <div class="column is-narrow">
              <button
                class="button"
                @click="addLayers()"
                :disabled="disableAdd"
              >
                Add Layer
              </button>
            </div>
            <div class="column is-narrow">
              <button
                class="button"
                @click="removeLayers()"
                :disabled="disabledRem"
              >
                Remove Layer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, reactive, toRefs, watchEffect, onMounted } from "vue";
export default {
  setup() {
    const store = inject("store");
    const layers = reactive({
      amount: 1,
      disableAdd: false,
      disabledRem: true,
    });
    const local = reactive({ timeout: 90000 });

    const validation = reactive({
      iterations: false,
      threshold: false,
      learningRate: false,
      activation: false,
      reluAlpha: false,
      layers: {},
    });

    const addLayers = function () {
      store.brainOptions.hiddenLayers.push(1);
      if (layers.amount == 1) {
        layers.amount++;
        layers.disabledRem = false;
      } else if (layers.amount < 7) {
        layers.amount++;
      } else {
        layers.amount++;
        layers.disableAdd = true;
      }
    };

    const removeLayers = function () {
      if ((store.brainOptions.hiddenLayers.length = layers.amount)) {
        store.brainOptions.hiddenLayers.pop();
      }
      delete validation.layers[layers.amount - 1];
      if (layers.amount > 2) {
        layers.amount--;
        layers.disableAdd = false;
      } else {
        layers.amount--;
        layers.disabledRem = true;
      }
    };

    watchEffect(() => {
      store.brainOptions.iterations > 0
        ? (validation.iterations = true)
        : (validation.iterations = false);
      store.brainOptions.binaryThresh >= 0 &&
      store.brainOptions.binaryThresh <= 1 &&
      typeof store.brainOptions.binaryThresh === "number"
        ? (validation.threshold = true)
        : (validation.threshold = false);
      store.brainOptions.learningRate >= 0 &&
      store.brainOptions.learningRate <= 1 &&
      typeof store.brainOptions.learningRate === "number"
        ? (validation.learningRate = true)
        : (validation.learningRate = false);
      store.brainOptions.activation.length > 0
        ? (validation.activation = true)
        : (validation.activation = false);
      store.brainOptions.leakyReluAlpha > 0 ||
      store.brainOptions.activation !== "Leaky-Relu"
        ? (validation.reluAlpha = true)
        : (validation.reluAlpha = false);
      store.brainOptions.hiddenLayers.forEach((el, idx) =>
        el > 0
          ? (validation.layers[idx] = true)
          : (validation.layers[idx] = false)
      );
      if (
        Object.values(validation.layers).every(Boolean) &&
        Object.values(validation).every(Boolean)
      ) {
        store.ui.next = true;
      } else {
        store.ui.next = false;
      }
      if (local.timeout < 1000 || typeof local.timeout != "number") {
        store.brainOptions.timeout = Number.MAX_VALUE;
      } else {
        store.brainOptions.timeout = local.timeout;
      }
    });

    onMounted(() => {
      store.ui.back = false;
    });

    return {
      store,
      ...toRefs(layers),
      addLayers,
      ...toRefs(validation),
      removeLayers,
      ...toRefs(local)
    };
  },
};
</script>

<style lang="scss" scoped></style>
