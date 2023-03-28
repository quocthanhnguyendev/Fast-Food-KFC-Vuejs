<template>
  <div class="App">
    <NavbarComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from "./components/NavbarComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
  name: "App",
  components: {
    NavbarComponent,
    FooterComponent,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Roboto&display=swap");
body {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}
</style>
