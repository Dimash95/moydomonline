<template>
  <div class="page-size-dropdown">
    <select v-model="localPageSize" @change="updatePageSize">
      <option v-for="size in pageSizes" :key="size" :value="size">
        {{ size }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    pageSizes: {
      type: Array,
      default: () => [5, 10, 25, 50],
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      // Локальное состояние для pageSize
      localPageSize: this.pageSize,
    };
  },
  watch: {
    // Следим за изменением пропса и обновляем локальное состояние
    pageSize(newPageSize) {
      this.localPageSize = newPageSize;
    },
  },
  methods: {
    // Метод для обновления страницы через событие
    updatePageSize() {
      this.$emit("changePageSize", this.localPageSize);
    },
  },
};
</script>

<style scoped>
.page-size-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
}

select {
  background-color: #f7f8fa;
  border: none;
  width: 70px;
  font-size: 16px;
}
</style>
