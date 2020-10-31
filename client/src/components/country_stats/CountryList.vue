<template>
  <div className="container">
    <div className="container-header">
      <div className="container-header-item">
        <div className="container-header-item-label">Country</div>
        <div className="container-header-item-data">{{ country }}</div>
      </div>
      <div className="container-header-item">
        <div className="container-header-item-label">Population</div>
        <div className="container-header-item-data">
          {{ latest.population.toLocaleString() }}
        </div>
      </div>
      <div className="container-header-item">
        <div className="container-header-item-label">+&nbsp;Confirmed</div>
        <div className="container-header-item-data">
          {{ latest.confirmed.toLocaleString() }}
        </div>
      </div>
      <div className="container-header-item">
        <div className="container-header-item-label">+&nbsp;Recovered</div>
        <div className="container-header-item-data">
          {{ latest.recovered.toLocaleString() }}
        </div>
      </div>
      <div className="container-header-item">
        <div className="container-header-item-label">+&nbsp;Deaths</div>
        <div className="container-header-item-data">
          {{ latest.deaths.toLocaleString() }}
        </div>
      </div>
    </div>
    <div className="table">
      <div className="table-header">
        <div className="table-header-item">
          <div>Date</div>
        </div>
        <div className="table-header-item">
          <div>Confirmed</div>
        </div>
        <div className="table-header-item">
          <div>Recovered</div>
        </div>
        <div className="table-header-item">
          <div>Deaths</div>
        </div>
      </div>
      <div className="table-body">
        <CountryEntry
          v-for="stat in stats"
          v-bind:key="stat._id"
          v-bind:stat="stat"
        />
      </div>
    </div>
    <div className="container-footer">
      <router-link :to="{ name: 'Home' }">Go Back</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CountryEntry from "./CountryEntry";
export default {
  name: "CountryList",
  props: ["country"],
  components: { CountryEntry },
  data() {
    return {
      stats: [],
      latest: { population: 0, confirmed: 0, recovered: 0, deaths: 0 },
    };
  },
  created() {
    axios
      .get(`/api/stats/country/${this.country}`)
      .then((response) => {
        this.stats = response.data.stats;
        this.latest = response.data.stats[0];
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style></style>
