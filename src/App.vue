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
<Scroller orientation="horizontal" :cellwidth="200" :numcols="4" :numrows="4" :contentpadding="30" :wheelscrollspeed="20" :data="scrollerdata" :cellsquared="true" @on-scroll="OnScroll" @on-update-data-next="onUpdateDataNext" @on-update-data-previous="onUpdateDataPrevious">
    <!-- <template v-slot:cell="">            
        </template>  -->
</Scroller>
<div style="padding-top: 50px;">
    <button class="btndemo">Click Me</button>
</div>
</template>

<script>
import Calendar from "./components/calendar/Calendar.vue";
import Scroller from "./components/scroller/Scroller.vue";

export default {
    name: "App",
    data: function () {
        return {
            scrollerdata: [],
            lastid: 10000
        }
    },
    components: {
        Calendar,
        Scroller
    },
    methods: {
        OnScroll() {
            //
        },
        onUpdateDataNext(done) {
            console.log('update-next');

            var newdata = [];
            for (var f = this.lastid; f < this.lastid + 20; f++) {
                newdata.push({
                    id: f + 1
                });
            }

            this.lastid = this.lastid+20;

            done(newdata);
        },
        onUpdateDataPrevious(done) {
            console.log('update-previous');

            var newdata = [];
            for (var f = this.lastid; f < this.lastid + 20; f++) {
                newdata.push({
                    id: f + 1
                });
            }

            this.lastid = this.lastid + 20;

            done(newdata);
        }
    },
    mounted() {
        for (var f = this.lastid; f < this.lastid + 60; f++) {
            this.scrollerdata.push({
                id: f + 1
            });
        }
        this.lastid = this.lastid + 120;
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
    -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.btndemo {
    background: rgb(225,231,240);
    background: -moz-linear-gradient(0deg, rgba(225,231,240,1) 0%, rgba(239,244,251,1) 100%);
    background: -webkit-linear-gradient(0deg, rgba(225,231,240,1) 0%, rgba(239,244,251,1) 100%);
    background: linear-gradient(0deg, rgba(225,231,240,1) 0%, rgba(239,244,251,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#e1e7f0",endColorstr="#eff4fb",GradientType=1);
    padding: 10px 20px 10px 20px;
    font-family: 'Century Gothic';
    border-radius: 7px;
    border: 0px solid;
    border-bottom: 1px solid #a0adbb;
    box-shadow: 0px 2px 3px rgba(0,0,0,0.2);
    
}

.btndemo:hover {
    background: rgb(230,236,245);
    background: -moz-linear-gradient(0deg, rgba(230,236,245,1) 0%, rgba(246,250,255,1) 100%);
    background: -webkit-linear-gradient(0deg, rgba(230,236,245,1) 0%, rgba(246,250,255,1) 100%);
    background: linear-gradient(0deg, rgba(230,236,245,1) 0%, rgba(246,250,255,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#e6ecf5",endColorstr="#f6faff",GradientType=1);
}

.btndemo:active {
    background: #d2d8df;
    margin-top: 1px;
    border-bottom: 0px solid;
    box-shadow: 0px 2px 1px rgba(0,0,0,0.2);
}
</style>
