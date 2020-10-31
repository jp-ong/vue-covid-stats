<template>
  <div className="list-body-row">
    <div className="list-body-row-item">
      <span>{{ stat.country }}</span>
    </div>
    <div className="list-body-row-item">
      <div className="list-body-row-item-label">Population</div>
      {{ parseInt(stat.population).toLocaleString() }}
    </div>
    <div className="list-body-row-item">
      <div className="list-body-row-item-label">Confirmed</div>
      {{ stat.confirmed.toLocaleString() }}
    </div>
    <div className="list-body-row-item">
      <div className="list-body-row-item-label">Recovered</div>
      {{ stat.recovered.toLocaleString() }}
    </div>
    <div className="list-body-row-item">
      <div className="list-body-row-item-label">Deaths</div>
      {{ stat.deaths.toLocaleString() }}
    </div>
    <div className="list-body-row-item">
      <router-link :to="`/country/${stat.country}`">&raquo;</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "GlobalEntry",
  props: ["stat"],
};
</script>
