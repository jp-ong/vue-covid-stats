<template
  ><div className="table-body-row">
    <div className="table-body-row-item">{{ formatDate(stat.date) }}</div>
    <div className="table-body-row-item">
      {{ stat.confirmed.toLocaleString() || "" }}
    </div>
    <div className="table-body-row-item">
      {{ stat.recovered.toLocaleString() || "" }}
    </div>
    <div className="table-body-row-item">
      {{ stat.deaths.toLocaleString() || "" }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CountryEntry",
  props: ["stat"],
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-CA");
    },
  },
};
</script>

<style></style>
