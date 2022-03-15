# Chronocraft Calendar for VueJS 3.0 Component
The Chronocraft Calendar is a Vue 3 flexible infinite scrolling calendar component created for Vue3.
It includes an events functionality and a smooth infinite scrolling feel with drag and mouse wheel navigation

### Features
- Infinite Calendar
- Events Functionality
- Different type of events
- Add or Remove events
- Typescript support
- Smooth scrolling

## Usage of Calendar

Using the Library as a Plugin

```javascript
import { ChronoCraftCalendar } from 'chronocraft-calendar-vue';
    ...
app.use(ChronoCraftCalendar)
```

#### Using seperate components of the library inside you project

When you want to import a specific component from the library into a dedicated place inside your code

```javascript
import { Calendar } from 'chronocraft-calendar-vue';
...
components:{
Calendar
}
```


#### Example of Component
```html
<Calendar @on-scroll="OnScroll" @on-delete-event="RemoveEvent" :events="events" :eventtypes="eventtypes" :weekendcolored="true" class="calendar" :cellheight="180" :cellsquared="false" :height="400"></Calendar>
```

#### Example using Slots
```html
<Calendar @on-scroll="OnScroll" @on-delete-event="RemoveEvent" :events="events" :eventtypes="eventtypes" :weekendcolored="true" class="calendar" :cellheight="180" :cellsquared="false" :height="400">
    <template v-slot:header="slotProps">
        <span>{{ slotProps.headerlabel }}</span>
    </template>
    <template v-slot:headercell="slotProps">
        <span>{{ slotProps.daylabel }}</span>
    </template>
</Calendar>
```

### Component properties

|  Name  | Type  | Description  |
|---|---|---|
|  data  |  Array  |  The actual data passed into the scroller. These data are reactive by using ref() |
|  height    |  Number  |  Defines the height of the calendar |
|  gap    |  Number  |  Defines the gap between the calendar cells / days  |
|  wheelscrollspeed  |  Number  |  Defines the mouse wheel scroll speed  |
|  cellheight    |  Number  |  Defines the base of the cellheight on the horizontal scroller  |
|  hasscrollbar  |  Boolean  |  Defines if the scroller should have a scroll bar  |
|  @on-scroll  |  Event Function   | Event fired when the user has scrolled    |
|  @on-delete-event  |  Event Function  |  Event fired when the user has reached at the end of the scroller and new data might be required to load  |

### Component slots

|  Name  | hasprops  | Description  |
|---|---|---|
|  header  | yes  | Overrides the calendar's header
|  headercell  | yes  | Overrides the calendar's header cells which now show the day names