<template>
  <div class="records-info">
    <span>{{ startRecord }}</span
    >–<span>{{ endRecord }}</span> из <span>{{ total }}</span> записей
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  computed: {
    startRecord() {
      return (this.currentPage - 1) * this.pageSize + 1;
    },
    endRecord() {
      return Math.min(this.currentPage * this.pageSize, this.total);
    },
  },
};
</script>

<style scoped>
.records-info {
  font-size: 14px;
  margin: 10px 0;
}
span {
  font-weight: bold;
}
</style>
