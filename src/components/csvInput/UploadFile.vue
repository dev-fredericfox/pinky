<template>
  <div>
    <div class="columns is-centered mb-5 mt-5">
      <div
        class="dropOuter column is-6 pb-0 pt-2"
        @dragover.prevent
        @drop.prevent
      >
        <div @drop="onFileChange" class="dropInner mt-4 mb-4">
          <div class="">
            <img src="../../../public/assets/folderIcon.png" />
            <p>Drag & Drop file here</p>
            <div><p class="orbackground">or</p></div>
          </div>
          <div class="mt-3">
            <label for="uploadCSV" class="button">Browse Files</label>
            <div class="">
              <input
                @change="onFileChange"
                style="visibility: hidden"
                accept=".csv"
                type="file"
                id="uploadCSV"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed">
      <transition name="slide-fade">
        <div
          class="column"
          v-if="
            store.data.trainingSetFileName &&
            store.data.trainingSetFileType == 'text/csv'
          "
        >
          <div class="columns is-centered">
            <div class="column selectedFile box is-6">
              <div class="columns is-centered is-mobile">
                <div class="column is-narrow has-text-left">
                  <img
                    class="tagImage"
                    src="../../../public/assets/fileBlank.png"
                  />
                </div>
                <div class="column has-text-left is-clipped">
                  <p class="filename mb-0 mt-3 is-size-7-mobile">
                    {{ store.data.trainingSetFileName }}
                  </p>
                  <p class="filesize mt-0 mb-0" v-if="!loadingFile">
                    {{ fileSize }}
                  </p>
                  <p class="filesize mt-0 mb-0" v-else>Loading...</p>
                </div>
                <div @click="clearFile" class="column is-narrow has-text-right">
                  <img class="trash" src="../../../public/assets/close.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div
        class="column shake"
        v-if="files.length && files[0].type != 'text/csv'"
      >
        <p class="tag is-danger is-medium">
          Wrong file format. Please chose a .csv file!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, computed } from "vue";

export default {
  name: "UploadFile",
  setup() {
    const store = inject("store");
    const loadingFile = ref(false);
    const files = ref("");

    const onFileChange = function (e) {
      loadingFile.value = true;
      store.data.trainingSetInputCsv = "";
      files.value = e.target.files || e.dataTransfer.files;
      if (!files.value.length) return;
      store.data.trainingSetFileName = files.value[0].name;
      store.data.trainingSetFileSize = files.value[0].size;
      store.data.trainingSetFileType = files.value[0].type;
      fileReader(files.value[0]);
    };

    const fileReader = function (file) {
      let reader = new FileReader();
      reader.onload = function (evt) {
        store.data.trainingSetInputCsv = evt.target.result;
        loadingFile.value = false;
      };
      //   reader.readAsDataURL(file);
      reader.readAsText(file);
    };

    const clearFile = function () {
      files.value = "";
      store.data.trainingSetInputCsv = "";
      store.data.trainingSetFileName = "";
      store.data.trainingSetFileSize = "";
      store.data.trainingSetFileType = "";
    };

    const fileSize = computed(() => {
      if (
        store.data.trainingSetFileSize &&
        store.data.trainingSetFileSize > 1000000
      ) {
        return `${(store.data.trainingSetFileSize / 1000000).toFixed(2)} MB`;
      } else {
        return `${(store.data.trainingSetFileSize / 1000).toFixed(2)} KB`;
      }
    });

    return {
      onFileChange,
      loadingFile,
      files,
      fileSize,
      clearFile,
      store,
    };
  },
};
</script>

<style lang="scss" scoped>
.dropOuter {
  background-color: rgb(251, 251, 255);
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='30' ry='30' stroke='rgb(149, 176, 221)' stroke-width='2' stroke-dasharray='10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 30px;
}

.orbackground {
  font-variant-caps: all-small-caps;
}

.orbackground:before,
.orbackground:after {
  background-color: rgb(136, 136, 136);
  content: "";
  display: inline-block;
  height: 1px;
  position: relative;
  vertical-align: middle;
  width: 20px;
}

.orbackground:before {
  right: 0.5em;
  margin-left: -50%;
}
.orbackground:after {
  left: 0.5em;
  margin-right: -50%;
}

.filename {
  font-weight: bold;
}

.filesize {
  font-variant-caps: all-small-caps;
  color: rgb(136, 136, 136);
}

.trash {
  height: 32px;
  width: 32px;
}

.selectedFile {
  border-radius: 30px;
}

.fixed {
  height: 120px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.shake {
  animation: shake-animation 3s ease infinite;
  transform-origin: 50% 50%;
}

@keyframes shake-animation {
  0% {
    transform: translate(0, 0);
  }
  1.78571% {
    transform: translate(5px, 0);
  }
  3.57143% {
    transform: translate(0, 0);
  }
  5.35714% {
    transform: translate(5px, 0);
  }
  7.14286% {
    transform: translate(0, 0);
  }
  8.92857% {
    transform: translate(5px, 0);
  }
  10.71429% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

.progress::-webkit-progress-value {
  transition: width 0.5s ease;
}
</style>
