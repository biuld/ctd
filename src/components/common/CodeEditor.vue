<template>
  <v-card>
    <v-card-subtitle> {{ desc }} </v-card-subtitle>
    <v-fab-transition>
      <v-btn @click="emit" color="pink" dark absolute bottom right fab>
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-card-text>
      <prism-editor
        class="my-editor"
        v-model="code"
        :highlight="highlighter"
        line-numbers
      />
    </v-card-text>
  </v-card>
</template>

<script>
// import Prism Editor
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

export default {
  components: {
    PrismEditor,
  },
  props: {
    desc: String,
    initialCode: String,
  },
  data: function () {
    return {
      code: this.initialCode,
    };
  },
  methods: {
    highlighter: function (code) {
      return highlight(code, languages.js); // languages.<insert language> to return html with markup
    },
    emit: function () {
      this.$emit("code", this.code);
    },
  },
};
</script>

<style scoped>
/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  height: 400px;
  padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>