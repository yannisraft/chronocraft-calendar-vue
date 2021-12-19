import 'vue';
import { s as script } from './HelloWorld-9ea2c703.js';
export { s as HelloWorld } from './HelloWorld-9ea2c703.js';
import { r as registerComponent } from './index-37e0eef4.js';

const Plugin = {
    install(vue) {
        registerComponent(vue, script);
    }
};

export default Plugin;
