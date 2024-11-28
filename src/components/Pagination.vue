<template>
  <div class="pagination">
    <button :disabled="currentPage === 1" @click="changePage(1)">
      &laquo;
    </button>
    <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
      &lt;
    </button>
    <span v-for="page in visiblePages" :key="page">
      <button
        v-if="page !== '...'"
        :class="{ active: currentPage === page }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
      <span v-else class="dots">...</span>
    </span>
    <button
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
    >
      &gt;
    </button>
    <button
      :disabled="currentPage === totalPages"
      @click="changePage(totalPages)"
    >
      &raquo;
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: Number,
    totalPages: Number,
  },
  emits: ["changePage"],
  computed: {
    visiblePages() {
      const pages = [];
      const delta = 2; // Число страниц до и после текущей

      // Показываем первые страницы
      if (this.currentPage > delta + 2) {
        pages.push(1, 2, "...");
      } else {
        for (let i = 1; i < this.currentPage; i++) {
          pages.push(i);
        }
      }

      // Показываем текущую страницу и соседние
      for (
        let i = Math.max(1, this.currentPage - delta);
        i <= Math.min(this.totalPages, this.currentPage + delta);
        i++
      ) {
        pages.push(i);
      }

      // Показываем последние страницы
      if (this.currentPage < this.totalPages - delta - 1) {
        pages.push("...", this.totalPages - 1, this.totalPages);
      } else {
        for (let i = this.currentPage + 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      }

      return [...new Set(pages)]; // Убираем дубликаты
    },
  },
  methods: {
    changePage(page) {
      if (page !== this.currentPage && page !== "...") {
        this.$emit("changePage", page);
      }
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

button {
  background: none;
  border: none;
  color: #cccccc;
  cursor: pointer;
  font-size: 14px;
  padding: 5px 10px;
  transition: color 0.3s, background 0.3s;
}

button:hover {
  color: green;
}

button:disabled {
  display: none;
}

button.active {
  background: green;
  color: #fff;
  border-radius: 50%;
  padding: 8px 13px;
}

.dots {
  color: #cccccc;
  padding: 5px 10px;
  font-size: 14px;
}
</style>
