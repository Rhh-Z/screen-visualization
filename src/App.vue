<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
// @ts-ignore
import autofit from "autofit.js";
import dayjs from "dayjs";
import MeetingRoomChart from "./layout/echarts/meetingRoomChart.vue";
import AttendanceChart from "./layout/echarts/attendanceChart.vue";
import GagueChart from "./layout/echarts/gagueChart.vue";
import RatioPieChart from "./layout/echarts/ratioPieChart.vue";
import Examine from "./layout/examine.vue";
import ArrowLeft from '@/assets/svg/arrow-left.svg'
import ArrowRight from '@/assets/svg/arrow-right.svg'
import Close from '@/assets/svg/close.svg'
import { CalendarDateType, CalendarInstance } from "element-plus";

const date = dayjs().format("YYYY-MM-DD");
const currentMonth = dayjs().get("month") + 1

function getWeek() {
  const datas = dayjs().day();
  const week = ["日", "一", "二", "三", "四", "五", "六"];
  return "星期" + week[datas];
}
const week = getWeek();
const time = ref(dayjs().format("HH:mm:ss"));
const timer = setInterval(() => {
  time.value = dayjs().format("HH:mm:ss");
}, 1000);

const calendar = ref<CalendarInstance>()

const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) return
  calendar.value.selectDate(val)
}

const tableData1 = [
  {
    examineCode: "0001",
    name: "惊蛰启动项",
    date: "2019-2-19",
    designer: "陈一",
  },
  {
    examineCode: "0002",
    name: "女神节专题网页",
    date: "2019-2-19",
    designer: "吴十",
  },
  {
    examineCode: "0003",
    name: "科技风H5",
    date: "2019-2-18",
    designer: "严数",
  },
];

const tableData2 = [
  {
    examineCode: "0001",
    name: "理财banner",
    date: "2019-2-18",
    designer: "陈一",
  },
  {
    examineCode: "0002",
    name: "二十四节气插画",
    date: "2019-2-18",
    designer: "吴十",
  },
  {
    examineCode: "0003",
    name: "科技风主题网页",
    date: "2019-2-18",
    designer: "包志国",
  },
];

const usageData = [
  { value: 90, name: "报销", itemStyle: { color: "#3b54d3" } },
  { value: 10, name: "请假", itemStyle: { color: "#f10f6a" } },
];

const educationData = [
  { value: 90, name: "本科", itemStyle: { color: "#3b54d3" } },
  { value: 10, name: "研究生", itemStyle: { color: "#f10f6a" } },
];

onMounted(() => {
  autofit.init({
    //@ts-ignore
    designHeight: 1080,
    designWidth: 1920,
    renderDom: "#app",
    resize: true,
  });
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<template>
  <div class="container">
    <header class="header">
      <div class="header-fake" />
      <div class="header-before"/>
      <div class="header-after"/>
      <div class="header--content">
        <h1 class="header--content__title">网络科技办公自动化监控系统</h1>
        <div class="header--content__time">
          <span style="margin-right: 10px">{{ date }}</span>
          <span style="margin-right: 10px">{{ week }}</span>
          <span>{{ time }}</span>
        </div>
      </div>
    </header>


    <div class="main">
      <aside class="left-container">
        <div class="attendance">
          <span class="attendance--more">更多 ></span>
          <AttendanceChart />
        </div>

        <div class="meetingRoom-usage">
          <div class="title">
            <div class="triangle" />
            <h1>会议室使用情况</h1>
          </div>
          
          <div class="chartContain">
            <MeetingRoomChart />
          </div>
        </div>
      </aside>

      <section class="main-container">
        <div class="event">
          <div class="calendar">
            <el-calendar ref="calendar" style="--el-calendar-border: none;">
              <template #date-cell="{ data }">
                <p style="margin:0px;">
                  {{ data.day.split('-').slice(2).join() }}<br />
                  <!--标记-->
                  <div class="budge" />
                </p>
              </template>
              <template #header="{ date }">
                <div class="calendar--content">
                  <ArrowLeft @click="selectDate('prev-month')"/>
                  <div class="date">{{ date }}</div>
                  <div class="cureent-month" v-show="String(currentMonth) === date.split(' ')[2]">本月</div>
                  <ArrowRight  @click="selectDate('next-month')"/>
                </div>
              </template>
            </el-calendar>
          </div>
          <div class="tips">
            <div class="tips--item">
              <img
                class="tips--item__img"
                src="./assets/clock1.png"
                alt="PNG"
              />
              <div class="tips--item__message">
                <div class="time">2019-02-22</div>
                <div class="content">
                  下午14:00设计部在会议室技术培训，希望相关人员准时参加
                </div>
              </div>
            </div>
            <div class="tips--item">
              <img
                class="tips--item__img"
                src="./assets/clock2.png"
                alt="PNG"
              />
              <div class="tips--item__message">
                <div class="time">2019-02-19</div>
                <div class="content">
                  下午16:00运营部在会议室技术培训，希望相关人员准时参加
                </div>
              </div>
            </div>
          </div>
        </div>

        <Examine title="待审核" :tableData="tableData1">
          <template #chart>
            <GagueChart title="完成度" :total="100" :count="85"/>
          </template>
        </Examine>
        <Examine title="已审核" :tableData="tableData2">
          <template #chart>
            <GagueChart title="逾期率" :total="10" :count="3.24"/>
          </template>
        </Examine>
      </section>

      <section class="right-container">
        <div class="office--notice box">
          <div class="office--notice__title">通知办公</div>
          <div class="content--box">
            <div class="content--box__header">
              <div class="title">会议通知</div>
              <Close />
            </div>
            <div class="content">
              <div style="margin-bottom: 1rem;">&emsp;&emsp;早上9:00再大会议室召开项目总结会，希望公司全体人员准时参加</div>
              <div class="sign">2019-2-26 张三</div>
            </div>
          </div>

        </div>

        <div class="traffic-usage-rate box">
          <RatioPieChart title="流程使用率" :data="usageData"/>
        </div>

        <div class="education-rate box">
          <RatioPieChart title="学历占比率" :data="educationData"/>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "./style/index.scss";

</style>
