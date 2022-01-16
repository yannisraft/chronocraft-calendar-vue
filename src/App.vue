<template>
  <Calendar @on-scroll="OnScroll" :weekendcolored="true">
      <!-- <template v-slot:header="slotProps">
            <h1>{{ slotProps.headerlabel }}</h1>
        </template> -->
      <!-- <template v-slot:headercell="slotProps">
        <span>{{ slotProps.daylabel.short }}</span>
    </template> -->
    <!-- <template v-slot:daycell="slotProps">
        <span>{{ slotProps.day.num }}</span>
    </template> -->
  </Calendar>
</template>

<script>
import Calendar from "./components/calendar/Calendar.vue";

export default {
  name: "App",
  components: {
    Calendar
  },
  methods: {
      OnScroll() {
          console.log("scrolled");
      }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
