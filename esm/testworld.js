import 'vue';
import { r as registerComponent } from './index-37e0eef4.js';
import { s as script } from './TestWorld-2ce79e86.js';
export { s as TestWorld } from './TestWorld-2ce79e86.js';

const Plugin = {
    install(vue) {
        registerComponent(vue, script);
    }
};

export default Plugin;
