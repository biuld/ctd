<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-col>
        <v-sheet id="tree" width="20rem" height="20rem" rounded="lg" outlined />
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
import json from "../assets/option.json";
import _ from "lodash";

export default {
  props: {
    tokens: Object,
  },
  data() {
    return {
      option: json,
      chart: null,
    };
  },
  methods: {
    draw: _.debounce(function (newData) {
      this.option.series[0].data = [newData];
      this.chart.clear()
      this.chart.setOption(this.option);
    }, 500),
  },
  watch: {
    tokens: {
      deep: true,
      handler: function (val) {
        this.draw(val);
      },
    },
  },
  mounted: function () {
    let dom = document.getElementById("tree");
    this.chart = this.$echarts.init(dom);
    this.draw(this.tokens)
  },
};
</script>

<style scoped>
</style>