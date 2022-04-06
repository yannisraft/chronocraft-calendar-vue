<template>
<div class="ccr-panel" style="width: 80%; margin: 0px auto;">
    <h1>ChronoCraft Calendar Test Playground</h1>
    <!-- Variation for stylus :monthcolorvariations="['#332c58','#3f366a','#4c417e','#3f366a']" -->
    <Calendar @on-scroll="OnScroll" @on-delete-event="RemoveEvent"  timezone="America/New_York" locale="el-GR" v-model="events" :eventtypes="eventtypes" :weekendcolored="true" class="calendar" :cellheight="180" :cellsquared="false" :height="400">
        <!-- <template v-slot:header="slotProps">
        <span>{{ slotProps.headerlabel }}</span>
    </template>
    <template v-slot:headercell="slotProps">
        <span>{{ slotProps.daylabel.title }}</span>
    </template> -->
    </Calendar>
    <div style="margin-top: 20px;">
    <button @click="RemoveEvent(7)" class="ccr-normal stylemodebtn" style="margin-left: 10px;">Remove</button>
    <button @click="AddEvent()" class="ccr-normal stylemodebtn" style="margin-left: 10px;">Add</button>
    </div>
    <div style="margin-top: 20px;">
        <button @click="ApplyTheme('Flat')" class="stylemodebtn" style="margin-left: 10px;" type="button">Theme Flat</button>
        <button @click="ApplyTheme('Stylus')" class="stylemodebtn" style="margin-left: 10px;" type="button">Theme Stylus</button>
        <button @click="ApplyTheme('Opus')" class="stylemodebtn" style="margin-left: 10px;" type="button">Theme Opus</button>
    </div>
</div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';
import Calendar from './components/Calendar/Calendar.vue';

import { Theme } from "./interfaces";
import {
    ThemeManager,
    formatDate
} from "./utilities/index";

const {
    DateTime
} = require("luxon");

export default defineComponent({
    name: 'App',
    components: {
        Calendar
    },
    data: function () {
        return {
            themeManager: new ThemeManager(),
            themes: [
                {
                    name: "Flat",
                    link: "/themes/ccr.theme.flat/ccr.theme.flat.css"
                },
                {
                    name: "Stylus",
                    link: "/themes/ccr.theme.stylus/ccr.theme.stylus.css"
                },
                {
                    name: "Opus",
                    link: "/themes/ccr.theme.opus/ccr.theme.opus.css"
                }
            ],
            eventtypes: [{
                    type: 'meeting',
                    title: 'Meeting',
                    color: "#ffa1b4"
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
                    startdate: DateTime.fromISO('2022-03-21T10:20:30Z'),
                    enddate: DateTime.fromISO('2022-03-22T10:20:30Z'),
                },
                {
                    id: 2,
                    title: "Event #2",
                    type: 'work',
                    category: 'test',
                    description: "lalal and lololo koasda asd",
                    startdate: DateTime.fromISO('2022-03-22T10:20:30Z'),
                    enddate: DateTime.fromISO('2022-03-23T10:20:30Z'),
                },
                {
                    id: 3,
                    title: "Event #3",
                    type: 'break',
                    category: 'test',
                    description: "lalal and lololo koasda asd",
                    startdate: DateTime.fromISO('2022-03-25T10:20:30Z'),
                    enddate: DateTime.fromISO('2022-03-26T10:20:30Z'),
                },
                {
                    id: 4,
                    title: "Event #4",
                    type: 'break',
                    category: 'test',
                    description: "lalal and lololo koasda asd",
                    startdate: DateTime.fromISO('2022-03-25T10:20:30Z'),
                    enddate: DateTime.fromISO('2022-03-26T10:20:30Z'),
                },
                {
                    id: 5,
                    title: "Event #5",
                    type: 'work',
                    category: 'test',
                    description: "lalal and lololo koasda asd",
                    startdate: DateTime.fromISO('2022-03-25T10:20:30Z'),
                    enddate: DateTime.fromISO('2022-03-26T10:20:30Z'),
                },
                {
                    id: 6,
                    title: "Event #6",
                    type: 'meeting',
                    category: 'test',
                    description: "lalal and lololo koasda asd",
                    startdate: DateTime.fromISO('2022-03-23T10:20:30Z'),
                    enddate: DateTime.fromISO('2022-03-26T10:20:30Z'),
                },
                {
                    id: 7,
                    title: "Event #7",
                    type: 'meeting',
                    category: 'test',
                    description: "lalal and lololo koasda asd",
                    startdate: DateTime.fromISO('2022-03-25T10:20:30Z'),
                    enddate: DateTime.fromISO('2022-03-28T10:20:30Z'),
                },
                {
                    id: 8,
                    title: "Event #8",
                    type: 'work',
                    category: 'test',
                    description: "lalal and lololo koasda asd",
                    startdate: DateTime.fromISO('2022-03-24T10:20:30Z'),
                    enddate: DateTime.fromISO('2022-04-01T10:20:30Z'),
                },
                {
                    id: 9,
                    title: "Event #9",
                    type: 'work',
                    description: "lalal and lololo koasda asd",
                    startdate: DateTime.fromISO('2022-03-18T10:20:30Z'),
                    enddate: DateTime.fromISO('2022-03-21T10:20:30Z'),
                },
                {
                    id: 10,
                    title: "Event #10",
                    type: 'work',
                    description: "lalal and lololo koasda asd",
                    startdate: DateTime.fromISO('2022-03-20T10:20:30Z'),
                    enddate: DateTime.fromISO('2022-03-22T10:20:30Z'),
                },
                {
                    id: 11,
                    title: "Event #11",
                    type: 'break',
                    category: 'test',
                    description: "lalal and lololo koasda asd",
                    startdate: DateTime.fromISO('2022-03-24T10:20:30Z'),
                    enddate: DateTime.fromISO('2022-04-01T10:20:30Z'),
                }
            ]
        }
    },
    methods: {
        OnScroll() {
            //
        },
        AddEvent() {
            this.events = [...this.events, {
                id: 12,
                title: "Event #12",
                type: 'break',
                category: 'test',
                description: "on three ",
                startdate: DateTime.fromISO('2022-04-01T10:20:30Z'),
                enddate: DateTime.fromISO('2022-04-07T10:20:30Z'),
            }];
        },
        RemoveEvent(eventid: number) {
            this.events = this.events.filter(function (event: any) {
                return event.id != eventid;
            });
        },
        ApplyTheme(themename: string) {
            let theme = this.themes.find(i => i.name === themename);
            if(theme)
            {
                this.themeManager.theme = theme.name;
            }
        }
    },
    mounted() {       
        this.themeManager.setThemes(this.themes);
        this.themeManager.theme = 'Stylus';
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
