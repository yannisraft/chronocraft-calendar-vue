<template>
<div class="calendar-container">
    <div class="calendar">
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
            <!-- <li>
                <slot :day="day" name="headercell">
                    <abbr title="S">Sunday</abbr>
                </slot>
            </li>
            <li>
                <abbr title="M">Monday</abbr>
            </li>
            <li>
                <abbr title="T">Tuesday</abbr>
            </li>
            <li>
                <abbr title="W">Wednesday</abbr>
            </li>
            <li>
                <abbr title="T">Thursday</abbr>
            </li>
            <li>
                <abbr title="F">Friday</abbr>
            </li>
            <li>
                <abbr title="S">Saturday</abbr>
            </li> -->
        </ul>
        <div class="scroller-container debugscrolling">
            <ol class="scrollercontent" :style="{ 'grid-gap': daysgap + 'px' }">
                <li v-for="day in days" :key="day.id" :class="[
              { litoday: day.today },
              { weekendday: day.weekend && weekendcolored },
              'cell',
            ]" :style="{ 'background-color': day.bgcolor }">
                    <slot :day="day" name="daycell"><span>{{ day.num }}</span></slot>
                    <div class="cell-events-container">
                        <div v-for="event in (day.events).slice(0, visibleevents)" :key="event.id" class="event" :style="{'background-color': event.color}">
                            <label>{{ event.title }}</label>
                        </div>
                    </div>
                </li>
            </ol>
        </div>
    </div>
</div>
</template>

<script>
import {
    defineComponent,
    ref,
    reactive,
    onMounted
} from "vue";
import {
    enumerateDaysBetweenDates,
    formatDate,
    addDays,
    checkIfWeekendDay,
    getDiff,
    daysMatch,
} from "./../../utilities/index";

export default defineComponent({
    name: "Calendar",
    components: {},
    props: {
        msg: String,
        daysgap: {
            type: Number,
            default: 4,
        },
        visibleevents: {
            type: Number,
            default: 3,
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
                        title: "Create Calendar",
                        color: "#f7a47d",
                        description: "lalal and lololo koasda asd",
                        date: new Date(),
                    },
                    {
                        id: 2,
                        title: "Edit Calendar",
                        color: "#a1e762",
                        description: "lalal and lololo koasda asd",
                        date: new Date(),
                    },
                    {
                        id: 3,
                        title: "Hello Calendar",
                        color: "#ffe087",
                        description: "lalal and lololo koasda asd",
                        date: new Date(),
                    },
                    {
                        id: 4,
                        title: "Hello Calendar",
                        color: "#a1e762",
                        description: "lalal and lololo koasda asd",
                        date: new Date(),
                    }
                ];
            },
        },
    },
    setup(props, context) {
        const textmsg = "I am Test World Component";
        const selected = ref(new Date());
        let velY = 0;
        let momentumID = 0;
        let slider = null;
        let slidercontent = null;
        let isDown = false;
        let startY;
        let startscrollY;
        let movescrollTop;
        let velocity = 0.96;
        let days = ref([]);
        let scrollerMoving = false;
        let loadingDays = false;
        let justLoaded = false;
        let scrollLoadingOffset = 200;
        let current_scrollLoadingOffset = scrollLoadingOffset;
        let wheelscrollspeed = 12;
        let current_wheelscrollspeed = wheelscrollspeed;
        let previousY = 0;
        let startDate = null;
        let endDate = null;
        let bottomDate = null;
        let topDate = null;
        let daysToLoad = 56;
        let previousScrollY = 0;
        //let gridgap = 4;
        //let colorMonthVariations = ["#eaeaea", "#dddada", "#eaeaea", "#ffffff"];monthcolorvariations

        let colorMonthVariationIndex = 0;
        let monthLabel = ref("");

        function GetMonthColor(monthnum) {
            var color = "#eaeaea";
            var colorIndex = 0;
            var max = props.monthcolorvariations.length;

            colorIndex = monthnum % max;

            color = props.monthcolorvariations[colorIndex];

            return color;
        }

        function UpdateCurrentMonth() {
            var middledateIndex = parseInt(days.value.length / 2) - 1;
            var middledate = days.value[middledateIndex].date;
            var monthnum = middledate.getMonth();
            var monthStr = formatDate(middledate, "MMMM yyyy");

            //console.log("monthnum: ",monthnum);
            //console.log("monthStr: ",monthStr);

            monthLabel.value = monthStr;
        }

        function UpdateEvents() {
            // Check for events Events
            /* if(props.events.length > 0)
                  {
                      for(var t=0; t < props.events.length; t++)
                      {
                          var event = props.events[t];
                          var domatch = daysMatch(newdate, event.date);
                      }
                  } */
            if (props.events.length > 0) {
                for (var t = 0; t < props.events.length; t++) {
                    var event = props.events[t];
                    for (var f = 0; f < days.value.length; f++) {
                        var domatch = daysMatch(days.value[f].date, event.date);
                        if (domatch) {
                            var exists = false;
                            if (days.value[f].events.length > 0) {
                                for (var d = 0; d < days.value[f].events.length; d++) {
                                    if (days.value[f].events[d].id === event.id) {
                                        exists = true;
                                        break;
                                    }
                                }
                            }

                            if (!exists) {
                                days.value[f].events.push(event);
                            }

                            break;
                        }
                    }
                }
            }

            console.log("UpdateEvents");
        }

        function ISToday(_date) {
            let today = new Date();
            //today = addDays(today, 1);
            return (
                _date.getDate() == today.getDate() &&
                _date.getMonth() == today.getMonth() &&
                _date.getFullYear() == today.getFullYear()
            );
        }

        function GenerateForwardMonth(start, end, atInitialization) {
            var fdates = enumerateDaysBetweenDates(start, end);
            for (var md = 0; md < fdates.length; md++) {
                if (md > 0) {
                    var date_a = fdates[md];

                    var today = false;
                    if (ISToday(date_a)) {
                        today = true;
                    }

                    days.value.push({
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
        }

        function GenerateBackwardMonth(start, end, atInitialization) {
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

            if (daystoadd.length > 0) {
                days.value = daystoadd.concat(days.value);
            }
        }

        function getNextdays(dragging, e) {
            startDate = bottomDate;
            endDate = addDays(bottomDate, daysToLoad);
            bottomDate = endDate;

            setTimeout(() => {
                GenerateForwardMonth(startDate, endDate, false);
            }, 0);

            topDate = addDays(topDate, daysToLoad);

            // Remove Top Previous Dates
            days.value.splice(0, daysToLoad);

            setTimeout(() => {
                loadingDays = false;
            }, 100);

            let cell = document.querySelector(".cell");
            let cellheight = cell.offsetHeight + props.daysgap;

            if (scrollerMoving) {
                var targetPositionY = previousScrollY - (cellheight * daysToLoad) / 7;
                var diff = previousScrollY - movescrollTop;

                movescrollTop = targetPositionY - diff;
                slider.scrollTop = targetPositionY;
            }

            UpdateEvents();
        }

        function getPreviousdays(dragging, e) {
            startDate = addDays(topDate, -daysToLoad);
            endDate = topDate;

            setTimeout(() => {
                GenerateBackwardMonth(startDate, endDate, false);
            }, 0);

            setTimeout(() => {
                loadingDays = false;
            }, 100);

            bottomDate = addDays(bottomDate, -daysToLoad);

            // Remove Top Previous Dates
            days.value.splice(days.value.length - daysToLoad, days.value.length - 1);

            let cell = document.querySelector(".cell");
            let cellheight = cell.getBoundingClientRect().height + props.daysgap;

            var targetPositionY = previousScrollY + (cellheight * daysToLoad) / 7;
            if (scrollerMoving) {
                var diff = previousScrollY - movescrollTop;

                movescrollTop = targetPositionY - diff;
                setTimeout(() => {
                    slider.scrollTop = targetPositionY;
                }, 0);
                //
            } else {
                setTimeout(() => {
                    slider.scrollTop = targetPositionY;
                }, 0);
            }

            UpdateEvents();
        }

        // f(): Create Scroller
        //
        function SetupScroller() {
            slider = document.querySelector(".scroller-container");
            slidercontent = document.querySelector(".scrollercontent");

            function momentumLoop() {
                slider.scrollTop += velY;
                velY *= velocity;
                if (Math.abs(velY) > 0.5) {
                    momentumID = requestAnimationFrame(momentumLoop);
                }
            }

            function cancelMomentumTracking() {
                cancelAnimationFrame(momentumID);
            }

            function beginMomentumTracking() {
                cancelMomentumTracking();
                momentumID = requestAnimationFrame(momentumLoop);
            }

            function detectScrollEdges(sign, dragging, e) {
                /* console.log('this.leftDate: ', moment(this.leftDate).format('DD/MM/YYYY'));
                        console.log('this.bottomDate: ', moment(this.bottomDate).format('DD/MM/YYYY')); */

                // Detect Scroll on Edges
                // ----------------------
                if (sign === 1) {
                    if (
                        slider.scrollTop + slider.offsetHeight >
                        slider.scrollHeight - current_scrollLoadingOffset
                    ) {
                        if (!loadingDays && !justLoaded) {
                            loadingDays = true;
                            getNextdays(dragging, e);
                        }
                    }
                }

                if (sign === -1) {
                    if (slider.scrollTop < current_scrollLoadingOffset) {
                        if (!loadingDays && !justLoaded) {
                            loadingDays = true;
                            getPreviousdays(dragging, e);
                        }
                    }
                }
            }

            slider.addEventListener("mousedown", (e) => {
                isDown = true;
                slider.classList.add("active");
                startY = e.pageY - slider.offsetTop;
                startscrollY = e.pageY;
                movescrollTop = slider.scrollTop;
                previousY = e.clientY;

                cancelMomentumTracking();
            });

            slider.addEventListener("mouseleave", () => {
                isDown = false;
                slider.classList.remove("active");
            });

            var _context = context;
            slider.addEventListener("mouseup", (e) => {
                isDown = false;
                scrollerMoving = false;
                slider.classList.remove("active");
                beginMomentumTracking();

                var scrolldiff = startscrollY - e.pageY;
                if (Math.abs(scrolldiff) > 10) {
                    context.emit("on-scroll");
                }
            });

            slider.addEventListener("mousemove", (e) => {
                if (!isDown) return;
                e.preventDefault();
                scrollerMoving = true;

                const y = e.pageY - slider.offsetTop;
                const walk = (y - startY) * 2; //scroll-fast
                const prevscrollTop = slider.scrollTop;
                slider.scrollTop = movescrollTop - walk;
                velY = slider.scrollTop - prevscrollTop;

                slider.scrollTop = movescrollTop - walk;

                UpdateCurrentMonth();
            });

            slider.addEventListener("wheel", (e) => {
                cancelMomentumTracking();

                const deltaY = Math.sign(e.deltaY);
                const walk = deltaY * current_wheelscrollspeed;

                const prevscrollTop = slider.scrollTop;
                slider.scrollTop += walk;
                velY = slider.scrollTop - prevscrollTop;

                beginMomentumTracking();

                UpdateCurrentMonth();
            });

            slider.addEventListener("scroll", (e) => {
                let scroll = slider.scrollTop;

                //console.log(scroll);
                var delta = scroll - previousScrollY;
                var dirsign = parseInt(delta / Math.abs(delta));
                detectScrollEdges(dirsign, false, e);
                previousScrollY = scroll;
            });
        } // end f(): Create Scroller

        // f(): Generate Calendar Days
        //
        function GenerateDays() {
            // Initialize with Today
            let d = new Date();
            //d = addDays(d, 2);
            let day = d.getDay();

            // 1. Add backward days
            for (var b = day; b >= 0; b--) {
                var newdate = new Date(d.getTime());
                newdate = addDays(newdate, -b);

                var today = false;
                if (ISToday(newdate)) {
                    today = true;
                }

                var _daytopush = {
                    id: formatDate(newdate, "dd-MMM-yyyy"),
                    date: newdate,
                    //num: formatDate(newdate, 'dd EEE MM'),
                    events: [],
                    num: formatDate(newdate, "dd"),
                    today: today,
                    weekend: checkIfWeekendDay(newdate),
                    bgcolor: GetMonthColor(newdate.getMonth()),
                };

                days.value.push(_daytopush);
            }

            // 2. Add forward days
            var forwarddaystoload = 6 - day;
            for (var f = 1; f <= forwarddaystoload; f++) {
                var newdate_f = new Date(d.getTime());
                newdate_f = addDays(newdate_f, f);

                days.value.push({
                    id: formatDate(newdate_f, "dd-MMM-yyyy"),
                    date: newdate_f,
                    //num: formatDate(newdate_f, 'dd EEE MM'),
                    events: [],
                    num: formatDate(newdate_f, "dd"),
                    today: false,
                    weekend: checkIfWeekendDay(newdate_f),
                    bgcolor: GetMonthColor(newdate_f.getMonth()),
                });
            }

            // 3. Now add forward 1 month
            var lastdate = days.value[days.value.length - 1].date;
            var lastmonthdate = addDays(lastdate, daysToLoad);
            GenerateForwardMonth(lastdate, lastmonthdate, true);

            // 3. Now add backward 4 weeks
            var firstdate = days.value[0].date;
            var firstdateofmonth = addDays(firstdate, -daysToLoad);
            GenerateBackwardMonth(firstdateofmonth, firstdate, true);

            // 4. Scroll to match today
            setTimeout(() => {
                let cell = document.querySelector(".cell");
                let cellheight = cell.offsetHeight + props.daysgap;
                slider.scrollBy({
                    top: cellheight * (daysToLoad / 7),
                    left: 0,
                    behavior: "smooth",
                });
            }, 1000);

            UpdateCurrentMonth();
            UpdateEvents();
        } // end f(): Generate Calendar Days

        function WindowResized(e) {
            var win_width = e.target.innerWidth;
            current_wheelscrollspeed = (win_width * wheelscrollspeed) / 1024;
            //current_scrollLoadingOffset = (win_width*400)/1024;
        }

        onMounted(() => {
            window.addEventListener("resize", WindowResized);
            SetupScroller();
            GenerateDays();
        });

        return {
            textmsg,
            selected,
            velY,
            momentumID,
            slider,
            days,
            colorMonthVariationIndex,
            monthLabel,
        };
    },
});
</script>

<style lang="css" scoped>
@import "./calendar.css";

.debugscrolling {
    height: 400px;
    overflow-y: hidden;
}

.weekendday {
    filter: brightness(90%);
}

.scrollercontent .cell {
    position: relative;
}



.cell-events-container {
    flex: 1;
    height: 58%;
    align-self: flex-end;
    align-items: center;
    display: flex;
    flex-direction: column;
}

.event {
    align-self: stretch;
    flex: 1 1 auto;
    padding: 2px;
    font-size: 9pt;
    background: #95e5b8;
    display: flex;
    align-items: center;
    border-radius: 6px;
    margin: 0px 5px 5px 5px;
}

.event label {
    font-family: 'Quicksand', sans-serif;
}
</style>
