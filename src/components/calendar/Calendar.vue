<template>
  <div class="calendar-container">
    <div class="calendar">
      <header>
        <h1>November 2017</h1>
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
        <ol class="day-grid">
          <li class="month=prev">29</li>
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
          <li class="month-next">2</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "Calendar",
  components: {},
  props: {
    msg: String
  },
  data() {
    return {};
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

    function SetupScroller() {
      slider = document.querySelector(".scroller-container");

      // Momentum
      function momentumLoop() {
        slider.scrollTop += velY;
        velY *= 0.95;
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

      slider.addEventListener("mousedown", e => {
        isDown = true;
        slider.classList.add("active");
        startY = e.pageY - slider.offsetTop;
        scrollTop = slider.scrollTop;
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
        const x = e.pageY - slider.offsetTop;
        const walk = (x - startY) * 3; //scroll-fast
        const prevscrollTop = slider.scrollTop;
        slider.scrollTop = scrollTop - walk;
        velY = slider.scrollTop - prevscrollTop;
      });

      slider.addEventListener("wheel", e => {
        cancelMomentumTracking();
      });
    }

    onMounted(() => {
      SetupScroller();
    });

    return {
      textmsg,
      selected,
      velY,
      momentumID,
      slider
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
