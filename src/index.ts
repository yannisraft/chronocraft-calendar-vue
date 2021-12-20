/* eslint-disable */

/* 

import { App as Application, Plugin } from "vue";
import * as components from "./components/index";
import { setVueInstance } from "./utils/config/index";

const install: Exclude<Plugin["install"], undefined> = (
  instance: Application
) => {
  setVueInstance(instance);
  for (const componentKey in components) {
    instance.use((components as any)[componentKey]);
  }
};

export default install;

export * from "./components";
export * from './utilities'; */

import TestWorld from './components/testworld/TestWorld.vue'

export interface ColoredTextOptions {
  color: string
}

import { App as Application, Plugin } from "vue";
import { setVueInstance } from "./utils/config/index";


import * as components from './components';
import * as utilities from './utilities';

/* const install: Exclude<Plugin["install"], undefined> = (
  instance: Application
) => {
  setVueInstance(instance);
  for (const componentKey in components) {
    instance.use((components as any)[componentKey]);
  }
}; */

// Declare install function executed by Vue.use()
/* function install(Vue, options) {
  // Don't install more than once
  if (install.installed) return;
  install.installed = true;
  // Manually setup calendar with options
  const defaults = utils.setupCalendar(opts);
  // Register components
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(`${defaults.componentPrefix}${componentName}`, component);
  });
} */

// Used to create a new ColoredText. "options" will be whatever you add later to "app.use(ColoredTextPlugin, options);"
/* const createColoredText = (options: ColoredTextOptions): ColoredText => {
  return {
      textColor: options.color,
  }
} */

const Plugin: Plugin = {
  install(app: Application, options: ColoredTextOptions) {
    // makes ColoredText available in your Vue.js app as either "$this.coloredText" (in your Source) or "{{ $coloredText }}" in your templates
    //app.config.globalProperties.$coloredText = createColoredText(options)
    // register Headline as a global component, so you can use it wherever you want in your app
    
    //app.component('TestWorld', TestWorld);

    Object.entries(components).forEach(([componentName, component]) => {
      app.component(componentName, component);
    });
  }
}

// Create module definition for Vue.use()
/* const plugin = {
  ChronoPlugin,
  ...components,
  ...utilities,
}; */

// Use automatically when global Vue instance detected
/* let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
} */

// Default export is library as a whole, registered via Vue.use()
export default Plugin;

// Allow component use individually
export * from './components';

// Allow util use individually
export * from './utilities';