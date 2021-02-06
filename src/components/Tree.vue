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
import { getLL1ParseTree } from "../core/util";

export default {
  data() {
    return {
      option: json,
      chart: null,
      chartData: [],
    };
  },
  methods: {
    draw: function (newData) {
      this.option.series[0].data = newData;
      this.chart.setOption(this.option);
    },
    setChartData: function (data) {
      this.chartData = [data];
    },
  },
  watch: {
    chartData: {
      deep: true,
      handler: function (val) {
        this.draw(val);
      },
    },
  },
  mounted: function () {
    let dom = document.getElementById("tree");
    this.chart = this.$echarts.init(dom);
    this.setChartData(getLL1ParseTree("1 + 2 + 3 - 4 + 5"));
  },
};
</script>

<style scoped>
</style>