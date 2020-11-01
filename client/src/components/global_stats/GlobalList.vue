<template>
  <div className="container">
    <div className="container-controls">
      <button @click="this.shiftDay(1)" v-bind:class="{ disabled: is_loading }">
        -
      </button>
      <div className="container-controls-data">
        {{ new Date(date).toLocaleDateString("en-CA") }}
      </div>
      <button
        @click="this.shiftDay(-1)"
        v-bind:class="{ disabled: is_loading }"
      >
        +
      </button>
    </div>
    <div className="container-header" id="total">
      <div className="container-header-item">
        <div className="container-header-item-label">Confirmed</div>
        <div className="container-header-item-data">
          {{ totals.total_confirmed.toLocaleString() }}
        </div>
      </div>
      <div className="container-header-item">
        <div className="container-header-item-label">Recovered</div>
        <div className="container-header-item-data">
          {{ totals.total_recovered.toLocaleString() }}
        </div>
      </div>
      <div className="container-header-item">
        <div className="container-header-item-label">Deaths</div>
        <div className="container-header-item-data">
          {{ totals.total_deaths.toLocaleString() }}
        </div>
      </div>
    </div>
    <div className="list">
      <div className="list-header">
        <div className="list-header-item">
          <button>Country</button>
        </div>
        <div className="list-header-item">
          <button>
            Population
          </button>
        </div>
        <div className="list-header-item">
          <button>
            Confirmed
          </button>
        </div>
        <div className="list-header-item">
          <button>
            Recovered
          </button>
        </div>
        <div className="list-header-item">
          <button>Deaths</button>
        </div>
        <div className="list-header-item">
          <button>&nbsp;</button>
        </div>
      </div>
      <div className="list-body" v-if="!is_loading">
        <img v-bind:src="spinner" alt="Loading" v-if="is_loading" />
        <GlobalEntry
          v-bind:stat="stat"
          v-bind:key="stat._id"
          v-for="stat in stats"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GlobalEntry from "./GlobalEntry";
import axios from "axios";
import Spinner from "../../assets/spinner.svg";
export default {
  name: "GlobalList",
  components: { GlobalEntry },
  data() {
    return {
      day: 1,
      date: new Date(),
      stats: [],
      results: null,
      is_loading: false,
      spinner: Spinner,
      totals: {
        total_confirmed: 0,
        total_recovered: 0,
        total_deaths: 0,
      },
    };
  },
  methods: {
    shiftDay(n) {
      if (n === -1 && this.day === 1) {
        return;
      }
      this.day += n;
      this.fetchStats(this.day);
    },
    fetchStats(day) {
      this.is_loading = true;
      axios
        .get(`/api/stats/latest/${day}`)
        .then((response) => {
          this.displayStats(response);
        })
        .catch(({ response }) => {
          console.error(response.data);
          this.is_loading = false;
        });
    },
    displayStats(response) {
      this.stats = response.data.stats;
      this.results = response.data.results;
      this.date = response.data.stats[0].date;
      this.totals = {
        total_confirmed: response.data.stats.reduce((total, data) => {
          return total + data["confirmed"];
        }, 0),
        total_recovered: response.data.stats.reduce((total, data) => {
          return total + data["recovered"];
        }, 0),
        total_deaths: response.data.stats.reduce((total, data) => {
          return total + data["deaths"];
        }, 0),
      };
      this.is_loading = false;
    },
  },
  created() {
    this.fetchStats(this.day);
  },
};
</script>
