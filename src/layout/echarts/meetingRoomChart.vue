<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import echarts from "../../plugins/echarts";
import { useDebounceFn } from "@vueuse/core";
import dayjs from "dayjs";

const meetingRoomChart = ref();

const initMeetingRoomChart = () => {
  const barChart = echarts.init(meetingRoomChart.value);

  const color = "#3b54d3";
  const week = ["星期一", "星期二", "星期三", "星期四", "星期五"];
  const data = [
    "23:00",
    "22:00",
    "21:00",
    "20:00",
    "19:00",
    "18:00",
    "17:00",
    "16:00",
    "15:00",
    "14:00",
    "13:00",
    "12:00",
    "1:00",
    "10:00",
    "09:00",
    "08:00",
    "全天",
  ];
  // echart配置
  barChart.setOption({
    tooltip: {
      //提示框
      formatter: function (params: any) {
        return params.name + ":" + params.value[1] + "~" + params.value[2];
      }, //数据的值
    },
    grid: {
      top: "1%",
      containLabel: true,
      show: true,
    },
    xAxis: {
      type: "category",
      position: "top",
      data: week,
      axisLine: {
        show: false,
      },
      axisPointer: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        padding: [0, 0, 0, 50],
        width: 10,
      },
    },
    yAxis: {
      type: "category",
      data,
      axisLabel: {
        showMaxLabel: true,
        inside: true,
      },
      splitArea: {
        //网格区域
        show: true, //是否显示
        areaStyle: {
          color: ["#0a0819"],
        },
      },
      splitLine: {
        show: true, //让网格显示
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
    series: [
      {
        type: "custom",
        renderItem: function (params: any, api: any) {
          var categoryIndex = api.value(0); // 这里使用 api.value(0) 取出当前 dataItem 中第一个维度的数值。
          var start = api.coord([categoryIndex, api.value(1)]); // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
          var end = api.coord([categoryIndex, api.value(2)]);
          var height = api.size([0, 1])[1];
          return {
            type: "rect", // 表示这个图形元素是矩形。
            shape: echarts.graphic.clipRectByRect(
              {
                x: start[0],
                y: start[1] - height / 2,
                width: 50,
                height: end[1] - start[1] + height,
              },
              {
                x: params.coordSys.x,
                y: params.coordSys.y,
                width: params.coordSys.width,
                height: params.coordSys.height,
              }
            ),
            style: api.style(),
          };
        },
        encode: {
          x: 0, // data 中『维度0对应到 X 轴
          y: [1, 2], // data 中『维度1』和『维度2』对应到 Y 轴
        },
        data: [
          {
            name: "星期二",
            itemStyle: {
              color,
            },
            label: {
              show: true,
              position: "inside",
              formatter: function (params: any) {
                return params.value[1] + "~" + params.value[2];
              },
            },
            value: [1, `09:00`, `12:00`], //数据的值
          },
          {
            name: "星期二",
            itemStyle: {
              color,
            },
            label: {
              show: true,
              position: "inside",
              formatter: function (params: any) {
                return params.value[1] + "~" + params.value[2];
              },
            },
            value: [1, `17:00`, `20:00`],
          },
          // {
          //   name: "星期四",
          //   itemStyle: {
          //     color,
          //   },
          //   label: {
          //     show: true,
          //     position: "inside",
          //     formatter: function (params: any) {
          //       return params.value[1] + "~" + params.value[2];
          //     },
          //   },
          //   value: [3, `21:00`, `23:00`],
          // },
        ],
      },
    ],
  });

  const debounceFn = useDebounceFn(() => {
    barChart.resize();
  }, 300);

  window.addEventListener("resize", debounceFn);
};

onMounted(() => {
  nextTick(() => initMeetingRoomChart());
});
</script>

<template>
  <div
    ref="meetingRoomChart"
    id="roomChart"
    style="width: 100%; height: 100%"
  />
</template>
