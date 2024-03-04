<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import { useDebounceFn } from "@vueuse/core";
import echarts from "../../plugins/echarts/index";

const attendancePie = ref();
const initAttendancePie = () => {
  const pieChar = echarts.init(attendancePie.value);

  const data = [
    { value: 97, name: "实到" },
    { value: 2, name: "请假" },
    { value: 1, name: "矿工" },
  ];
  const total = data.reduce((pre, item) => pre + item.value, 0);

  pieChar.setOption({
    title: {
      text: "考勤",
      textStyle: {
        color: "#FFF",
        fontSize: 26,
      },
    },
    legend: {
      data,
      bottom: -8,
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
        let target = null;
        for (let i = 0; i < data.length; i++) {
          if (data[i].name === name) {
            target = data[i].value;
          }
        }
        let arr = ["{a|" + name + "}", "{b|" + `${target}%` + "}"];
        return arr.join("");
      },
    },
    series: [
      {
        name: "实到",
        type: "pie",
        bottom: "20%",
        radius: ["70%", "80%"],
        zlevel: 1,
        data: [
          {
            value: data[0].value,
            name: "实到",
            label: {
              show: false,
            },
            itemStyle: {
              color: "#F10F6A",
            },
          },
          {
            value: total - data[0].value,
            itemStyle: {
              color: "#030211",
            },
            labelLine: {
              show: false,
            },
            label: {
              show: false,
            },
          },
        ],
      },
      {
        name: "请假",
        type: "pie",
        bottom: "20%",
        radius: ["50%", "60%"],
        zlevel: 2,
        data: [
          {
            value: data[1].value,
            name: "请假",
            itemStyle: {
              color: "#3b54d3",
            },
            labelLine: {
              show: false,
            },
            label: {
              show: false,
            },
          },
          {
            value: total - data[1].value,
            name: "未请假",
            itemStyle: {
              color: "#030211",
            },
            labelLine: {
              show: false,
            },
            label: {
              show: false,
            },
          },
        ],
      },
      {
        name: "旷工",
        type: "pie",
        bottom: "20%",
        radius: ["30%", "40%"],
        zlevel: 3,
        itemStyle: {
          color: "#232759",
        },
        data: [
          {
            name: "矿工",
            value: data[2].value,
            labelLine: {
              show: false,
            },
            label: {
              show: false,
            },
          },
          {
            value: total - data[2].value,
            itemStyle: {
              color: "#030211",
            },
            label: {
              show: false,
            },
          },
        ],
      },
    ],
  });

  const debounceFn = useDebounceFn(() => {
    pieChar.resize();
  }, 300);

  window.addEventListener("resize", debounceFn);
};

onMounted(() => {
  nextTick(() => initAttendancePie());
});
</script>

<template>
  <div ref="attendancePie" id="pieChar" />
</template>

<style lang="scss" scoped></style>
