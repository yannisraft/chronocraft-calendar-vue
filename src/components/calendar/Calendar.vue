<template>
<div class="calendar-container">
    <header>
        <slot :headerlabel="monthLabel" name="header">
            <h1 class="calendar-header">{{ monthLabel }}</h1>
            <DatePicker :rangepicker="false" :showselecteddate="true" class="calendar-datepicker" @on-date-selected="OnDateSelected">
                <template v-slot:inputfield="slotProps">
                    <span class="material-icons-outlined" style="cursor: pointer;">date_range</span>
                </template>
            </DatePicker>
        </slot>
    </header>
    <ul class="weekdays">
        <li v-for="daylabel in dayslocale" :key="daylabel.title">
            <slot :daylabel="daylabel" name="headercell">
                <abbr :title="daylabel.short">{{ daylabel.title }}</abbr>
            </slot>
        </li>
    </ul>
    <div class="container">
        <Scroller  v-model="scrollerdata" ref="scrollerref" :cellwidth="cellwidth" :cellheight="cellheight" :orientation="orientation" :numcols="7" :gap="gap" :numrows="3" :height="height" :contentpadding="contentpadding" :wheelscrollspeed="wheelscrollspeed" :newcellslength="newcellslength" :cellsquared="cellsquared" @on-scroll="OnScroll" @on-update-data-next="onUpdateDataNext" @on-update-data-previous="onUpdateDataPrevious">
            <template v-slot:cell="slotProps" :style="{ 'background-color': slotProps.data.bgcolor }">
                <div @click="CloseInfoPanel()" @mouseenter="AdjustMoreStatus(slotProps.data, 1)" @mouseleave="AdjustMoreStatus(slotProps.data, -1)" :class="[{ litoday: slotProps.data.today },{ weekendday: slotProps.data.weekend && weekendcolored },'daycell']" :style="{ 'background-color': slotProps.data.bgcolor }">
                    <div class="cell-label-container">
                        <span class="cell-label-num">{{ slotProps.data.num }} <span class="cell-label-month">{{ slotProps.data.month }}</span></span>
                    </div>
                    <div class="cell-events-container">
                        <!-- <div @click="OpenInfoPanel($event, slotProps.data)" v-for="(event, index) in EventsStartFrom(slotProps.data.events, slotProps.data.date, slotProps.data)" :key="event.id" class="event" :style="[{'background-color': event.color, 'margin': eventmargin+'px', 'top': String(event.index * (eventheight+eventmargin)) + 'px', 'width': CalculateEventWidth(slotProps.data.date, slotProps.data.id, event)+'px'}]"> -->
                        <div @click="OpenInfoPanel($event, slotProps.data, event)" v-for="(event, index) in eventsFilterVisible(slotProps.data)" :key="event.id" class="event" :style="[{'background-color': GetColor(event), 'margin': eventmargin+'px', 'top': String(event.index * (eventheight+eventmargin)) + 'px', 'width': CalculateEventWidth(slotProps.data.date, slotProps.data.id, event)+'px'}]">
                            <label :style="{'font-size': GetEventsFontsize()+'px', 'padding-top': eventlabelvpadding + 'px','padding-bottom': eventlabelvpadding + 'px'}">{{ event.title }}</label>
                        </div>
                    </div>
                    <label v-if="eventsFilterNonVisible(slotProps.data).length > 0" class="cell-events-more" @mouseover="ShowMorePanel($event, slotProps.data)">More...</label>
                    <div class="cell-dotevents-container">
                        <div v-for="(event, index) in eventsFilterNonVisible(slotProps.data)" :key="event.id" class="dotevent" :style="{'background-color': GetColor(event)}">
                        </div>
                    </div>
                    <div :class="['tooltippanel', {tooltiphidden: !slotProps.data.showtooltip}]" id="tooltippanel" @mouseenter="AdjustMoreStatus(slotProps.data, 1)" @mouseleave="AdjustMoreStatus(slotProps.data, -1)" :style="{'top': tooltip_top, 'left': tooltip_left, 'width': tooltip_w, 'height': tooltip_h}">
                        <div @click="OpenInfoPanel($event, slotProps.data, event)" v-for="(event, index) in tooltip_events" :key="event.id" class="event" :style="[{'position':'relative','background-color': GetColor(event), 'width':'calc(100% - 10px)', 'height': '20px'}]">
                            <label :style="{'font-size': GetEventsFontsize()+'px', 'padding-top': eventlabelvpadding + 'px','padding-bottom': eventlabelvpadding + 'px'}">{{ event.title }}</label>
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
                    <div class="dotevent" :style="{'background-color': infopanel_eventcolor}">
                        <h6>Type: <span></span></h6>
                    </div>
                    <p>{{ infopanel_description }}</p>
                    <button class="deletebtn" @click="RemoveEventwithID(infopanel_eventid)"><span class="material-icons-outlined">delete</span></button>
                    <button class="closebtn" @click="infopanelhidden = true;"><span class="material-icons-outlined">close</span></button>
                </div>
            </template>
        </Scroller>
        <!-- <div ref="tooltippanelref" :class="['tooltippanel', {tooltiphidden: moretooltiphidden}]" id="tooltippanel" :style="{'top': tooltip_top, 'left': tooltip_left, 'width': tooltip_w, 'height': tooltip_h}">
            <div v-for="(event, index) in tooltip_events" :key="event.id" class="event" :style="[{'position':'relative','background-color': GetColor(event), 'width':'calc(100% - 10px)', 'height': '20px'}]">
                <label :style="{'font-size': eventlabelfontsize+'px', 'padding-top': eventlabelvpadding + 'px','padding-bottom': eventlabelvpadding + 'px'}">{{ event.title }}</label>
            </div>
        </div> -->
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
    DatePicker
} from 'chronocraft-datepicker-vue';

import {
    enumerateDaysBetweenDates,
    enumerateDaysBetweenDatesLuxon,
    formatDate,
    addDays,
    checkIfWeekendDay,
    checkIfWeekendDayLuxon,
    getDiff,
    getDiffInDays,
    getDiffLuxon,
    getDiffInDaysLuxon,
    deepCopy,
    daysMatch,
    daysMatchLuxon
} from "./../../utilities/index";

const { DateTime, Info } = require("luxon");

export default defineComponent({
    name: 'App',
    components: {
        Scroller,
        DatePicker
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
        timezone: {
            type: String,
            default: "system" // UTC, system, "America/New York", fixed
        },
        locale: {
            type: String,
            default: "en-US"
        },
        monthcolorvariations: {
            type: Array,
            default: () => {
                return ["#f9f7f7", "#edebeb", "#f9f7f7", "#ffffff"]
            }
        },
        autodaylabels: {
            type: Boolean,
            default: true,
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
        let infopanel_eventcolor = ref("#444444");
        let scrollanimate = ref(0);
        var today_id = '';
        var morepanel_status = ref(0);
        var morepanel_cell_id = ref("");
        let dayslocale: any = ref([]);

        function DotEventsStartFrom(cellevents: Array < any > , date: any) {
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

        function ShowMorePanel(hoverevent: any, day: any) {
            let events = day.events;
            let date = day.date;
            moretooltiphidden.value = false;
            //let tooltippanel = tooltippanelref.value; //document.getElementById("tooltippanel");

            day.showtooltip = true;

            //let style = "";
            let height = 0;
            let _padding = 10;

            let eventsonmore = DotEventsStartFrom(events, date);
            let totaleventsonmore = eventsonmore.length;
            tooltip_events.value = [];
            tooltip_events.value = [...eventsonmore];

            if (totaleventsonmore > 0) {

                let daycell: any = document.querySelector(".daycell");
                var _height = totaleventsonmore * (eventheight.value + props.eventmargin);
                tooltip_w.value = daycell.offsetWidth + "px";
                tooltip_h.value = _height + "px";

                // Calculate Left
                console.log("daycell.offsetHeight: ", daycell.offsetHeight);
                /* var celldocumentLeft = (hoverevent.target.parentElement).getBoundingClientRect().left;
                var celldocumentTop = (hoverevent.target.parentElement).getBoundingClientRect().top;

                tooltip_top.value = (celldocumentTop + daycell.offsetHeight + 5) + "px";
                tooltip_left.value = celldocumentLeft + "px"; */

                tooltip_top.value = daycell.offsetHeight+"px";
                tooltip_left.value = "0px";
            } else {
                //style = "display: none;"
                //tooltippanel.style["display"] = "none;";
            }
        }

        function AdjustMoreStatus(celldata: any, sign: number) {
            if(morepanel_cell_id.value === "")
            {
                morepanel_cell_id.value = celldata.id;
            } else {
                if(sign === 1)
                    {
                        celldata._moresign++;
                    } else {
                        celldata._moresign--;
                    }

                if(celldata.moresign === 2)
                {
                    //console.log("Sign: ", celldata._moresign);
                }

                if(celldata._moresign <= 0)
                {
                    celldata._moresign = 0;
                    celldata.showtooltip = false;
                } else if(celldata._moresign > 2)
                {
                    celldata._moresign = 2;
                }
            }

            
        }

        function HideMorePanel() {
            console.log("morepanel_status: ", morepanel_status.value);
        }

        function UpdateCurrentMonth() {
            let middledateIndex: number = Math.round((scrollerdata.value.length / 2) - 1);
            if (scrollerdata.value[middledateIndex]) {
                var middledate: any = scrollerdata.value[middledateIndex].date;

                var monthnum = middledate.month;
                var monthStr = middledate.toFormat("MMMM yyyy");

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

        function CalculateEventWidth(date: any, dateid: any, event: any) {
            let daycell: any = document.querySelector(".daycell");
            let dayIndex = date.weekday;
            var widthmultiplier = event.duration;

            if (widthmultiplier > (6 - (dayIndex) + 1)) widthmultiplier = (6 - (dayIndex) + 1);
            var marginmultiplier = widthmultiplier;
            if (marginmultiplier === 1) marginmultiplier = 0;

            let finalWidth = (daycell.offsetWidth * widthmultiplier) - 2 * props.eventmargin + marginmultiplier * props.eventmargin;
            if (date.day === 0) {
                widthmultiplier = getDiffInDaysLuxon(event.enddate, date);
                finalWidth = daycell.offsetWidth * widthmultiplier - 2 * props.eventmargin;
            }
            return finalWidth;
        }

        function ISToday(_date: any) {
            let today = CreateDate();

            return (
                _date.day == today.day &&
                _date.month == today.month &&
                _date.year == today.year
            );
        }

        function GenerateForwardMonth(start: any, end: any, atInitialization: Boolean) {
            var fdates = enumerateDaysBetweenDatesLuxon(start, end);

            var daystoadd = [];
            for (var md = 0; md < fdates.length; md++) {
                if (md > 0) {
                    var date_a = fdates[md];

                    var today = false;
                    if (ISToday(date_a)) {
                        today = true;
                    }

                    var formatted_date = date_a.toFormat('dd-MM-yyyy');

                    daystoadd.push({
                        id: formatted_date,
                        date: date_a,
                        hasdiv: false,
                        num: date_a.toFormat('dd'), //formatDate(date_a, "dd"),
                        month: date_a.toFormat('MMM'),//formatDate(date_a, "MMM"),
                        events: typeof eventscache[formatted_date] !== 'undefined' ? eventscache[formatted_date] : [], //GetSpecificDateEvents(formatted_date, date_a),
                        today: today,
                        weekend: checkIfWeekendDayLuxon(date_a),
                        bgcolor: GetMonthColor(date_a.month),
                        visibleevents: [],
                        dotevents: [],
                        _moresign: 0,
                        showttooltip: false
                    });

                    // Set Bottom Newest Date
                    if (md === fdates.length - 1) bottomDate = date_a;
                }
            }

            return daystoadd;
        }

        function GenerateBackwardMonth(start: any, end: any, atInitialization: Boolean) {
            var bdates = enumerateDaysBetweenDatesLuxon(start, end);
            var daystoadd = [];
            for (var bd = 0; bd < bdates.length - 1; bd++) {
                if (bd < bdates.length - 1) {
                    var date_b = bdates[bd];

                    var today = false;
                    if (ISToday(date_b)) {
                        today = true;
                    }

                    var formatted_date = date_b.toFormat('dd-MM-yyyy');
                    daystoadd.push({
                        id: formatted_date,
                        date: date_b,
                        hasdiv: false,
                        //num: formatDate(date_b, 'dd EEE MM'),
                        num: date_b.toFormat('dd'),
                        month: date_b.toFormat('MMM'),
                        events: typeof eventscache[formatted_date] !== 'undefined' ? eventscache[formatted_date] : [], //GetSpecificDateEvents(formatted_date, date_b),
                        today: today,
                        weekend: checkIfWeekendDayLuxon(date_b),
                        bgcolor: GetMonthColor(date_b.month),
                        visibleevents: [],
                        dotevents: [],
                        _moresign: 0,
                        showttooltip: false
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

        function UpdateLocaleStrings() {
            if(props.autodaylabels)
            {
                let luxondays_long = Info.weekdays('long', {locale: props.locale});
                let luxondaysshort = Info.weekdays('short', {locale: props.locale});

                var final = [];
                for(var f=0;f< luxondays_long.length; f++)
                {
                    final.push({title: luxondays_long[f],short: luxondaysshort[f]});
                }
                dayslocale.value = final;
            } else {
                dayslocale.value = props.dayslabels;
            }
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
                    var fdates = enumerateDaysBetweenDatesLuxon(event.startdate, event.enddate);
                    for (var md = 0; md < fdates.length; md++) {
                        //var dateStr = formatDate(fdates[md], "dd-MMM-yyyy");
                        var dateStr = (fdates[md]).toFormat("dd-MM-yyyy");
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
                                event.duration = getDiffInDaysLuxon(event.enddate, event.startdate);
                                
                                if (daysMatchLuxon(event.startdate, fdates[md])) {
                                    //event.hasdiv = true;      
                                } else {
                                    event.hasdiv = false;
                                }
                            }

                            eventscache[dateStr].push(event);
                        } else {
                            if (event.index === null || typeof event.index === 'undefined') {
                                event.duration = getDiffInDaysLuxon(event.enddate, event.startdate);

                                if (daysMatchLuxon(event.startdate, fdates[md])) {
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

        function GetSpecificDateEvents(formatted_date: string, date: any) {
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

        function GetInitialDays(basedate: any) {
            var initialDays: any = [];
            let d = CreateDate();
            
            if (basedate) d = basedate;
            //let day = d.getDay();
            let day = d.day;

            // 1. Add backward days
            for (var b = day; b >= 0; b--) {
                //var newdate = new Date(d.getTime());
                var newdate = d;
                
                //newdate = addDays(newdate, -b);
                newdate = newdate.plus({ days: -b });

                var today = false;
                //var formatted_date = formatDate(newdate, "dd-MMM-yyyy");
                var formatted_date = newdate.toFormat('dd-MM-yyyy');
                if (ISToday(newdate)) {
                    today = true;
                    today_id = formatted_date;
                }

                let _daytopush: any = {
                    id: formatted_date,
                    date: newdate,
                    hasdiv: false,
                    events: typeof eventscache[formatted_date] !== 'undefined' ? eventscache[formatted_date] : [], //GetSpecificDateEvents(formatted_date, newdate),
                    num: newdate.toFormat('dd'), //formatDate(newdate, "dd"),
                    month: newdate.toFormat('MMM'), //formatDate(newdate, "MMM"),
                    today: today,
                    weekend: checkIfWeekendDayLuxon(newdate),
                    bgcolor: GetMonthColor(newdate.month), //GetMonthColor(newdate.getMonth()),
                    visibleevents: [],
                    dotevents: [],
                    _moresign: 0,
                    showttooltip: false
                };
                

                initialDays.push(_daytopush);
            }

            // 2. Add forward days
            var forwarddaystoload = 6 - day;
            for (var f = 1; f <= forwarddaystoload; f++) {
                //var newdate_f = new Date(d.getTime());
                var newdate_f = CreateDate();

                //newdate_f = addDays(newdate_f, f);
                newdate_f = newdate_f.plus({ days: f });

                var formatted_date_f = newdate_f.toFormat('dd-MM-yyyy');

                initialDays.push({
                    id: formatted_date_f,
                    date: newdate_f,
                    hasdiv: false,
                    events: typeof eventscache[formatted_date_f] !== 'undefined' ? eventscache[formatted_date_f] : [], //GetSpecificDateEvents(formatted_date_f, newdate_f),
                    num: newdate_f.toFormat('dd'), //formatDate(newdate_f, "dd"),
                    month: newdate_f.toFormat('MMM'), //formatDate(newdate_f, "MMM"),
                    today: false,
                    weekend: checkIfWeekendDayLuxon(newdate_f),
                    bgcolor: GetMonthColor(newdate_f.month),
                    visibleevents: [],
                    dotevents: [],
                    _moresign: 0,
                    showttooltip: false
                });
            }

            // 3. Now add forward 1 month
            var lastdate: any = initialDays[initialDays.length - 1].date;            
            var lastmonthdate = lastdate;
            lastmonthdate = lastmonthdate.plus({ days: Math.round(initialdaysToLoad) });

            var daystoadd = GenerateForwardMonth(lastdate, lastmonthdate, true);
            initialDays = [...initialDays, ...daystoadd];

            // 3. Now add backward 1 month
            let firstdate: any = initialDays[0].date;
            let firstdateofmonth = firstdate;
            firstdateofmonth = firstdateofmonth.plus({ days: Math.round(-initialdaysToLoad) });
            var daystoaddbackward = GenerateBackwardMonth(firstdateofmonth, firstdate, true);
            initialDays = [...daystoaddbackward, ...initialDays];

            // console.log(initialDays.length);

            return initialDays;
        }

        function GenerateDays() {
            // Initialize with Today
            let d = CreateDate();

            var initialDays = GetInitialDays(d);

            scrollerdata.value.push(...initialDays);

            // 4. Scroll today date
            setTimeout(() => {
                if (today_id !== '') {
                    var cellPosition = scrollerref.value.GetCellsPosition(today_id);
                    scrollerref.value.ScrollTo(cellPosition);
                }
            }, 1000);
        } // end f(): Generate Calendar Days

        function CreateDate(existingDate?: Date) {

            let dt = null;
            if(existingDate) {
                dt = DateTime.fromObject({day: existingDate.getDate(), month: existingDate.getMonth(), year: existingDate.getFullYear() });
            } else {
                if(props.timezone === 'UTC') {
                    dt = DateTime.utc();
                } else {
                    dt = DateTime.now();
                }
            }

            // timezone varialbe can be: UTC, system, "America/New York", fixed            
            if(props.timezone === 'UTC') {
                return dt.setLocale(props.locale);
            } else if(props.timezone === 'system') {
                return dt.setLocale(props.locale);
            } else if(props.timezone === 'fixed') {
                return dt.setLocale(props.locale);
            } else {
                let returned_dt = dt.setLocale(props.locale).setZone(props.timezone);
                if(returned_dt.invalid) throw "Error in Luxon: "+returned_dt.invalid.reason;
                return returned_dt;
            }
        }

        function GetToolTipStyle(events: any, date: any, event: any) {
            let style = "";
            let height = 0;
            let _padding = 10;

            let totaleventsonmore = DotEventsStartFrom(events, date).length;
            //let totaleventsonmore = eventsFilterNonVisible({events: events, date: date}).length;

            // OLD
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
            infopanel_eventcolor.value = GetColor(event);
            infopanel_date.value = (celldata.date).toFormat("dd-MM-yyyy");
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
            if (eventid) {
                context.emit("on-delete-event", eventid);
                infopanelhidden.value = true;
            }
        }

        function GetEventsFontsize() {
            let newsize = props.eventlabelfontsize;
            const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

            if(vw < 700)
            {
                newsize = 0.8 * props.eventlabelfontsize;
            } else if(vw < 550)
            {
                newsize = 0.6 * props.eventlabelfontsize;
            }
            return newsize;
        }

        const OnScroll = () => {
            infopanelhidden.value = true;
            UpdateCurrentMonth();
        }

        const onUpdateDataNext = (done: (data: any) => void) => {
            startDate = bottomDate;
            //endDate = addDays(bottomDate, newdaysToLoad);
            endDate = bottomDate.plus({days: newdaysToLoad});
            bottomDate = endDate;

            var newdata = GenerateForwardMonth(startDate, endDate, false);

            //topDate = addDays(topDate, newdaysToLoad);
            topDate = topDate.plus({days: newdaysToLoad});

            done(newdata);
        }

        const onUpdateDataPrevious = (done: (data: any) => void) => {
            //startDate = addDays(topDate, -newdaysToLoad);
            startDate = topDate.plus({days: -newdaysToLoad});
            endDate = topDate;

            var newdata = GenerateBackwardMonth(startDate, endDate, false);

            bottomDate = bottomDate.plus({days: -newdaysToLoad}); //addDays(bottomDate, -newdaysToLoad);

            done(newdata);
        }

        /* const onDataUpdated = (data: any) => {
            console.log("onDataUpdated");
            console.log("data: ", data);
            if (data.length > 0) {
                for (var k = 0; k < data.length; k++) {
                    if (data[k].date) {
                        //data[k].date = new Date(data[k].date);
                    }
                }

                scrollerdata.value.splice(0);
                scrollerdata.value = [...data];
            }

            console.log("scrollerdata.value: ", scrollerdata.value);
        } */

        const OnDateSelected = (selected: any) => {
            ScrollToDate(CreateDate(selected.date));
        }

        const ScrollToDate = (date: any) => {
            // If date is loaded inside current calendar dates
            
            var formatted_date = date.toFormat("dd-MMM-yyyy");
            var cellPosition = scrollerref.value.GetCellsPosition(formatted_date);

            if (cellPosition >= 0) {
                scrollerref.value.ScrollTo(cellPosition);
            } else {
                console.log("Date Outside Loaded Dates");
                
                var targetdate_id = formatted_date;
                console.log("targetdate_id: ", targetdate_id);

                var initialDays = GetInitialDays(date);
                //scrollerdata.value = [];
                //scrollerdata.value.push(...initialDays);
                scrollerref.value.SetAnimateNext(initialDays, () => {
                    console.log("UpdateCurrentMonth");
                    UpdateCurrentMonth();
                });

                // 4. Scroll selected date
                setTimeout(() => {
                    if (targetdate_id !== '') {
                        var cellPosition = scrollerref.value.GetCellsPosition(targetdate_id);
                        scrollerref.value.ScrollTo(cellPosition);
                    }
                }, 2100);
            }
        }

        const GetColor = (event: any) => {
            let color = "#fff";
            if (event) {
                if (event.type) {
                    if (props.eventtypes) {
                        for (var f = 0; f < props.eventtypes.length; f++) {
                            let eventype: any = props.eventtypes[f];
                            if (eventype.type === event.type) {
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
                var formatted_date = date.toFormat("dd-MM-yyyy");
                let cellevents = eventscache[formatted_date];

                if (cellevents) {
                    if (cellevents.length > 0) {
                        for (var f = 0; f < cellevents.length; f++) {
                            if (cellevents[f] !== null && typeof cellevents[f] !== 'undefined') {
                                if (cellevents[f].index !== null && typeof cellevents[f].index !== 'undefined') {
                                    if (cellevents[f].index < fiteventsnumber.value) {
                                        if (daysMatchLuxon(cellevents[f].startdate, date)) {
                                            if (cellevents[f] !== null && typeof cellevents[f] !== 'undefined') {
                                                final.push(cellevents[f]);
                                            }
                                        } else {
                                            if (date.day === 0) {
                                                let days = getDiffInDaysLuxon(cellevents[f].enddate, date);
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
                var formatted_date = date.toFormat("dd-MM-yyyy");
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
        });

        onMounted(() => {
            UpdateLocaleStrings();
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
            infopanel_eventcolor,
            eventsFilterVisible,
            eventsFilterNonVisible,
            morepanel_status,
            morepanel_cell_id,
            scrollanimate,
            dayslocale,
            OnScroll,
            onUpdateDataNext,
            onUpdateDataPrevious,
            CalculateEventHeight,
            //EventsStartFrom,
            GetEventsFontsize,
            AdjustMoreStatus,
            RemoveEventwithID,
            DotEventsStartFrom,
            CalculateEventWidth,
            OnDateSelected,
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
