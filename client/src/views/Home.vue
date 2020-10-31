<template>
  <NavBar />
  <GlobalList />
</template>

<script>
import NavBar from "../components/NavBar";
import GlobalList from "../components/global_stats/GlobalList";
export default {
  name: "Home",
  components: { NavBar, GlobalList },
};
</script>
