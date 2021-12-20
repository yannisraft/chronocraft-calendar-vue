<template>
<div class="calednar-container">
    <main id="calendar">
        <section class="th">
            <span>Sunday</span>
            <span>Monday</span>
            <span>Tuesday</span>
            <span>Wednesday</span>
            <span>Thursday</span>
            <span>Friday</span>
            <span>Saturday</span>
        </section>
        <div class="week">
            <div></div>
            <div></div>
            <div></div>
            <div data-date="1"></div>
            <div data-date="2"></div>
            <div data-date="3"></div>
            <div data-date="4"></div>
        </div>
        <div class="week">
            <div data-date="5"></div>
            <div data-date="6"></div>
            <div data-date="7"></div>
            <div data-date="8"></div>
            <div data-date="9"></div>
            <div data-date="10"></div>
            <div data-date="11"></div>
        </div>
        <div class="week">
            <div data-date="12"></div>
            <div data-date="13"></div>
            <div data-date="14"></div>
            <div data-date="15"></div>
            <div data-date="16"></div>
            <div data-date="17"></div>
            <div data-date="18"></div>
        </div>
        <div class="week">
            <div data-date="19"></div>
            <div data-date="20"></div>
            <div data-date="21"></div>
            <div data-date="22"></div>
            <div data-date="23"></div>
            <div data-date="24"></div>
            <div data-date="25"></div>
        </div>
        <div class="week">
            <div data-date="26"></div>
            <div data-date="27"></div>
            <div data-date="28"></div>
            <div data-date="29"></div>
            <div data-date="30"></div>
            <div data-date="31"></div>
            <div></div>
        </div>
    </main>
</div>
</template>

<script>
import {
    defineComponent,
    ref
} from "vue";

export default defineComponent({
    name: "Calendar",
    components: {},
    props: {
        msg: String
    },
    setup() {
        const textmsg = "I am Test World Component";
        const selected = ref(new Date());
        return {
            textmsg,
            selected
        };
    }
});
</script>

<style lang="css" scoped>
@import "./calendar.css";
</style>
