<template>
  <v-sheet :id="id" width="20rem" height="20rem" rounded="lg" outlined />
</template>

<script>
import json from "@/assets/graph-option.json";

export default {
  props: {
    fa: Object,
    id: String,
  },
  data() {
    return {
      option: json,
      chart: null,
    };
  },
  methods: {
    draw: function (fa) {
      Object.assign(this.option.series[0], fa);
      this.chart.clear();
      this.chart.setOption(this.option);
    },
  },
  watch: {
    fa: {
      deep: true,
      handler: function (val) {
        this.draw(val);
      },
    },
  },
  mounted: function () {
    let dom = document.getElementById(this.id);
    this.chart = this.$echarts.init(dom);
    this.draw(this.fa);
  },
};
</script>

<style scoped>
</style>