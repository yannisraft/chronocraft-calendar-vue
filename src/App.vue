<template>
<h1>ChronoCraft Calendar Test Playground</h1>
<Calendar @on-scroll="OnScroll" @on-delete-event="RemoveEvent" :events="events" :eventtypes="eventtypes" :weekendcolored="true" class="calendar" :cellheight="180" :cellsquared="false" :height="400">
    <!-- <template v-slot:header="slotProps">
        <span>{{ slotProps.headerlabel }}</span>
    </template>
    <template v-slot:headercell="slotProps">
        <span>{{ slotProps.daylabel.title }}</span>
    </template> -->
</Calendar>
<button @click="RemoveEvent(7)">Remove</button>
<button @click="AddEvent()">Add</button>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';
import Calendar from './components/Calendar/Calendar.vue';

export default defineComponent({
    name: 'App',
    components: {
        Calendar
    },
    data: function () {
        return {
            eventtypes: [
                {
                    type: 'meeting',
                    title: 'Meeting',
                    color: "#f7a47d"
                },
                {
                    type: 'work',
                    title: 'Work',
                    color: "#a1e762"
                },
                {
                    type: 'break',
                    title: 'Break',
                    color: "#ffe087"
                }
            ],
            events: [{
                    id: 1,
                    title: "Event #1",
                    type: 'meeting',
                    category: 'test',
                    description: "lalal and lololo koasda asd",
                    startdate: new Date('2022-02-21T10:20:30Z'),
                    enddate: new Date('2022-02-22T10:20:30Z'),
                },
                {
                    id: 2,
                    title: "Event #2",
                    type: 'work',
                    category: 'test',
                    description: "lalal and lololo koasda asd",
                    startdate: new Date('2022-02-22T10:20:30Z'),
                    enddate: new Date('2022-02-23T10:20:30Z'),
                },
                {
                    id: 3,
                    title: "Event #3",
                    type: 'break',
                    category: 'test',
                    description: "lalal and lololo koasda asd",
                    startdate: new Date('2022-02-25T10:20:30Z'),
                    enddate: new Date('2022-02-26T10:20:30Z'),
                },
                {
                    id: 4,
                    title: "Event #4",
                    type: 'break',
                    category: 'test',
                    description: "lalal and lololo koasda asd",
                    startdate: new Date('2022-02-25T10:20:30Z'),
                    enddate: new Date('2022-02-26T10:20:30Z'),
                },
                {
                    id: 5,
                    title: "Event #5",
                    type: 'work',
                    category: 'test',
                    description: "lalal and lololo koasda asd",
                    startdate: new Date('2022-02-25T10:20:30Z'),
                    enddate: new Date('2022-02-26T10:20:30Z'),
                },
                {
                    id: 6,
                    title: "Event #6",
                    type: 'meeting',
                    category: 'test',
                    description: "lalal and lololo koasda asd",
                    startdate: new Date('2022-02-23T10:20:30Z'),
                    enddate: new Date('2022-02-26T10:20:30Z'),
                },
                {
                    id: 7,
                    title: "Event #7",
                    type: 'meeting',
                    category: 'test',
                    description: "lalal and lololo koasda asd",
                    startdate: new Date('2022-02-25T10:20:30Z'),
                    enddate: new Date('2022-02-28T10:20:30Z'),
                },
                {
                    id: 8,
                    title: "Event #8",
                    type: 'work',
                    category: 'test',
                    description: "lalal and lololo koasda asd",
                    startdate: new Date('2022-02-24T10:20:30Z'),
                    enddate: new Date('2022-03-01T10:20:30Z'),
                },
                {
                    id: 9,
                    title: "Event #9",
                    type: 'work',
                    description: "lalal and lololo koasda asd",
                    startdate: new Date('2022-02-18T10:20:30Z'),
                    enddate: new Date('2022-02-21T10:20:30Z'),
                },
                {
                    id: 10,
                    title: "Event #10",
                    type: 'work',
                    description: "lalal and lololo koasda asd",
                    startdate: new Date('2022-02-20T10:20:30Z'),
                    enddate: new Date('2022-02-22T10:20:30Z'),
                },
                {
                    id: 11,
                    title: "Event #11",
                    type: 'break',
                    category: 'test',
                    description: "lalal and lololo koasda asd",
                    startdate: new Date('2022-02-24T10:20:30Z'),
                    enddate: new Date('2022-03-01T10:20:30Z'),
                }
            ]
        }
    },
    methods: {
        OnScroll() {
            //
        },
        AddEvent() {
            this.events.push({
                id: 12,
                title: "Event #12",
                type: 'break',
                category: 'test',
                description: "on three ",
                startdate: new Date('2022-03-02T10:20:30Z'),
                enddate: new Date('2022-03-07T10:20:30Z'),
            });
        },
        RemoveEvent(eventid: number) {
            this.events = this.events.filter(function (event: any) {
                return event.id != eventid;
            });
        }
    }
});
</script>

<style>
#app {
    font-family: 'Advent Pro', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

h1 {
    font-weight: 400 !important;
}

.calendar {
    max-width: 900px;
    margin: 0px auto;
}

.widget-container {
    border: 0px solid;
    box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
    text-indent: 10px;
    font-size: 16pt;
    padding: 20px;
    margin: 0px auto;
    max-width: 50%;
    margin-bottom: 20px;
    position: relative;
}

.widget-container h3 {
    margin-top: 10px;
    font-family: 'Advent Pro', sans-serif;
    font-weight: 300 !important;
}

.madewith {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 12pt;
}

@media screen and (max-width: 600px) {
    .widget-container {
        max-width: 90%;
    }
}

@media screen and (max-width: 960px) {
    .widget-container {
        max-width: 70%;
    }
}

.datepicker-panel {
    z-index: 100000000;
}
</style>
