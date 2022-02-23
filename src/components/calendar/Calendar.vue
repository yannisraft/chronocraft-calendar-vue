<template>
<div class="calendar-container">
    <header>
        <slot :headerlabel="monthLabel" name="header">
            <h1>{{ monthLabel }}</h1>
        </slot>
    </header>
    <ul class="weekdays">
        <li v-for="daylabel in dayslabels" :key="daylabel.title">
            <slot :daylabel="daylabel" name="headercell">
                <abbr :title="daylabel.short">{{ daylabel.title }}</abbr>
            </slot>
        </li>
    </ul>
    <div class="scroller-container">
        <Scroller ref="scrollerref" :cellwidth="cellwidth" :cellheight="cellheight" :orientation="orientation" :numcols="7" :gap="gap" :numrows="3" :height="height" :contentpadding="contentpadding" :wheelscrollspeed="wheelscrollspeed" :newcellslength="newcellslength" :data="scrollerdata" :cellsquared="cellsquared" @on-scroll="OnScroll" @on-update-data-next="onUpdateDataNext" @on-update-data-previous="onUpdateDataPrevious" @on-data-updated="onDataUpdated">
            <template v-slot:cell="slotProps" :style="{ 'background-color': slotProps.data.bgcolor }">
                <div :class="[{ litoday: slotProps.data.today },{ weekendday: slotProps.data.weekend && weekendcolored },'daycell']" :style="{ 'background-color': slotProps.data.bgcolor }">
                    <span>{{ slotProps.data.num }}</span>
                    <div class="cell-events-container">
                        <div v-for="event in slotProps.data.events" :key="event.id" class="event" :style="{'background-color': event.color}">
                            <label>{{ event.title }}</label>
                        </div>
                    </div>
                </div>

            </template>
        </Scroller>
    </div>
</div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    reactive,
    onMounted
} from "vue";

import {
    Scroller
} from 'chronocraft-scroller-vue';

import {
    enumerateDaysBetweenDates,
    formatDate,
    addDays,
    checkIfWeekendDay,
    getDiff,
    daysMatch,
} from "./../../utilities/index";

export default defineComponent({
    name: 'App',
    components: {
        Scroller
    },
    props: {
        data: {
            type: Array,
            default: () => {
                return []
            }
        },
        orientation: {
            type: String,
            default: "vertical",
        },
        height: {
            type: Number,
            default: 400
        },
        gap: {
            type: Number,
            default: 10
        },
        contentpadding: {
            type: Number,
            default: 10
        },
        cellheight: {
            type: Number,
            default: 100
        },
        cellwidth: {
            type: Number,
            default: 100
        },
        cellsquared: {
            type: Boolean,
            default: true,
        },
        wheelscrollspeed: {
            type: Number,
            default: 6
        },
        weekendcolored: {
            type: Boolean,
            default: true,
        },
        monthcolorvariations: {
            type: Array,
            default: () => {
                return ["#f9f7f7", "#edebeb", "#f9f7f7", "#ffffff"]
            }
        },
        dayslabels: {
            type: Array,
            default: () => {
                return [{
                        title: "Sunday",
                        short: "S",
                    },
                    {
                        title: "Monday",
                        short: "M",
                    },
                    {
                        title: "Tuesday",
                        short: "T",
                    },
                    {
                        title: "Wednesday",
                        short: "W",
                    },
                    {
                        title: "Thursday",
                        short: "T",
                    },
                    {
                        title: "Friday",
                        short: "F",
                    },
                    {
                        title: "Saturday",
                        short: "S",
                    },
                ];
            },
        },
        events: {
            type: Array,
            default: () => {
                return [{
                        id: 1,
                        title: "Event #1",
                        color: "#f7a47d",
                        description: "lalal and lololo koasda asd",
                        startdate: new Date('2022-02-21T10:20:30Z'),
                        enddate: new Date('2022-02-21T10:20:30Z'),
                    },
                    {
                        id: 2,
                        title: "Event #2",
                        color: "#a1e762",
                        description: "lalal and lololo koasda asd",
                        startdate: new Date('2022-02-22T10:20:30Z'),
                        enddate: new Date('2022-02-23T10:20:30Z'),
                    },
                    {
                        id: 3,
                        title: "Event #3",
                        color: "#ffe087",
                        description: "lalal and lololo koasda asd",
                        startdate: new Date('2022-02-25T10:20:30Z'),
                        enddate: new Date('2022-02-26T10:20:30Z'),
                    },
                    {
                        id: 4,
                        title: "Event #4",
                        color: "#ffe087",
                        description: "lalal and lololo koasda asd",
                        startdate: new Date('2022-02-25T10:20:30Z'),
                        enddate: new Date('2022-02-26T10:20:30Z'),
                    },
                    {
                        id: 5,
                        title: "Event #5",
                        color: "#ffe087",
                        description: "lalal and lololo koasda asd",
                        startdate: new Date('2022-02-25T10:20:30Z'),
                        enddate: new Date('2022-02-26T10:20:30Z'),
                    },
                    {
                        id: 6,
                        title: "Event #6",
                        color: "#a1e762",
                        description: "lalal and lololo koasda asd",
                        startdate: new Date('2022-02-18T10:20:30Z'),
                        enddate: new Date('2022-02-21T10:20:30Z'),
                    }
                ];
            },
        }
    },
    setup(props, context) {
        let monthLabel = ref("");
        let scrollerdata: any = ref(props.data);
        let newcellslength = 30;
        let bottomDate: any = null;
        let topDate: any = null;
        let startDate: any = null;
        let endDate: any = null;
        let initialdaysToLoad = 70;
        let newdaysToLoad = 28;
        let eventscache: any = {};
        const scrollerref: any = ref(null);

        function UpdateCurrentMonth() {
            let middledateIndex: number = Math.round((scrollerdata.value.length / 2) - 1);
            if (scrollerdata.value[middledateIndex]) {
                var middledate: any = scrollerdata.value[middledateIndex].date;

                var monthnum = middledate.getMonth();
                var monthStr = formatDate(middledate, "MMMM yyyy");

                monthLabel.value = monthStr;
            }
        }

        function ISToday(_date: Date) {
            let today = new Date();

            return (
                _date.getDate() == today.getDate() &&
                _date.getMonth() == today.getMonth() &&
                _date.getFullYear() == today.getFullYear()
            );
        }

        function GenerateForwardMonth(start: any, end: any, atInitialization: Boolean) {
            var fdates = enumerateDaysBetweenDates(start, end);
            var daystoadd = [];
            for (var md = 0; md < fdates.length; md++) {
                if (md > 0) {
                    var date_a = fdates[md];

                    var today = false;
                    if (ISToday(date_a)) {
                        today = true;
                    }

                    var formatted_date = formatDate(date_a, "dd-MMM-yyyy");
                    daystoadd.push({
                        id: formatted_date,
                        date: date_a,
                        //num: formatDate(date_a, 'dd EEE MM'),
                        num: formatDate(date_a, "dd"),
                        events: GetSpecificDateEvents(formatted_date),
                        today: today,
                        weekend: checkIfWeekendDay(date_a),
                        bgcolor: GetMonthColor(date_a.getMonth()),
                    });

                    // Set Bottom Newest Date
                    if (md === fdates.length - 1) bottomDate = date_a;
                }
            }

            return daystoadd;
        }

        function GenerateBackwardMonth(start: any, end: any, atInitialization: Boolean) {
            var bdates = enumerateDaysBetweenDates(start, end);
            var daystoadd = [];
            for (var bd = 0; bd < bdates.length - 1; bd++) {
                if (bd < bdates.length - 1) {
                    var date_b = bdates[bd];

                    var today = false;
                    if (ISToday(date_b)) {
                        today = true;
                    }

                    var formatted_date = formatDate(date_b, "dd-MMM-yyyy");
                    daystoadd.push({
                        id: formatted_date,
                        date: date_b,
                        //num: formatDate(date_b, 'dd EEE MM'),
                        num: formatDate(date_b, "dd"),
                        events: GetSpecificDateEvents(formatted_date),
                        today: today,
                        weekend: checkIfWeekendDay(date_b),
                        bgcolor: GetMonthColor(date_b.getMonth()),
                    });

                    // Set Top Newest Date
                    if (bd === 0) topDate = date_b;
                }
            }

            return daystoadd;
        }

        function GetMonthColor(monthnum: number) {
            let color: String = "#ffffff00";
            let colorIndex: number = 0;
            var max = props.monthcolorvariations.length;

            colorIndex = monthnum % max;

            if (props.monthcolorvariations[colorIndex]) {
                color = (String)(props.monthcolorvariations[colorIndex]);
            }

            return color;
        }

        function UpdateEvents() {

            //TODO
            //TODO
            //TODO
            if (props.events.length > 0) {
                for (var t = 0; t < props.events.length; t++) {
                    let event: any = props.events[t];

                    var dateStr = formatDate(event.startdate, "dd-MMM-yyyy");
                    if (eventscache.hasOwnProperty(dateStr) && typeof eventscache[dateStr] !== 'undefined') {
                        eventscache[dateStr].push(event);
                        console.log("dateStr: ", dateStr);
                        console.log("exists: ", eventscache[dateStr]);
                        console.log("exists typeof: ", eventscache[dateStr]);
                    } else {
                        eventscache[dateStr] = [event];
                    }                    
                }
            }
        }

        function GetSpecificDateEvents(formatted_date: string) {
            let newdate_events: any = [];
            if (eventscache.hasOwnProperty(formatted_date) && typeof eventscache[formatted_date] !== 'undefined') {
                console.log('formatted_date: ', formatted_date);
                if (eventscache[formatted_date].length > 0) {
                    newdate_events = [...eventscache[formatted_date]];
                }
            }

            return newdate_events;
        }

        function GenerateDays() {
            // Initialize with Today
            let d = new Date();
            let day = d.getDay();

            var initialDays = [];
            var today_id = '';

            // 1. Add backward days
            for (var b = day; b >= 0; b--) {
                var newdate = new Date(d.getTime());
                newdate = addDays(newdate, -b);

                var today = false;
                var formatted_date = formatDate(newdate, "dd-MMM-yyyy");
                if (ISToday(newdate)) {
                    today = true;
                    today_id = formatted_date;
                }

                let _daytopush: any = {
                    id: formatted_date,
                    date: newdate,
                    events: GetSpecificDateEvents(formatted_date),
                    num: formatDate(newdate, "dd"),
                    today: today,
                    weekend: checkIfWeekendDay(newdate),
                    bgcolor: GetMonthColor(newdate.getMonth()),
                };

                initialDays.push(_daytopush);
            }

            // 2. Add forward days
            var forwarddaystoload = 6 - day;
            for (var f = 1; f <= forwarddaystoload; f++) {
                var newdate_f = new Date(d.getTime());                
                newdate_f = addDays(newdate_f, f);
                var formatted_date_f = formatDate(newdate_f, "dd-MMM-yyyy");

                initialDays.push({
                    id: formatted_date_f,
                    date: newdate_f,
                    events: GetSpecificDateEvents(formatted_date_f),
                    num: formatDate(newdate_f, "dd"),
                    today: false,
                    weekend: checkIfWeekendDay(newdate_f),
                    bgcolor: GetMonthColor(newdate_f.getMonth()),
                });
            }

            // 3. Now add forward 1 month
            var lastdate: any = initialDays[initialDays.length - 1].date;
            var lastmonthdate: any = addDays(lastdate, Math.round(initialdaysToLoad));
            var daystoadd = GenerateForwardMonth(lastdate, lastmonthdate, true);
            initialDays = [...initialDays, ...daystoadd];

            // 3. Now add backward 1 month
            let firstdate: any = initialDays[0].date;
            let firstdateofmonth: any = addDays(firstdate, Math.round(-initialdaysToLoad));
            var daystoaddbackward = GenerateBackwardMonth(firstdateofmonth, firstdate, true);
            //scrollerdata.value = [...daystoaddbackward, ...scrollerdata.value];
            initialDays = [...daystoaddbackward, ...initialDays];

            // console.log(initialDays.length);

            scrollerdata.value.push(...initialDays);

            // 4. Scroll today date
            setTimeout(() => {
                if (today_id !== '') {
                    var cellPosition = scrollerref.value.GetCellsPosition(today_id);
                    scrollerref.value.ScrollTo(cellPosition);
                }
            }, 1000);

            //UpdateCurrentMonth();

        } // end f(): Generate Calendar Days

        const OnScroll = () => {
            UpdateCurrentMonth();
        }

        const onUpdateDataNext = (done: (data: any) => void) => {
            startDate = bottomDate;
            endDate = addDays(bottomDate, newdaysToLoad);
            bottomDate = endDate;

            var newdata = GenerateForwardMonth(startDate, endDate, false);

            topDate = addDays(topDate, newdaysToLoad);

            done(newdata);
        }

        const onUpdateDataPrevious = (done: (data: any) => void) => {
            startDate = addDays(topDate, -newdaysToLoad);
            endDate = topDate;

            var newdata = GenerateBackwardMonth(startDate, endDate, false);

            bottomDate = addDays(bottomDate, -newdaysToLoad);

            done(newdata);
        }

        const onDataUpdated = (data: any) => {
            if (data.length > 0) {
                for (var k = 0; k < data.length; k++) {
                    if (data[k].date) {
                        data[k].date = new Date(data[k].date);
                    }
                }

                scrollerdata.value.splice(0);
                scrollerdata.value = [...data];
            }
        }

        onMounted(() => {
            UpdateEvents();
            GenerateDays();
            UpdateCurrentMonth();
        });

        return {
            monthLabel,
            scrollerdata,
            newcellslength,
            scrollerref,
            OnScroll,
            onUpdateDataNext,
            onUpdateDataPrevious,
            onDataUpdated
        };
    }
});
</script>

<style lang="css" scoped>
@import "./calendar.css";
</style><style>
.scroller {
    background: #ffffff !important;
}
</style>
