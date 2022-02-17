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
        <Scroller :cellwidth="cellwidth" :cellheight="cellheight" :orientation="orientation" :numcols="7" :gap="gap" :numrows="7" :height="height" :contentpadding="contentpadding" :wheelscrollspeed="wheelscrollspeed" :newcellslength="newcellslength" :data="scrollerdata" :cellsquared="cellsquared" @on-scroll="OnScroll" @on-update-data-next="onUpdateDataNext" @on-update-data-previous="onUpdateDataPrevious">
            <template v-slot:cell="slotProps">
                <span>{{ slotProps.data.id }}</span>
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
        }
    },
    setup(props, context) {
        let monthLabel = ref("");
        /* let scrollerdata = ref <Array<{
            id: String,
            date: Date,
            events: Array < String > ,
            num: String,
            today: Boolean,
            weekend: Boolean,
            bgcolor: String,
        }>> (props.data); */
        let scrollerdata:any = ref(props.data);
        let newcellslength = 30;
        let bottomDate: any = null;
        let topDate: any = null;
        let startDate: any = null;
        let endDate: any = null;
        let daysToLoad = 120;

        function UpdateCurrentMonth() {
            let middledateIndex: number = (scrollerdata.value.length / 2) - 1;
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

                    daystoadd.push({
                        id: formatDate(date_a, "dd-MMM-yyyy"),
                        date: date_a,
                        //num: formatDate(date_a, 'dd EEE MM'),
                        num: formatDate(date_a, "dd"),
                        events: [],
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

                    daystoadd.push({
                        id: formatDate(date_b, "dd-MMM-yyyy"),
                        date: date_b,
                        //num: formatDate(date_b, 'dd EEE MM'),
                        num: formatDate(date_b, "dd"),
                        events: [],
                        today: today,
                        weekend: checkIfWeekendDay(date_b),
                        bgcolor: GetMonthColor(date_b.getMonth()),
                    });

                    // Set Top Newest Date
                    if (bd === 0) topDate = date_b;
                }
            }

            /* if (daystoadd.length > 0) {
                scrollerdata.value = [...daystoadd, ...scrollerdata.value];
            } */
            return daystoadd;
        }

        function GetMonthColor(monthnum: number) {
            let color: String = "#eaeaea";
            let colorIndex: number = 0;
            var max = props.monthcolorvariations.length;

            colorIndex = monthnum % max;

            color = (String)(props.monthcolorvariations[colorIndex]);

            return color;
        }

        function GenerateDays() {
            // Initialize with Today
            let d = new Date();
            let day = d.getDay();

            var initialDays = [];

            // 1. Add backward days
            for (var b = day; b >= 0; b--) {
                var newdate = new Date(d.getTime());
                newdate = addDays(newdate, -b);

                var today = false;
                if (ISToday(newdate)) {
                    today = true;
                }

                let _daytopush: any = {
                    id: formatDate(newdate, "dd-MMM-yyyy"),
                    date: newdate,
                    events: [],
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

                initialDays.push({
                    id: formatDate(newdate_f, "dd-MMM-yyyy"),
                    date: newdate_f,
                    events: [],
                    num: formatDate(newdate_f, "dd"),
                    today: false,
                    weekend: checkIfWeekendDay(newdate_f),
                    bgcolor: GetMonthColor(newdate_f.getMonth()),
                });
            }

            // 3. Now add forward 1 month
            var lastdate: any = initialDays[initialDays.length - 1].date;
            var lastmonthdate: any = addDays(lastdate, Math.round(daysToLoad/2));
            var daystoadd = GenerateForwardMonth(lastdate, lastmonthdate, true);            
            initialDays = [...initialDays, ...daystoadd];

            // 3. Now add backward 4 weeks
            let firstdate: any = initialDays[0].date;
            let firstdateofmonth: any = addDays(firstdate, Math.round(-daysToLoad/2));
            var daystoaddbackward = GenerateBackwardMonth(firstdateofmonth, firstdate, true);
            //scrollerdata.value = [...daystoaddbackward, ...scrollerdata.value];
            initialDays = [...daystoaddbackward, ...initialDays];

            // console.log(initialDays.length);

            scrollerdata.value.push(...initialDays);

            // 4. Scroll to match today
            setTimeout(() => {
                const cell = document.querySelector(".cell");
                if (cell) {
                    let cellheight = (cell as HTMLInputElement).offsetHeight + props.gap;
                    /* slider.scrollBy({
                        top: cellheight * (daysToLoad / 7),
                        left: 0,
                        behavior: "smooth",
                    }); */
                    // Scroller SCROLLBY
                }

            }, 1000);

            //UpdateCurrentMonth();
            //UpdateEvents();
        } // end f(): Generate Calendar Days

        const OnScroll = () => {
            //
        }

        const onUpdateDataNext = (done: (data: any) => void) => {
            startDate = bottomDate;
            endDate = addDays(bottomDate, daysToLoad);
            bottomDate = endDate;

            var newdata = GenerateForwardMonth(startDate, endDate, false);

            topDate = addDays(topDate, daysToLoad);

            done(newdata);
        }

        const onUpdateDataPrevious = (done: (data: any) => void) => {
            startDate = addDays(topDate, -daysToLoad);
            endDate = topDate;

            var newdata = GenerateBackwardMonth(startDate, endDate, false);

            bottomDate = addDays(bottomDate, -daysToLoad);

            done(newdata);
        }

        onMounted(() => {
            /* for (var f = 1; f < 200; f++) {
                scrollerdata.value.push({
                    id: f + 1
                });
            } */
            GenerateDays();
        });

        return {
            monthLabel,
            scrollerdata,
            newcellslength,
            OnScroll,
            onUpdateDataNext,
            onUpdateDataPrevious,
        };
    }
});
</script>

<style lang="css" scoped>
@import "./calendar.css";
</style>
