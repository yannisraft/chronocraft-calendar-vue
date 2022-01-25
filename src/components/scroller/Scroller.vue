<template>
<div :class="['scroller', orientation === 'vertical' ? 'vertical-scroller' : 'horizontal-scroller' ]">
    <div :class="['scroller-container', orientation === 'vertical' ? 'vertical-container' : 'horizontal-container' ]" :style="[{ 'gap': gap + 'px'} ]">
        <slot name="content">

            <div v-for="celldata in data" ref="cellRef" :key="celldata.id" :class="['scroller-cell', orientation === 'vertical' ? 'vertical-cell' : 'horizontal-cell']" :style="{ 'flex-basis': cellFlexBasis, 'height': cellH, 'width': cellW}">
                <slot name="cell">
                    {{ celldata.id }}
                </slot>
            </div>

        </slot>
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

export default defineComponent({
    name: "Calendar",
    components: {},
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
        numcols: {
            type: Number,
            default: 4
        },
        numrows: {
            type: Number,
            default: 4
        },
        gap: {
            type: Number,
            default: 10
        },
        cellheight: {
            type: Number,
            default: 100
        },
        cellsquared: {
            type: Boolean,
            default: true,
        }
    },
    setup(props, context) {
        let cellW = ref("100%");
        let cellH = ref(props.cellheight + "px");
        let cellFlexBasis = ref("100%");
        let scroller = null;
        const cellRef = ref(null);
        const slider = ref(null);

        let velY = 0;
        let momentumID = 0;
        let velocity = 0.96;
        let isDown = false;
        let startY;
        let startscrollY;
        let movescrollTop;
        let scrollerMoving = false;
        let previousY = 0;
        let scrollbarWidth = 0;

        function momentumLoop() {
            scroller.scrollTop += velY;
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

        function getScrollbarWidth() {
            var div, width = getScrollbarWidth.width;
            if (width === undefined) {
                div = document.createElement('div');
                div.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';
                div = div.firstChild;
                document.body.appendChild(div);
                width = getScrollbarWidth.width = div.offsetWidth - div.clientWidth;
                document.body.removeChild(div);
            }
            return width;
        }

        function Initialize() {
            console.log('Initialize');
            scroller = document.querySelector(".scroller");
            scrollbarWidth = getScrollbarWidth();

            var totalgap = 0;
            var totalgappercent = 0;

            var newCellW = 0;
            var newCellH = 0;
            if(props.orientation === 'vertical')
            {
                totalgap = (props.numcols - 1) * props.gap + scrollbarWidth / 2;
                totalgappercent = totalgap / scroller.offsetWidth * 100;

                newCellW = ((100 - totalgappercent) / props.numcols);
                cellW.value = String(newCellW + '%');
                cellFlexBasis.value = String(newCellW + '%');

                if (props.cellsquared) {
                    newCellH = (scroller.offsetWidth - totalgap) / props.numcols;
                    cellH.value = newCellH + "px";
                }
            } else {                
                totalgap = (props.numrows - 1) * props.gap + scrollbarWidth;
                totalgappercent = totalgap / scroller.offsetHeight * 100;
                console.log("totalgappercent: ", totalgappercent);

                newCellH = (scroller.offsetHeight - totalgap) / props.numrows;

                var newCellFlexBasis = ((100 - totalgappercent) / props.numrows);
                
                cellH.value = String(newCellH + 'px');
                cellFlexBasis.value = String(newCellFlexBasis + '%');

                if (props.cellsquared) {
                    newCellW = newCellH;
                    cellW.value = newCellW + "px";
                }
            }            

            // ---- Add Scroller Events ----
            scroller.addEventListener("mousedown", (e) => {
                isDown = true;
                scroller.classList.add("active");
                startY = e.pageY - scroller.offsetTop;
                startscrollY = e.pageY;
                movescrollTop = scroller.scrollTop;
                previousY = e.clientY;

                cancelMomentumTracking();
            });

            scroller.addEventListener("mouseleave", () => {
                isDown = false;
                scroller.classList.remove("active");
            });

            var _context = context;
            scroller.addEventListener("mouseup", (e) => {
                isDown = false;
                scrollerMoving = false;
                scroller.classList.remove("active");
                beginMomentumTracking();

                var scrolldiff = startscrollY - e.pageY;
                if (Math.abs(scrolldiff) > 10) {
                    context.emit("on-scroll");
                }
            });

            scroller.addEventListener("mousemove", (e) => {
                if (!isDown) return;

                e.preventDefault();
                scrollerMoving = true;

                const y = e.pageY - scroller.offsetTop;
                const walk = (y - startY) * 2; //scroll-fast
                const prevscrollTop = scroller.scrollTop;
                scroller.scrollTop = movescrollTop - walk;
                velY = scroller.scrollTop - prevscrollTop;

                scroller.scrollTop = movescrollTop - walk;

                //UpdateCurrentMonth();
            });

            /* scroller.addEventListener("wheel", (e) => {
                cancelMomentumTracking();

                const deltaY = Math.sign(e.deltaY);
                const walk = deltaY * current_wheelscrollspeed;

                const prevscrollTop = slider.scrollTop;
                slider.scrollTop += walk;
                velY = slider.scrollTop - prevscrollTop;

                beginMomentumTracking();

                UpdateCurrentMonth();
            });

            scroller.addEventListener("scroll", (e) => {
                let scroll = slider.scrollTop;

                //console.log(scroll);
                var delta = scroll - previousScrollY;
                var dirsign = parseInt(delta / Math.abs(delta));
                detectScrollEdges(dirsign, false, e);
                previousScrollY = scroll;
            }); */
        }

        function WindowResized(e) {
            Initialize();
        }

        onMounted(() => {
            window.addEventListener("resize", WindowResized);
            Initialize();
        });

        return {
            cellW,
            cellH,
            cellFlexBasis,
            scroller,
            cellRef,
            isDown,
            startY,
            startscrollY,
            movescrollTop,
            scrollerMoving,
            previousY,
            scrollbarWidth
        };
    }
});
</script>

<style lang="css" scoped>
.scroller {
    height: 500px;    
}

.vertical-scroller {
    overflow-y: auto;
    overflow-x: hidden;
}

.horizontal-scroller {
    overflow-y: hidden;
    overflow-x: auto;
}

.scroller-container {    
    align-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    
}

.vertical-container
{
    display: flex;
}

.horizontal-container
{
    display: inline-flex;
    flex-flow: column wrap !important;
    height: inherit !important;
    align-content: flex-start;
    width: 100%;
}

.scroller-cell {
    
    background: #b6b6b6;
    
    flex: inherit;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 25%;    
}

.vertical-cell
{
    display: inline-block;
    height: 50px;
}

.horizontal-cell
{
    display: inline-flex;
    height: unset !important;
    width: 90px;
}

.dummycell {
    height: 20px;
}
</style>
