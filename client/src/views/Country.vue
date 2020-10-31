<template>
  <NavBar />
  <CountryList v-bind:country="country" />
</template>

<script>
import NavBar from "../components/NavBar";
import CountryList from "../components/country_stats/CountryList";
export default {
  name: "Country",
  props: ["country"],
  components: { NavBar, CountryList },
};
</script>
