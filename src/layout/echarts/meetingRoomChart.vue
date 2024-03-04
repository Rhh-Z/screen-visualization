<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import echarts from "../../plugins/echarts";
import { useDebounceFn } from "@vueuse/core";
import dayjs from "dayjs";
const meetingRoomChart = ref();

const date = dayjs().format("YYYY/MM/DD");

const initMeetingRoomChart = () => {
  const barChart = echarts.init(meetingRoomChart.value);

  const color = "#3b54d3";
  const week = ["星期一", "星期二", "星期三", "星期四", "星期五"];

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
      borderColor: "#ccc",
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
      type: "time",
      inverse: true,
      minInterval: 3600 * 1000, // 两个地方都要设置以一小时为间隔，否则不会有效
      maxInterval: 3600 * 1000, // 两个地方都要设置以一小时为间隔，否则不会有效
      min: `${date} 08:00`, // 将data里最小时间的整点时间设为min,否则min会以data里面的min为开始进行整点递增
      max: `${date} 23:00`, // 最大时间
      axisLabel: {
        formatter: function (value: number) {
          var date = new Date(value);
          return getzf(date.getHours()) + ":00";
          function getzf(num: any) {
            if (parseInt(num) < 10) {
              num = "0" + num;
            }
            return num;
          }
        },
        showMaxLabel: true,
      },
      splitArea: {
        //网格区域
        show: true, //是否显示
        areaStyle: {
          color: "#0a0819",
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
          // var height = api.size([0, 1])[0];
          return {
            type: "rect", // 表示这个图形元素是矩形。
            shape: echarts.graphic.clipRectByRect(
              {
                x: start[0],
                y: start[1],
                width: 50,
                height: end[1] - start[1],
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
                return (
                  params.value[1].split(" ")[1] +
                  "~" +
                  params.value[2].split(" ")[1]
                );
              },
            },
            value: [1, `${date} 09:00`, `${date} 12:00`], //数据的值
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
                return (
                  params.value[1].split(" ")[1] +
                  "~" +
                  params.value[2].split(" ")[1]
                );
              },
            },
            value: [1, `${date} 17:00`, `${date} 20:00`],
          },
          {
            name: "星期四",
            itemStyle: {
              color,
            },
            label: {
              show: true,
              position: "inside",
              formatter: function (params: any) {
                return (
                  params.value[1].split(" ")[1] +
                  "~" +
                  params.value[2].split(" ")[1]
                );
              },
            },
            value: [3, `${date} 21:00`, `${date} 23:00`],
          },
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
