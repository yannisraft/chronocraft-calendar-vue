# A Vue 3 Flexible and High Performance Infinite Scrolling Calendar

The Chronocraft Calendar is a vue3 javascript flexible calendar library with vertical infinite scroling created for Vue3.
It provides smooth infinite scrolling with drag and mouse wheel navigation

**Technology Used:**

[Vuejs 3.0](https://github.com/vuejs/vue-next)\
[Typescript](https://github.com/microsoft/TypeScript)\
[Rollup](https://github.com/rollup/rollup)

## Usage 
**As Component**
```
  import { Calendar } from 'chronocraft-calendar-vue';
  ...
  components:{
    Calendar
  }
```

**As Plugin**
```
  import ChronoCraftCalendar from 'chronocraft-calendar-vue';
    ...
  app.use(ChronoCraftCalendar)
```


## For building and Testing the Library

Please follow the folling steps accordingly:

### Installing the Project
```
yarn install
```

### Running for Development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Building the Library
```
yarn build:js
```

### Building the Library With Separate Css file
```
yarn build:js_css
```

### Lints and fixes files
```
yarn lint
```

