(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Helloworld = {}, global.Vue));
}(this, (function (exports, vue) { 'use strict';

  var script = vue.defineComponent({
    name: "HelloWorld",
    props: {
      msg: String
    },
    setup: function setup() {
      var textmsg = "I am Hello World Component";
      return {
        textmsg: textmsg
      };
    }
  });

  const _withId = /*#__PURE__*/vue.withScopeId("data-v-106112bb");

  vue.pushScopeId("data-v-106112bb");
  const _hoisted_1 = { class: "hello" };
  const _hoisted_2 = { class: "highlight1" };
  const _hoisted_3 = /*#__PURE__*/vue.createVNode("div", { class: "imgtest" }, null, -1);
  vue.popScopeId();

  const render = /*#__PURE__*/_withId(function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock("div", _hoisted_1, [
      vue.createVNode("h1", _hoisted_2, vue.toDisplayString(_ctx.textmsg), 1),
      _hoisted_3
    ]))
  });

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "h3 {\r\n    margin: 40px 0 0;\r\n}\r\nul {\r\n    list-style-type: none;\r\n    padding: 0;\r\n}\r\nli {\r\n    display: inline-block;\r\n    margin: 0 10px;\r\n}\r\n.highlight1 {\r\n    color: red;\r\n}\r\n.imgtest {\r\n  background-image: url(\"data:image/svg+xml,%3C%3Fxml version%3D%221.0%22 encoding%3D%22UTF-8%22 standalone%3D%22no%22%3F%3E%3C!-- Generator%3A Gravit.io --%3E%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22 style%3D%22isolation%3Aisolate%22 viewBox%3D%220 0 30 30%22 width%3D%2230pt%22 height%3D%2230pt%22%3E%3Cdefs%3E%3CclipPath id%3D%22_clipPath_w4QUNWLcM2TMTjClygIyXQwVwCx9WW4g%22%3E%3Crect width%3D%2230%22 height%3D%2230%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path%3D%22url(%23_clipPath_w4QUNWLcM2TMTjClygIyXQwVwCx9WW4g)%22%3E%3Cpath d%3D%22 M 28.464 10.049 L 20.271 8.801 L 16.61 1.044 C 16.281 0.35 15.639 0 14.997 0 C 14.359 0 13.722 0.346 13.392 1.044 L 9.729 8.8 L 1.537 10.048 C 0.067 10.27 -0.521 12.162 0.544 13.246 L 6.47 19.281 L 5.068 27.806 C 4.868 29.023 5.797 30 6.837 30 C 7.113 30 7.397 29.931 7.669 29.78 L 14.998 25.756 L 22.327 29.781 C 22.599 29.931 22.882 29.999 23.157 29.999 C 24.198 29.999 25.128 29.026 24.929 27.807 L 23.528 19.283 L 29.456 13.249 C 30.522 12.165 29.933 10.272 28.464 10.049 L 28.464 10.049 Z  M 21.65 17.268 L 20.636 18.301 L 20.875 19.758 L 21.968 26.406 L 16.252 23.266 L 14.999 22.578 L 15.001 3.993 L 17.857 10.045 L 18.482 11.371 L 19.882 11.584 L 26.276 12.558 L 21.65 17.268 L 21.65 17.268 Z %22 fill%3D%22rgb(255%2C159%2C67)%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\r\n  background-size: 100%;\r\n  width: 100px;\r\n  height: 100px;\r\n}\r\n";
  styleInject(css_248z);

  script.render = render;
  script.__scopeId = "data-v-106112bb";

  const registerComponent = (instance, component) => {
      if (component) {
          instance.component(component.name || "", component);
      }
  };

  const Plugin = {
      install(vue) {
          registerComponent(vue, script);
      }
  };

  exports.HelloWorld = script;
  exports.default = Plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
