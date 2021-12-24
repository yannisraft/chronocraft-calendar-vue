<template>
<div class="calendar-container">
    <div class="calendar">
        <header>
            <h1>{{ monthLabel }}</h1>
        </header>

        <ul class="weekdays">
            <li>
                <abbr title="S">Sunday</abbr>
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
            </li>
        </ul>
        <div class="scroller-container debugscrolling">
            <ol class="day-grid" :style="{ 'grid-gap': gridgap + 'px' }">
                <li v-for="(day) in days" :key="day.id" :class="[{'litoday': day.today}, 'cell']" :style="{'background-color': day.bgcolor}">{{ day.num }}</li>
                <!-- <li class="month=prev">29</li>
          <li class="month=prev">30</li>
          <li class="month=prev">31</li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
          <li>11</li>
          <li>12</li>
          <li>13</li>
          <li>14</li>
          <li>15</li>
          <li>16</li>
          <li>17</li>
          <li>18</li>
          <li>19</li>
          <li>20</li>
          <li>21</li>
          <li>22</li>
          <li>23</li>
          <li>24</li>
          <li>25</li>
          <li>26</li>
          <li>27</li>
          <li>28</li>
          <li>29</li>
          <li>30</li>
          <li class="month-next">1</li>
          <li class="month-next">2</li> -->
            </ol>
        </div>
    </div>
</div>
</template>

<script>
import {
    defineComponent,
    ref,
    onMounted
} from "vue";
import {
    enumerateDaysBetweenDates,
    formatDate,
    addDays
} from "./../../utilities/dates-utilities";

export default defineComponent({
    name: "Calendar",
    components: {},
    props: {
        msg: String
    },
    setup() {
        const textmsg = "I am Test World Component";
        const selected = ref(new Date());
        let velY = 0;
        let momentumID = 0;
        let slider = null;
        let isDown = false;
        let startY;
        let scrollTop;
        let velocity = 0.96;
        let days = ref([]);
        let scrollerMoving = false;
        let loadingDays = false;
        let justLoaded = false;
        let scrollLoadingOffset = 300;
        let previousY = 0;
        let startDate = null;
        let endDate = null;
        let bottomDate = null;
        let topDate = null;
        let daysToLoad = 28;
        let previousScrollY = 0;
        let gridgap = 4;
        let colorMonthVariations = [
            '#eaeaea',
            '#dddada',
            '#eaeaea',
            '#ffffff'
        ];
        let colorMonthVariationIndex = 0;
        let monthLabel = ref('');

        function GetMonthColor(monthnum) {
            var color = '#eaeaea';
            var colorIndex = 0;
            var max = colorMonthVariations.length;

            colorIndex = monthnum % max;
            console.log('colorIndex: ', colorIndex);

            color = colorMonthVariations[colorIndex];

            return color;
        }

        function UpdateCurrentMonth() {
            var middledateIndex = parseInt(days.value.length / 2) - 1;
            var middledate = days.value[middledateIndex].date;
            var monthnum = middledate.getMonth();
            var monthStr = formatDate(middledate, 'MMMM yyyy');

            //console.log("monthnum: ",monthnum);
            //console.log("monthStr: ",monthStr);

            monthLabel.value = monthStr;
        }

        function ISToday(_date) {
            const today = new Date()
            return _date.getDate() == today.getDate() &&
                _date.getMonth() == today.getMonth() &&
                _date.getFullYear() == today.getFullYear()
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
                        id: formatDate(date_a, 'dd-MMM-yyyy'),
                        date: date_a,
                        num: formatDate(date_a, 'dd EEE MM'),
                        today: today,
                        bgcolor: GetMonthColor(date_a.getMonth())
                    });

                    // Set Bottom Newest Date
                    if (md === fdates.length - 1) bottomDate = date_a;
                }
            }
        }

        function GenerateBackwardMonth(start, end, atInitialization) {
            /* console.log("start: ", start);
            console.log("end: ", end); */
            var bdates = enumerateDaysBetweenDates(start, end);
            for (var bd = bdates.length - 1; bd >= 0; bd--) {
                if (bd < bdates.length - 1) {
                    var date_b = bdates[bd];

                    var today = false;
                    if (ISToday(date_b)) {
                        today = true;
                    }

                    days.value.unshift({
                        id: formatDate(date_b, 'dd-MMM-yyyy'),
                        date: date_b,
                        num: formatDate(date_b, 'dd EEE MM'),
                        today: today,
                        bgcolor: GetMonthColor(date_b.getMonth())
                    });

                    // Set Top Newest Date
                    if (bd === 0) topDate = date_b;
                }
            }
            /* var fdates = enumerateDaysBetweenDates(start, end);
            for (var md = 0; md < fdates.length; md++) {
                if (md > 0) {
                    var date_a = fdates[md];

                    days.value.push({
                        id: formatDate(date_a, 'dd-MMM-yyyy'),
                        date: date_a,
                        num: formatDate(date_a, 'dd EEE MM'),
                        today: false
                    });

                    // Set Bottom Newest Date
                    if (md === fdates.length - 1) bottomDate = date_a;
                }
            } */
        }

        function getNextdays(dragging, e) {
            previousScrollY = slider.scrollTop;

            startDate = bottomDate;
            endDate = addDays(bottomDate, daysToLoad);

            bottomDate = endDate;

            GenerateForwardMonth(startDate, endDate, false);

            setTimeout(() => {
                loadingDays = false;
            }, 400);

            topDate = addDays(topDate, daysToLoad);

            // Remove Top Previous Dates
            days.value.splice(0, daysToLoad);

            let cell = document.querySelector('.cell');
            let cellheight = cell.offsetHeight + gridgap;
            if (!dragging) {
                slider.scrollTop = previousScrollY - (cellheight * (daysToLoad));
            } else {
                slider.scrollTop = previousScrollY - (cellheight * (daysToLoad));

                // Update Scroller
                scrollTop = slider.scrollTop;
                startY = e.pageY - slider.offsetTop;
            }

            //this.UpdateSchedules();
        }

        function getPreviousdays(dragging, e) {
            previousScrollY = slider.scrollTop;

            startDate = addDays(topDate, -28);
            endDate = topDate;

            //topDate = endDate;

            GenerateBackwardMonth(startDate, endDate, false);

            setTimeout(() => {
                loadingDays = false;
            }, 400);

            bottomDate = addDays(bottomDate, -daysToLoad);

            // Remove Top Previous Dates
            days.value.splice(days.value.length - daysToLoad, days.value.length - 1);

            let cell = document.querySelector('.cell');
            let cellheight = cell.offsetHeight + gridgap;
            if (!dragging) {
                slider.scrollTop = previousScrollY + (cellheight * (daysToLoad));
            } else {
                slider.scrollTop = previousScrollY + (cellheight * (daysToLoad));

                // Update Scroller
                scrollTop = slider.scrollTop;
                startY = e.pageY - slider.offsetTop;
            }

            //this.UpdateSchedules();
        }

        // f(): Create Scroller
        //
        function SetupScroller() {
            slider = document.querySelector(".scroller-container");

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
                    if (slider.scrollTop + slider.offsetHeight > slider.scrollHeight - scrollLoadingOffset) {
                        if (!loadingDays && !justLoaded) {
                            console.log('scroll ended Bottom');
                            loadingDays = true;
                            getNextdays(dragging, e);
                        }
                    }
                }

                if (sign === -1) {
                    if (slider.scrollTop < scrollLoadingOffset) {
                        if (!loadingDays && !justLoaded) {
                            console.log('scroll ended Top');
                            loadingDays = true;
                            getPreviousdays(dragging, e);
                        }

                    }
                }
            }

            slider.addEventListener("mousedown", e => {
                isDown = true;
                slider.classList.add("active");
                startY = e.pageY - slider.offsetTop;
                scrollTop = slider.scrollTop;
                previousY = e.clientY;

                cancelMomentumTracking();
            });

            slider.addEventListener("mouseleave", () => {
                isDown = false;
                slider.classList.remove("active");
            });

            slider.addEventListener("mouseup", () => {
                isDown = false;
                slider.classList.remove("active");
                beginMomentumTracking();
            });

            slider.addEventListener("mousemove", e => {
                if (!isDown) return;
                e.preventDefault();
                const y = e.pageY - slider.offsetTop;
                const walk = (y - startY) * 3; //scroll-fast
                const prevscrollTop = slider.scrollTop;
                slider.scrollTop = scrollTop - walk;
                velY = slider.scrollTop - prevscrollTop;

                var _y = e.clientY;
                var dirsign = 1;
                if ((_y - previousY) < 0) {
                    dirsign = 1;
                } else {
                    dirsign = -1;
                }
                detectScrollEdges(dirsign, true, e);

                UpdateCurrentMonth();
            });

            slider.addEventListener("wheel", e => {
                cancelMomentumTracking();

                const deltaY = Math.sign(e.deltaY);
                const walk = deltaY * 12;

                const prevscrollTop = slider.scrollTop;
                slider.scrollTop += walk;
                velY = slider.scrollTop - prevscrollTop;

                beginMomentumTracking();
            });
        } // end f(): Create Scroller

        // f(): Generate Calendar Days
        //
        function GenerateDays() {

            // Initialize with Today
            const d = new Date();
            let day = d.getDay();

            // 1. Add backward days
            for (var b = day; b >= 0; b--) {
                var newdate = new Date(d.getTime());
                newdate = addDays(newdate, -b);

                var today = false;
                if (ISToday(newdate)) {
                    today = true;
                }

                days.value.push({
                    id: formatDate(newdate, 'dd-MMM-yyyy'),
                    date: newdate,
                    num: formatDate(newdate, 'dd EEE MM'),
                    today: today,
                    bgcolor: GetMonthColor(newdate.getMonth())
                });
            }

            // 2. Add forward days
            for (var f = day + 1; f < 7; f++) {
                var newdate_f = new Date(d.getTime());
                newdate_f = addDays(newdate_f, 7 - f);

                days.value.push({
                    id: formatDate(newdate_f, 'dd-MMM-yyyy'),
                    date: newdate_f,
                    num: formatDate(newdate_f, 'dd EEE MM'),
                    today: false,
                    bgcolor: GetMonthColor(newdate_f.getMonth())
                });
            }

            // 3. Now add forward 1 month
            var lastdate = (days.value[days.value.length - 1]).date;
            var lastmonthdate = addDays(lastdate, 28);
            GenerateForwardMonth(lastdate, lastmonthdate, true);

            // 3. Now add backward 4 weeks
            var firstdate = (days.value[0]).date;
            var firstdateofmonth = addDays(firstdate, -28);
            GenerateBackwardMonth(firstdateofmonth, firstdate, true);

            // 4. Scroll to match today
            setTimeout(() => {
                let cell = document.querySelector('.cell');
                let cellheight = cell.offsetHeight + gridgap;
                slider.scrollBy({
                    top: cellheight * (daysToLoad / 7),
                    left: 0,
                    behavior: 'smooth'
                });
            }, 100);

            UpdateCurrentMonth();

        } // end f(): Generate Calendar Days

        onMounted(() => {
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
            gridgap,
            colorMonthVariations,
            colorMonthVariationIndex,
            monthLabel
        };
    }
});
</script>

<style lang="css" scoped>
@import "./calendar.css";

.debugscrolling {
    height: 400px;
    overflow-y: hidden;
}
</style>
