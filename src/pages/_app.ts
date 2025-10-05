import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';
import type { App } from 'vue';

export default (app: App) => {
  app.use(FloatingVue);
};
