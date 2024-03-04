<script setup lang="ts">
import { onMounted, ref, nextTick, computed } from "vue";
import { useDebounceFn } from "@vueuse/core";
import echarts from "../../plugins/echarts/index";

const props = defineProps<{
  title: string;
  data: Array<{ name: string; value: number; itemStyle: any }>;
}>();

const ratioPieChart = ref();
const initAttendancePie = () => {
  const pieChart = echarts.init(ratioPieChart.value);

  const total = computed(() =>
    props.data.reduce((pre, item: any) => pre + item.value, 0)
  );

  pieChart.setOption({
    title: {
      text: props.title,
      padding: [20, 20, 20, 20],
      textStyle: {
        color: "#FFF",
        fontSize: 26,
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: "5%",
      left: "center",
      icon: "circle",
      textStyle: {
        color: "#FFF",
        // 为了图例与第二行文字对齐，需要设置两个样式的padding，把文字顶到合适的位置，然后为了上下行的间隔，设置了第2行文字的行高
        rich: {
          a: {
            fontSize: 20,
            color: "#FFF",
            align: "center",
            fontWeight: 600,
          },
          b: {
            fontSize: 20,
            color: "#FFF",
            fontWeight: 600,
            padding: [50, 0, 0, -40],
          },
        },
      },
      formatter: (name: string) => {
        let target = 0;
        for (let i = 0; i < props.data.length; i++) {
          if (props.data[i].name === name) {
            target = props.data[i].value;
          }
        }
        let arr = [
          "{a|" + name + "}",
          "{b|" + `${(target / total.value) * 100}%` + "}",
        ];
        return arr.join("");
      },
    },
    series: [
      {
        name: props.title,
        type: "pie",
        bottom: "20%",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: props.data,
      },
    ],
  });

  const debounceFn = useDebounceFn(() => {
    pieChart.resize();
  }, 300);

  window.addEventListener("resize", debounceFn);
};

onMounted(() => {
  nextTick(() => initAttendancePie());
});
</script>

<template>
  <div ref="ratioPieChart" id="pieChart" />
</template>

<style lang="scss" scoped>
#pieChart {
  width: 100%;
  height: 100%;
}
</style>
