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

export default {
  data() {
    return {
      option: json,
      chart: null,
      chartData: [
        {
          name: "root",
          children: [
            {
              name: "A",
            },
            {
              name: "B",
              children: [
                {
                  name: "G",
                },
                {
                  name: "H",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    draw: function (newData) {
      this.option.series[0].data = newData;
      this.chart.setOption(this.option);
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
    this.draw(this.chartData);
  },
};
</script>

<style scoped>
</style>