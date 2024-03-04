<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import { useDebounceFn } from "@vueuse/core";
import echarts from "../../plugins/echarts/index";

const props = defineProps<{
  title: string;
  total: number;
  count: number;
}>();

const gaugeChartRef = ref();
const initGagueChart = () => {
  const gaugeChart = echarts.init(gaugeChartRef.value);

  gaugeChart.setOption({
    title: {
      text: props.title,
      textStyle: {
        fontSize: 26,
        color: "#FFF",
      },
    },
    graphic: [
      {
        type: "group",
        left: "center",
        bottom: -2,
        children: [
          {
            type: "text", // 文本节点
            z: 10,
            style: {
              fill: "#626378", // 填充色
              overflow: "truncate", // 文本溢出
              fontSize: 16,
              text: [
                // 这里是文本内容
                `${props.total}个事项`,
              ],
              font: "bolder 20px OPPOSans", // 字体粗细  大小 哪种字体
            },
          },
        ],
      },
    ],
    series: [
      {
        type: "pie",
        // 饼图的大小
        radius: ["74%", "78%"],
        color: ["#FFF"],
        data: [
          {
            value: 100,
          },
        ],
        label: {
          show: false,
        },
      },
      {
        type: "gauge",
        axisLine: {
          show: false,
        },
        pointer: {
          width: 5,
          itemStyle: {
            color: "#3a52cf",
          },
        },
        axisLabel: {
          color: "inherit",
          distance: 40,
          fontSize: 20,
          show: false,
        },
        axisTick: {
          splitNumber: 1,
          show: false,
        },
        splitLine: {
          distance: 0,
          lineStyle: {
            color: "#ccc",
          },
        },
        markPoint: {
          itemStyle: {
            color: "red",
          },
        },
        detail: {
          valueAnimation: true,
          formatter: "{value} %",
          color: "#FFF",
          fontSize: 16,
        },
        data: [
          {
            value: props.count,
          },
        ],
      },
    ],
  });

  const debounceFn = useDebounceFn(() => {
    gaugeChart.resize();
  }, 300);

  window.addEventListener("resize", debounceFn);
};

onMounted(() => {
  nextTick(() => initGagueChart());
});
</script>

<template>
  <div ref="gaugeChartRef" id="gaugeChart" />
</template>

<style lang="scss" scoped>
#gaugeChart {
  width: 100%;
  height: 100%;
}
</style>
