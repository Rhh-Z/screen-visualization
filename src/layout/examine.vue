<script setup lang="ts">
defineProps<{
  title: string;
  tableData: Array<object>;
}>();
</script>

<template>
  <div class="examine">
    <div class="data-show">
      <h1 class="title">{{ title }}</h1>

      <div style="width: 100%; height: 100%">
        <el-table
          :data="tableData"
          header-align="center"
          style="width: 100%"
          height="250"
        >
          <el-table-column
            fixed
            align="center"
            prop="examineCode"
            label="审核编号"
            width="150"
          />
          <el-table-column
            prop="name"
            align="center"
            label="作品名称"
            width="150"
          />
          <el-table-column
            align="center"
            prop="date"
            label="上传时间"
            width="120"
          />
          <el-table-column
            align="center"
            prop="designer"
            label="设计师"
            width="100"
          />
        </el-table>
      </div>
    </div>

    <div class="completion-degree">
      <slot name="chart" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variable.css";

.examine {
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 20%;
  border-radius: 10px;
  margin-bottom: 10px;
  border: 1px solid var(--border-color);

  &:hover {
    border-color: #14d679;
  }

  .data-show {
    position: relative;
    display: flex;
    align-items: baseline;
    width: 70%;
    height: 100%;
    padding: 20px;

    &::before {
      content: "";
      position: absolute;
      width: 5px;
      height: 50px;
      top: 0;
      right: -3px;
      background-color: var(--color-blue);
      z-index: 10;
    }

    &::after {
      content: "";
      position: absolute;
      width: 50px;
      height: 5px;
      top: 0;
      right: -25px;
      background-color: var(--color-blue);
      z-index: 10;
    }

    .title {
      width: 130px;
    }
  }

  .completion-degree {
    position: relative;
    padding: 10px;
    width: 30%;
    height: 100%;
    border-left: 1px solid var(--border-color);

    &::before {
      content: "";
      position: absolute;
      width: 5px;
      height: 50px;
      bottom: 0;
      left: -4px;
      background-color: var(--color-blue);
      z-index: 10;
    }

    &::after {
      content: "";
      position: absolute;
      width: 50px;
      height: 5px;
      bottom: 0;
      left: -25px;
      background-color: var(--color-blue);
      z-index: 10;
    }
  }
}
</style>
