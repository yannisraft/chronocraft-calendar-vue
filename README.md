# A Vue 3 Flexible and High Performance Infinite Scrolling Calendar

**Technology Used:**
[Vuejs 3.0](https://github.com/vuejs/vue-next)\
[Typescript](https://github.com/microsoft/TypeScript)\
[Rollup](https://github.com/rollup/rollup)

## Project setup
Please follow below mentioned step to run this project:

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


## Usage Of Components Built
**As Component**
```
  import { TestWorld } from 'chronocraft-calendar-vue/dist/esm/testworld';
  ...
  components:{
    TestWorld
  }
```

**As Plugin**
```
  import { TestWorld } from 'chronocraft-calendar-vue';
    ...
  app.use(TestWorld)
```
