<template>
  <v-sheet :id="id" width="20rem" height="20rem" rounded="lg" outlined />
</template>

<script>
import json from "@/assets/tree-option.json";

export default {
  props: {
    tokens: Object,
    id: String,
  },
  data() {
    return {
      option: json,
      chart: null,
    };
  },
  methods: {
    draw: function (newData) {
      this.option.series[0].data = [newData];
      this.chart.clear();
      this.chart.setOption(this.option);
    },
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
    let dom = document.getElementById(this.id);
    this.chart = this.$echarts.init(dom);
    this.draw(this.tokens);
  },
};
</script>