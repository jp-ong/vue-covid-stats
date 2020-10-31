<template>
  <div className="nav">
    <div className="nav-brand">
      <a href="/"> <span>COVID-19</span>Global </a>
    </div>
    <div className="nav-info">
      <div className="nav-info-author">
        By:
        <a
          href="https://github.com/jp-ong"
          target="_blank"
          rel="noopener noreferrer"
        >
          John Paul Ong
        </a>
      </div>
      <div className="nav-info-credit">John Hopkins COVID-19 Data</div>
      <div className="nav-info-clock">
        <span>{{ currentDate.toLocaleString() }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    setInterval(() => tickDate(), 1000);
    const currentDate = ref(new Date());
    function tickDate() {
      currentDate.value = new Date();
    }
    return {
      currentDate,
    };
  },
};
</script>
