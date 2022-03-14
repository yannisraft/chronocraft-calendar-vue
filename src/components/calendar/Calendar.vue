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
    <div class="container">
        <Scroller ref="scrollerref" :cellwidth="cellwidth" :cellheight="cellheight" :orientation="orientation" :numcols="7" :gap="gap" :numrows="3" :height="height" :contentpadding="contentpadding" :wheelscrollspeed="wheelscrollspeed" :newcellslength="newcellslength" :data="scrollerdata" :cellsquared="cellsquared" @on-scroll="OnScroll" @on-update-data-next="onUpdateDataNext" @on-update-data-previous="onUpdateDataPrevious" @on-data-updated="onDataUpdated">
            <template v-slot:cell="slotProps" :style="{ 'background-color': slotProps.data.bgcolor }">
                <div @click="CloseInfoPanel()" :class="[{ litoday: slotProps.data.today },{ weekendday: slotProps.data.weekend && weekendcolored },'daycell']" :style="{ 'background-color': slotProps.data.bgcolor }">
                    <div class="cell-label-container">
                        <span>{{ slotProps.data.num }}</span>
                    </div>
                    <div class="cell-events-container">
                        <!-- <div @click="OpenInfoPanel($event, slotProps.data)" v-for="(event, index) in EventsStartFrom(slotProps.data.events, slotProps.data.date, slotProps.data)" :key="event.id" class="event" :style="[{'background-color': event.color, 'margin': eventmargin+'px', 'top': String(event.index * (eventheight+eventmargin)) + 'px', 'width': CalculateEventWidth(slotProps.data.date, slotProps.data.id, event)+'px'}]"> -->
                        <div @click="OpenInfoPanel($event, slotProps.data, event)" v-for="(event, index) in eventsFilterVisible(slotProps.data)" :key="event.id" class="event" :style="[{'background-color': GetColor(event), 'margin': eventmargin+'px', 'top': String(event.index * (eventheight+eventmargin)) + 'px', 'width': CalculateEventWidth(slotProps.data.date, slotProps.data.id, event)+'px'}]">
                            <label :style="{'font-size': eventlabelfontsize+'px', 'padding-top': eventlabelvpadding + 'px','padding-bottom': eventlabelvpadding + 'px'}">{{ event.title }}</label>
                        </div>
                    </div>
                    <label v-if="eventsFilterNonVisible(slotProps.data).length > 0" class="cell-events-more" @mouseover="ShowMorePanel($event, slotProps.data.events, slotProps.data.date)" @mouseleave="HideMorePanel()">More...</label>
                    <div class="cell-dotevents-container">
                        <div v-for="(event, index) in eventsFilterNonVisible(slotProps.data)" :key="event.id" class="dotevent" :style="{'background-color': GetColor(event)}">

                        </div>
                    </div>
                    <!--<div v-if="!moretooltiphidden && activetooltipid === slotProps.data.id" class="tooltippanel" :id="slotProps.data.id" :style="GetToolTipStyle(slotProps.data.events, slotProps.data.date, $event)">
                    </div>-->
                </div>
            </template>
            <template v-slot:overlay>
                <div ref="infopanelref" :class="['infopanel', {infopanelhidden: infopanelhidden}]">
                    <h4>{{ infopanel_title }}</h4>                    
                    <div class="infodate">{{ infopanel_date }}</div> 
                    <div class="dotevent" style="background-color: #f7a47d;"><h6>Type: <span></span></h6></div>                   
                    <p>{{ infopanel_description }}</p>
                    <button class="deletebtn" @click="RemoveEventwithID(infopanel_eventid)"><span class="material-icons-outlined">delete</span></button>
                </div>
            </template>
        </Scroller>
        <div ref="tooltippanelref" :class="['tooltippanel', {tooltiphidden: moretooltiphidden}]" id="tooltippanel" :style="{'top': tooltip_top, 'left': tooltip_left, 'width': tooltip_w, 'height': tooltip_h}">
            <div v-for="(event, index) in tooltip_events" :key="event.id" class="event" :style="[{'position':'relative','background-color': GetColor(event), 'width':'calc(100% - 10px)', 'height': '20px'}]">
                <label :style="{'font-size': eventlabelfontsize+'px', 'padding-top': eventlabelvpadding + 'px','padding-bottom': eventlabelvpadding + 'px'}">{{ event.title }}</label>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    reactive,
    onMounted,
    onUpdated,
    watch,
    computed
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
    deepCopy,
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
                return [];
            }
        },
        eventtypes: {
            type: Array,
            default: () => {
                return [];
            }
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
        let actualcellwidth = ref(0);
        let actualcellheight: number = 0;
        let mineventwidth: string = 'calc(100% - ' + 2 * props.eventmargin + 'px)';
        let moretooltiphidden = ref(true);
        let activetooltipid = ref("");
        let tooltip_top = ref("0px");
        let tooltip_left = ref("0px");
        let tooltip_w = ref("0px");
        let tooltip_h = ref("0px");
        let tooltip_events: any = ref([]);
        const tooltippanelref: any = ref(null);
        let infopanelhidden = ref(true);
        let infopanel_title = ref("");
        let infopanel_type = ref("");
        let infopanel_description = ref("");
        let infopanel_date = ref("");
        let infopanel_eventid = ref("");

        // Computed
        /* const EventsStartFrom = computed((cellevents: Array < any > , date: Date) => {
            let final: Array < any > = [];

            console.log(cellevents);

            if (cellevents.length > 0) {
                for (var f = 0; f < cellevents.length; f++) {
                    if (cellevents[f].index !== null && typeof cellevents[f].index !== 'undefined') {
                        if (cellevents[f].index < fiteventsnumber.value) {
                            if (daysMatch(cellevents[f].startdate, date)) {
                                final.push(cellevents[f]);
                            } else {
                                if (date.getDay() === 0) {
                                    //console.log("day: ", date.getDay());
                                    //console.log(cellevents[f]);
                                    let days = getDiffInDays(cellevents[f].enddate, date);
                                    if (days > 0) {
                                        final.push(cellevents[f]);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return final;
        }); */

        // Method
        /* function EventsStartFrom(cellevents: Array < any > , date: Date, celldata: any) {
            let final: Array < any > = [];

            if (cellevents.length > 0) {
                for (var f = 0; f < cellevents.length; f++) {
                    if (cellevents[f].index !== null && typeof cellevents[f].index !== 'undefined') {
                        if (cellevents[f].index < fiteventsnumber.value) {
                            if (daysMatch(cellevents[f].startdate, date)) {
                                final.push(cellevents[f]);
                            } else {
                                if (date.getDay() === 0) {
                                    //console.log("day: ", date.getDay());
                                    //console.log(cellevents[f]);
                                    let days = getDiffInDays(cellevents[f].enddate, date);
                                    if (days > 0) {
                                        final.push(cellevents[f]);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            //celldata.visibleevents = final;

            return final;
        } */

        function DotEventsStartFrom(cellevents: Array < any > , date: Date) {
            let final: Array < any > = [];
            if (cellevents.length > fiteventsnumber.value) {
                if (cellevents.length > 0) {
                    if (cellevents.length > fiteventsnumber.value + 3) {
                        final = cellevents.slice(fiteventsnumber.value, fiteventsnumber.value + 3);
                    } else {
                        final = cellevents.slice(fiteventsnumber.value, cellevents.length);
                    }
                }
            } else {
                // if shorter but there is an index with higher value
                for (var f = 0; f < cellevents.length; f++) {
                    if (cellevents[f].index !== null && typeof cellevents[f].index !== 'undefined') {
                        if (cellevents[f].index >= fiteventsnumber.value) {
                            final.push(cellevents[f]);
                        }
                    }
                }
            }

            return final;
        }

        /* function absolutePosition(el: any) {

            let offsetBase: any = null;
            let found, left = 0,
                top = 0,
                width = 0,
                height = 0;
            offsetBase = absolutePosition.offsetBase;

            if (!offsetBase && document.body) {
                offsetBase = absolutePosition.offsetBase = document.createElement('div');
                offsetBase.style.cssText = 'position:absolute;left:0;top:0';
                document.body.appendChild(offsetBase);
            }

            if (el && el.ownerDocument === document && 'getBoundingClientRect' in el && offsetBase) {
                var boundingRect = el.getBoundingClientRect();
                var baseRect = offsetBase.getBoundingClientRect();
                found = true;
                left = boundingRect.left - baseRect.left;
                top = boundingRect.top - baseRect.top;
                width = boundingRect.right - boundingRect.left;
                height = boundingRect.bottom - boundingRect.top;
            }

            return {
                found: found,
                left: left,
                top: top,
                width: width,
                height: height,
                right: left + width,
                bottom: top + height,
                offsetBase: offsetBase
            };
        } */

        function ShowMorePanel(hoverevent: any, events: any, date: Date) {
            moretooltiphidden.value = false;
            let tooltippanel = tooltippanelref.value; //document.getElementById("tooltippanel");

            //let style = "";
            let height = 0;
            let _padding = 10;

            let eventsonmore = DotEventsStartFrom(events, date);
            let totaleventsonmore = eventsonmore.length;
            tooltip_events.value = [];
            tooltip_events.value = [...eventsonmore];

            if (tooltippanel !== null) {
                if (totaleventsonmore > 0) {

                    let daycell: any = document.querySelector(".daycell");
                    var _height = totaleventsonmore * (eventheight.value + props.eventmargin);
                    tooltip_w.value = daycell.offsetWidth + "px";
                    tooltip_h.value = _height + "px";

                    // Calculate Left
                    var celldocumentLeft = (hoverevent.target.parentElement).getBoundingClientRect().left;
                    var celldocumentTop = (hoverevent.target.parentElement).getBoundingClientRect().top;

                    tooltip_top.value = (celldocumentTop + daycell.offsetHeight + 5) + "px";
                    tooltip_left.value = celldocumentLeft + "px";
                } else {
                    //style = "display: none;"
                    //tooltippanel.style["display"] = "none;";
                }
            }
        }

        function HideMorePanel() {
            moretooltiphidden.value = true;
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
                actualcellwidth = daycell.offsetWidth;
                actualcellheight = daycell.offsetHeight;

                let count = Math.floor((celleventscontainer.offsetHeight - props.eventmargin) / (props.eventlabelfontsize + props.eventlabelvpadding + props.eventmargin));
                if (count > 0) fiteventsnumber.value = count;

                let cleanheight = celleventscontainer.offsetHeight - (count + 1) * props.eventmargin;
                eventheight.value = cleanheight / count;
            }
        }

        function CalculateEventWidth(date: Date, dateid: any, event: any) {
            let daycell: any = document.querySelector(".daycell");
            let dayIndex = date.getDay();
            var widthmultiplier = event.duration;

            if (widthmultiplier > (6 - (dayIndex) + 1)) widthmultiplier = (6 - (dayIndex) + 1);
            var marginmultiplier = widthmultiplier;
            if (marginmultiplier === 1) marginmultiplier = 0;

            let finalWidth = (daycell.offsetWidth * widthmultiplier) - 2 * props.eventmargin + marginmultiplier * props.eventmargin;
            if (date.getDay() === 0) {
                widthmultiplier = getDiffInDays(event.enddate, date);
                finalWidth = daycell.offsetWidth * widthmultiplier - 2 * props.eventmargin;
            }
            return finalWidth;
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
                        hasdiv: false,
                        //num: formatDate(date_a, 'dd EEE MM'),
                        num: formatDate(date_a, "dd"),
                        events: typeof eventscache[formatted_date] !== 'undefined' ? eventscache[formatted_date] : [], //GetSpecificDateEvents(formatted_date, date_a),
                        today: today,
                        weekend: checkIfWeekendDay(date_a),
                        bgcolor: GetMonthColor(date_a.getMonth()),
                        visibleevents: [],
                        dotevents: []
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
                        hasdiv: false,
                        //num: formatDate(date_b, 'dd EEE MM'),
                        num: formatDate(date_b, "dd"),
                        events: typeof eventscache[formatted_date] !== 'undefined' ? eventscache[formatted_date] : [], //GetSpecificDateEvents(formatted_date, date_b),
                        today: today,
                        weekend: checkIfWeekendDay(date_b),
                        bgcolor: GetMonthColor(date_b.getMonth()),
                        visibleevents: [],
                        dotevents: []
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
            eventscache = {};

            // 1. Sort Events by starting Date
            const sortedevents_bydate = props.events.slice().sort((a: any, b: any) => a.startdate - b.startdate);

            // Sort eventscache events for each date by duration
            //const sortedevents_bydate = props.events.slice().sort((a: any, b: any) => b.duration - a.duration);

            if (sortedevents_bydate.length > 0) {
                for (var t = 0; t < sortedevents_bydate.length; t++) {
                    let event: any = sortedevents_bydate[t];

                    // enumarate all dates from start to end
                    var fdates = enumerateDaysBetweenDates(event.startdate, event.enddate);
                    for (var md = 0; md < fdates.length; md++) {
                        var dateStr = formatDate(fdates[md], "dd-MMM-yyyy");
                        if (eventscache.hasOwnProperty(dateStr) && typeof eventscache[dateStr] !== 'undefined') {
                            if (event.index === null || typeof event.index === 'undefined') {
                                // Get First Available Index
                                var available_index = 0;
                                var foundindex = false;
                                while (!foundindex) {
                                    var exists = false;
                                    for (var k = 0; k < eventscache[dateStr].length; k++) {
                                        if (eventscache[dateStr][k].index === available_index) {
                                            exists = true;
                                        }
                                    }

                                    if (exists) {
                                        available_index++;
                                    } else {
                                        foundindex = true;
                                        break;
                                    }
                                }

                                event.index = available_index;
                                event.duration = getDiffInDays(event.enddate, event.startdate);
                                if (daysMatch(event.startdate, fdates[md])) {
                                    //event.hasdiv = true;      
                                } else {
                                    event.hasdiv = false;
                                }
                            }

                            eventscache[dateStr].push(event);
                        } else {
                            if (event.index === null || typeof event.index === 'undefined') {
                                event.duration = getDiffInDays(event.enddate, event.startdate);

                                if (daysMatch(event.startdate, fdates[md])) {
                                    event.hasdiv = true;
                                    event.index = 0;
                                }

                            }
                            eventscache[dateStr] = [event];
                        }
                    }
                }
            }
        }

        function GetSpecificDateEvents(formatted_date: string, date: Date) {
            let newdate_events: any = [];
            if (eventscache.hasOwnProperty(formatted_date) && typeof eventscache[formatted_date] !== 'undefined') {
                if (eventscache[formatted_date].length > 0) {
                    //newdate_events = [...eventscache[formatted_date]];
                    return eventscache[formatted_date];
                }
            }

            // ReOrder Events based on Chronological Order and Duration
            // ---
            // Priority is:
            // 1. Older than current day with longer duration
            // 2. Older with current day shorter duration
            // 3. Current or newer from current day with longer duration
            // 4. Current or newer from current day with shorter duration            

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
                    hasdiv: false,
                    events: typeof eventscache[formatted_date] !== 'undefined' ? eventscache[formatted_date] : [], //GetSpecificDateEvents(formatted_date, newdate),
                    num: formatDate(newdate, "dd"),
                    today: today,
                    weekend: checkIfWeekendDay(newdate),
                    bgcolor: GetMonthColor(newdate.getMonth()),
                    visibleevents: [],
                    dotevents: []
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
                    hasdiv: false,
                    events: typeof eventscache[formatted_date_f] !== 'undefined' ? eventscache[formatted_date_f] : [], //GetSpecificDateEvents(formatted_date_f, newdate_f),
                    num: formatDate(newdate_f, "dd"),
                    today: false,
                    weekend: checkIfWeekendDay(newdate_f),
                    bgcolor: GetMonthColor(newdate_f.getMonth()),
                    visibleevents: [],
                    dotevents: []
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

        function GetToolTipStyle(events: any, date: Date, event: any) {
            let style = "";
            let height = 0;
            let _padding = 10;

            let totaleventsonmore = DotEventsStartFrom(events, date).length;
            //let totaleventsonmore = eventsFilterNonVisible({events: events, date: date}).length;
            
            /* if (events.length > 0 && fiteventsnumber.value > 0) {
                for (var f = 0; f < events.length; f++) {
                    if (events[f].index !== null && typeof events[f].index !== 'undefined') {
                        if (events[f].index >= fiteventsnumber.value) {
                            totaleventsonmore++;
                        }
                    }
                }
            } */

            style += "padding: " + _padding + "px;"

            if (totaleventsonmore > 0) {
                console.log("event: ", event);
                let daycell: any = document.querySelector(".daycell");
                style += "width: " + daycell.offsetWidth + "px;";
                var _height = totaleventsonmore * eventheight.value;
                style += "height: " + _height + "px;bottom: -" + (_height + 2 * _padding + 5) + "px;"

                // Calculate Left
                var _left = 0;
                var viewportOffsetleft = daycell.getBoundingClientRect().left;
                console.log("viewportOffsetleft: " + viewportOffsetleft);

                let _scroller: any = document.querySelector(".scroller");
                console.log("_scroller W: " + _scroller.offsetWidth);
                style += "left: " + _left + "px;";
            } else {
                style = "display: none;"
            }

            return style;
        }

        function OpenInfoPanel(e: any, celldata: any, event: any) {
            //console.log(eventscache[formatDate(celldata.date, "dd-MMM-yyyy")]);
            infopanel_title.value = event.title;
            infopanel_description.value = event.description;
            infopanel_date.value = formatDate(celldata.date, "dd-MMM-yyyy");
            infopanel_eventid.value = event.id;
            /* console.log("celldata: ", celldata);
            console.log("event: ", event);
            console.log("e: ", e); */
            infopanelhidden.value = false;
            e.stopPropagation();
        }

        function CloseInfoPanel(cell: any) {
            infopanelhidden.value = true;
        }

        function RemoveEventwithID(eventid: string) {
            if(eventid)
            {
                context.emit("on-delete-event", eventid);
                infopanelhidden.value = true;
            }
        }


        const OnScroll = () => {
            infopanelhidden.value = true;
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

        const GetColor = (event: any) => {
            let color = "#fff";
            if(event)
            {
                if(event.type)
                {
                    if(props.eventtypes)
                    {
                        for(var f=0; f < props.eventtypes.length; f++)
                        {
                            let eventype:any = props.eventtypes[f];
                            if(eventype.type === event.type)
                            {
                                color = eventype.color;
                                break;
                            }
                        }
                    }
                }
            }

            return color;
        }

        const eventsFilterVisible = computed(() => {
            return (data: any) => {
                let final: Array < any > = [];
                let date = data.date;
                var formatted_date = formatDate(date, "dd-MMM-yyyy");
                let cellevents = eventscache[formatted_date];

                if (cellevents) {
                    if (cellevents.length > 0) {
                        for (var f = 0; f < cellevents.length; f++) {
                            if (cellevents[f] !== null && typeof cellevents[f] !== 'undefined') {
                                if (cellevents[f].index !== null && typeof cellevents[f].index !== 'undefined') {
                                    if (cellevents[f].index < fiteventsnumber.value) {
                                        if (daysMatch(cellevents[f].startdate, date)) {
                                            if (cellevents[f] !== null && typeof cellevents[f] !== 'undefined') {
                                                final.push(cellevents[f]);
                                            }
                                        } else {
                                            if (date.getDay() === 0) {
                                                let days = getDiffInDays(cellevents[f].enddate, date);
                                                if (days > 0) {
                                                    if (cellevents[f] !== null && typeof cellevents[f] !== 'undefined') {
                                                        final.push(cellevents[f]);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    //console.log("cellevents is null");
                }

                if (!Array.isArray(final)) {
                    final = [];
                }

                return final;
            };
        });

        const eventsFilterNonVisible = computed(() => {
            return (data: any) => {
                let final: Array < any > = [];
                let date = data.date;
                var formatted_date = formatDate(date, "dd-MMM-yyyy");
                let cellevents = eventscache[formatted_date];

                if (cellevents) {
                    if (cellevents.length > fiteventsnumber.value) {
                        if (cellevents.length > 0) {
                            if (cellevents.length > fiteventsnumber.value + 3) {
                                final = cellevents.slice(fiteventsnumber.value, fiteventsnumber.value + 3);
                            } else {
                                final = cellevents.slice(fiteventsnumber.value, cellevents.length);
                            }
                        }
                    } else {
                        // if shorter but there is an index with higher value
                        for (var f = 0; f < cellevents.length; f++) {
                            if (cellevents[f].index !== null && typeof cellevents[f].index !== 'undefined') {
                                if (cellevents[f].index >= fiteventsnumber.value) {
                                    final.push(cellevents[f]);
                                }
                            }
                        }
                    }
                }

                return final;
            };
            /*
            let final: Array < any > = [];
            if (cellevents.length > fiteventsnumber.value) {
                if (cellevents.length > 0) {
                    if (cellevents.length > fiteventsnumber.value + 3) {
                        final = cellevents.slice(fiteventsnumber.value, fiteventsnumber.value + 3);
                    } else {
                        final = cellevents.slice(fiteventsnumber.value, cellevents.length);
                    }
                }
            } else {
                // if shorter but there is an index with higher value
                for (var f = 0; f < cellevents.length; f++) {
                    if (cellevents[f].index !== null && typeof cellevents[f].index !== 'undefined') {
                        if (cellevents[f].index >= fiteventsnumber.value) {
                            final.push(cellevents[f]);
                        }
                    }
                }
            }
            */
        });

        onMounted(() => {
            UpdateEvents();
            GenerateDays();
            UpdateCurrentMonth();

        });

        onUpdated(() => {
            CalculateEventHeight();
        });

        // Watch prop value change and assign to value 'selected' Ref
        watch(() => props.events, (newevents: any, oldevents: any) => {
            //console.log("newevents: ",newevents);
            UpdateEvents();
        });

        return {
            monthLabel,
            scrollerdata,
            newcellslength,
            mineventwidth,
            scrollerref,
            tooltippanelref,
            eventheight,
            fiteventsnumber,
            moretooltiphidden,
            activetooltipid,
            tooltip_top,
            tooltip_left,
            tooltip_w,
            tooltip_h,
            tooltip_events,
            infopanelhidden,
            infopanel_title,
            infopanel_type,
            infopanel_description,
            infopanel_date,
            infopanel_eventid,
            eventsFilterVisible,
            eventsFilterNonVisible,
            OnScroll,
            onUpdateDataNext,
            onUpdateDataPrevious,
            onDataUpdated,
            CalculateEventHeight,
            //EventsStartFrom,
            RemoveEventwithID,
            DotEventsStartFrom,
            CalculateEventWidth,
            ShowMorePanel,
            HideMorePanel,
            GetToolTipStyle,
            OpenInfoPanel,
            CloseInfoPanel,
            GetColor
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
