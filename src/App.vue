<template>
  <!-- <Calendar @on-scroll="OnScroll" :weekendcolored="true"> -->
      <!-- <template v-slot:header="slotProps">
            <h1>{{ slotProps.headerlabel }}</h1>
        </template> -->
      <!-- <template v-slot:headercell="slotProps">
        <span>{{ slotProps.daylabel.short }}</span>
    </template> -->
    <!-- <template v-slot:daycell="slotProps">
        <span>{{ slotProps.day.num }}</span>
    </template> -->
  <!-- </Calendar> -->
    <Scroller orientation="horizontal" :numcols="6" :data="scrollerdata">
        <!-- <template v-slot:cell="">            
        </template>  -->
    </Scroller>
</template>

<script>
import Calendar from "./components/calendar/Calendar.vue";
import Scroller from "./components/scroller/Scroller.vue";

export default {
  name: "App",
  data: function () {
    return {
      scrollerdata: []
    }
  },
  components: {
    Calendar,
    Scroller
  },
  methods: {
      OnScroll() {
          console.log("scrolled");
      }
  },
  mounted() {
      for(var f=0; f < 120; f++)
      {
          this.scrollerdata.push({id: f+1});
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
