import { DefineComponent, Plugin } from "vue";

declare const ChronoCraftCalendar: Exclude<Plugin["install"], undefined>;

export default ChronoCraftCalendar;

export const Calendar: Exclude<Plugin["install"], undefined> | DefineComponent;
