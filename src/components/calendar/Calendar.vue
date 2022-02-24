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
                    <div class="cell-label-container">
                        <span>{{ slotProps.data.num }}</span>
                    </div>
                    <div class="cell-events-container">
                        <div v-for="(event, index) in (slotProps.data.events.length <= fiteventsnumber ? slotProps.data.events : (slotProps.data.events).slice(0, fiteventsnumber))" :key="event.id" class="event" :style="{'background-color': event.color, 'min-width': mineventwidth, 'margin': eventmargin+'px', 'top': String(index * (eventheight+eventmargin)) + 'px'}">
                            <label :style="{'font-size': eventlabelfontsize+'px', 'padding-top': eventlabelvpadding + 'px','padding-bottom': eventlabelvpadding + 'px'}">{{ event.title }}</label>
                        </div>
                    </div>
                    <label v-if="slotProps.data.events.length > fiteventsnumber" class="cell-events-more">More...</label>
                    <div class="cell-dotevents-container">
                        <div v-for="(event, index) in DotEventsStartFrom(fiteventsnumber, slotProps.data.events)"  :key="event.id" class="dotevent" :style="{'background-color': event.color}">
                            
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
    onMounted,
    onUpdated
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
    getDiffInDays,
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
        eventmargin: {
            type: Number,
            default: 6
        },
        eventlabelfontsize: {
            type: Number,
            default: 12
        },
        eventlabelvpadding: {
            type: Number,
            default: 2
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
                        category: 'test',
                        description: "lalal and lololo koasda asd",
                        startdate: new Date('2022-02-21T10:20:30Z'),
                        enddate: new Date('2022-02-21T10:20:30Z'),
                    },
                    {
                        id: 2,
                        title: "Event #2",
                        color: "#a1e762",
                        category: 'test',
                        description: "lalal and lololo koasda asd",
                        startdate: new Date('2022-02-22T10:20:30Z'),
                        enddate: new Date('2022-02-23T10:20:30Z'),
                    },
                    {
                        id: 3,
                        title: "Event #3",
                        color: "#ffe087",
                        category: 'test',
                        description: "lalal and lololo koasda asd",
                        startdate: new Date('2022-02-25T10:20:30Z'),
                        enddate: new Date('2022-02-26T10:20:30Z'),
                    },
                    {
                        id: 4,
                        title: "Event #4",
                        color: "#ffe087",
                        category: 'test',
                        description: "lalal and lololo koasda asd",
                        startdate: new Date('2022-02-25T10:20:30Z'),
                        enddate: new Date('2022-02-26T10:20:30Z'),
                    },
                    {
                        id: 5,
                        title: "Event #5",
                        color: "#a1e762",
                        category: 'test',
                        description: "lalal and lololo koasda asd",
                        startdate: new Date('2022-02-25T10:20:30Z'),
                        enddate: new Date('2022-02-26T10:20:30Z'),
                    },
                    {
                        id: 6,
                        title: "Event #6",
                        color: "#f7a47d",
                        category: 'test',
                        description: "lalal and lololo koasda asd",
                        startdate: new Date('2022-02-25T10:20:30Z'),
                        enddate: new Date('2022-02-26T10:20:30Z'),
                    },
                    {
                        id: 7,
                        title: "Event #7",
                        color: "#f7a47d",
                        category: 'test',
                        description: "lalal and lololo koasda asd",
                        startdate: new Date('2022-02-25T10:20:30Z'),
                        enddate: new Date('2022-02-26T10:20:30Z'),
                    },
                    {
                        id: 8,
                        title: "Event #8",
                        color: "#ffe087",
                        category: 'test',
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
        let eventheight = ref(0);
        let fiteventsnumber = ref(0);
        let actualcellwidth: number = 0;
        let actualcellheight: number = 0;
        let mineventwidth: string = 'calc(100% - ' + 2 * props.eventmargin + 'px)';

        function DotEventsStartFrom(index:number, cellevents:Array<any>) {
            let final:Array<any> = [];
            if(cellevents.length > index)
            {
                if(cellevents.length > fiteventsnumber.value+3)
                {
                    final = cellevents.slice(index, fiteventsnumber.value+3);
                } else {
                    final = cellevents.slice(index, cellevents.length);
                }
            }   
            
            return final;
        }

        function UpdateCurrentMonth() {
            let middledateIndex: number = Math.round((scrollerdata.value.length / 2) - 1);
            if (scrollerdata.value[middledateIndex]) {
                var middledate: any = scrollerdata.value[middledateIndex].date;

                var monthnum = middledate.getMonth();
                var monthStr = formatDate(middledate, "MMMM yyyy");

                monthLabel.value = monthStr;
            }
        }

        // Calculates the maximum events that fit in the container
        // & the final height of the event
        function CalculateEventHeight() {
            let daycell: any = document.querySelector(".daycell");
            let celleventscontainer: any = document.querySelector(".cell-events-container");
            eventheight.value = 0;
            if (daycell) {
                if(props.cellsquared)
                {
                    actualcellwidth = daycell.offsetWidth;
                    actualcellheight = daycell.offsetHeight;

                    let eventscontainerheight = 0.44 * actualcellheight;
                    let cleanheight = eventscontainerheight - 3 * props.eventmargin;
                    eventheight.value = cleanheight / 2;
                } else {
                    actualcellwidth = daycell.offsetWidth;
                    actualcellheight = daycell.offsetHeight;

                    let count = Math.floor((celleventscontainer.offsetHeight - props.eventmargin) / (props.eventlabelfontsize + props.eventlabelvpadding + props.eventmargin));
                    fiteventsnumber.value = count;
                    
                    let cleanheight = celleventscontainer.offsetHeight - (count+1) * props.eventmargin;
                    eventheight.value = cleanheight / count;
                }               
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
                        events: GetSpecificDateEvents(formatted_date, date_a),
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
                        events: GetSpecificDateEvents(formatted_date, date_b),
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

            //TODO add intermediate days
            //TODO
            //TODO
            if (props.events.length > 0) {
                for (var t = 0; t < props.events.length; t++) {
                    let event: any = props.events[t];

                    // enumarate all dates from start to end
                    var fdates = enumerateDaysBetweenDates(start, end);
                    for (var md = 0; md < fdates.length; md++) {
                    }

                    var dateStr = formatDate(event.startdate, "dd-MMM-yyyy");
                    if (eventscache.hasOwnProperty(dateStr) && typeof eventscache[dateStr] !== 'undefined') {
                        eventscache[dateStr].push(event);
                        /* console.log("dateStr: ", dateStr);
                        console.log("exists: ", eventscache[dateStr]);
                        console.log("exists typeof: ", eventscache[dateStr]); */
                    } else {
                        eventscache[dateStr] = [event];
                    }
                }
            }
        }

        function GetSpecificDateEvents(formatted_date: string, date: Date) {
            let newdate_events: any = [];
            if (eventscache.hasOwnProperty(formatted_date) && typeof eventscache[formatted_date] !== 'undefined') {
                if (eventscache[formatted_date].length > 0) {
                    newdate_events = [...eventscache[formatted_date]];
                }
            }

            // ReOrder Events based on Chronological Order and Duration
            // ---
            let sortedEvents = [];
            for(var g=0; g < newdate_events.length; g++)
            {
                var event = newdate_events[g];
                var eventduration = getDiffInDays(event.enddate, event.startdate) + 1;
                var eventcurrentdiff = getDiffInDays(event.startdate, date);
                
                // Priority is:
                // 1. Older than current day with longer duration
                // 2. Older with current day shorter duration
                // 3. Current or newer from current day with longer duration
                // 4. Current or newer from current day with shorter duration

                console.log("A: ", date);
                console.log("event.startdate: ", event.startdate);
                console.log("Duration: ", eventduration);
                console.log("eventcurrentdiff: ", eventcurrentdiff);
                //console.log("A: ", getDiffInDays(event.startdate, new Date()));
                if(event.startdate < Date.now())
                {

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
                    events: GetSpecificDateEvents(formatted_date, newdate),
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
                    events: GetSpecificDateEvents(formatted_date_f, newdate_f),
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

        onUpdated(() => {
            CalculateEventHeight();
        });

        return {
            monthLabel,
            scrollerdata,
            newcellslength,
            mineventwidth,
            scrollerref,
            eventheight,
            fiteventsnumber,
            OnScroll,
            onUpdateDataNext,
            onUpdateDataPrevious,
            onDataUpdated,
            CalculateEventHeight,
            DotEventsStartFrom
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
