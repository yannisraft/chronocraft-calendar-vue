import { defineComponent, pushScopeId, popScopeId, openBlock, createBlock, createVNode, toDisplayString, withScopeId, ref } from 'vue';

var script = defineComponent({
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

const _withId = /*#__PURE__*/withScopeId("data-v-106112bb");

pushScopeId("data-v-106112bb");
const _hoisted_1 = { class: "hello" };
const _hoisted_2 = { class: "highlight1" };
const _hoisted_3 = /*#__PURE__*/createVNode("div", { class: "imgtest" }, null, -1);
popScopeId();

const render = /*#__PURE__*/_withId(function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", _hoisted_1, [
    createVNode("h1", _hoisted_2, toDisplayString(_ctx.textmsg), 1),
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

var css_248z = "h3[data-v-106112bb] {\r\n    margin: 40px 0 0;\n}\nul[data-v-106112bb] {\r\n    list-style-type: none;\r\n    padding: 0;\n}\nli[data-v-106112bb] {\r\n    display: inline-block;\r\n    margin: 0 10px;\n}\n.highlight1[data-v-106112bb] {\r\n    color: red;\n}\n.imgtest[data-v-106112bb] {\r\n  background-image: url(\"data:image/svg+xml,%3C%3Fxml version%3D%221.0%22 encoding%3D%22UTF-8%22 standalone%3D%22no%22%3F%3E%3C!-- Generator%3A Gravit.io --%3E%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22 style%3D%22isolation%3Aisolate%22 viewBox%3D%220 0 30 30%22 width%3D%2230pt%22 height%3D%2230pt%22%3E%3Cdefs%3E%3CclipPath id%3D%22_clipPath_w4QUNWLcM2TMTjClygIyXQwVwCx9WW4g%22%3E%3Crect width%3D%2230%22 height%3D%2230%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path%3D%22url(%23_clipPath_w4QUNWLcM2TMTjClygIyXQwVwCx9WW4g)%22%3E%3Cpath d%3D%22 M 28.464 10.049 L 20.271 8.801 L 16.61 1.044 C 16.281 0.35 15.639 0 14.997 0 C 14.359 0 13.722 0.346 13.392 1.044 L 9.729 8.8 L 1.537 10.048 C 0.067 10.27 -0.521 12.162 0.544 13.246 L 6.47 19.281 L 5.068 27.806 C 4.868 29.023 5.797 30 6.837 30 C 7.113 30 7.397 29.931 7.669 29.78 L 14.998 25.756 L 22.327 29.781 C 22.599 29.931 22.882 29.999 23.157 29.999 C 24.198 29.999 25.128 29.026 24.929 27.807 L 23.528 19.283 L 29.456 13.249 C 30.522 12.165 29.933 10.272 28.464 10.049 L 28.464 10.049 Z  M 21.65 17.268 L 20.636 18.301 L 20.875 19.758 L 21.968 26.406 L 16.252 23.266 L 14.999 22.578 L 15.001 3.993 L 17.857 10.045 L 18.482 11.371 L 19.882 11.584 L 26.276 12.558 L 21.65 17.268 L 21.65 17.268 Z %22 fill%3D%22rgb(255%2C159%2C67)%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\r\n  background-size: 100%;\r\n  width: 100px;\r\n  height: 100px;\n}\r\n";
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

var script$1 = defineComponent({
  name: "TestWorld",
  components: {},
  props: {
    msg: String
  },
  setup: function setup() {
    var textmsg = "I am Test World Component";
    var selected = ref(new Date());
    return {
      textmsg: textmsg,
      selected: selected
    };
  }
});

var _imports_0 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhMWFhUVGRUYFRgXGBcYFRgYFxcYFxgYFxcaHSggGBolHRcYITEhJSktLi4uFx8zODMtNygtLysBCgoKDg0OGhAQGy8mICUtLS0tLS0tMC01NS0tLS0tMC0tLS01LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMIBAwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAAFBgIBB//EAEgQAAIBAwMCAwYCBwYBCgcAAAECEQADIQQSMUFRBSJhBhMycYGRFKEHQlKxwdHSFSNykuHw0xYkM0NTYoKisvEXVGODs8Li/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAIDAQQFBv/EAC0RAAICAQMDAwMDBQEAAAAAAAABAhEDEiExE0FRBCIyFGGRcaHBQlKBsfEz/9oADAMBAAIRAxEAPwD5bZuW9r7gSxA2EMAFM5kQZx/HuCs0txAwNwblzIBgnBjPzg/Sq7wzT23ubbr+7WG83qFO0fUxVs/gOnKFk1tssBIUgCcTEloBnGYzHSCQBm9d0R3bUviQdvnt4MyDxx+r1x65r0voS3GpUE9GtQq9IkEk88mk7XgumZFb8aikqpZWUypKJK88hy464CnkkBe54ZZg7b6ti0RJVcsSLinzHK8yCRHzoAtS2hOf+cLLcBreARySVMgHoMxPpQrV3SeZWW6Ruba6uocLI2+UjaSRM9px6K63wzSpu2agvCyAAuWPvIEiZgqgPGG3T0qk20AX2uexj3PvBkyLjIYGNoXaB6zPpS24dxVVsqbaALXcO4qbh3FVW2psoAtdw7ipuHcVVbKm2gC13DuKm4dxVVtq70/g9n8K197w3lW221IDKwfYsjO8HGPLAJbMAMAB3DuKm4dxXVvwnTlVP4xFJVSysjyrEZWRIMHrS/gdmy11RqWK28yR36THT/TI5AAbcO4qbh3Fe/2Xa95dU3xbQZsu3mDoSdrHaJ+EZgSDggZhTxDRIhHu7y3ZmdqsIiImeZ9O1ADW4dxU3DuKtj7PaT8J773/APe+637fe2Y3wPJs+Pkn7Uh/Y2mPGuQcSDbeeTPGJAg/fOKAAbh3FTcO4oGv0FtFBt6hLpJjaquCBE7siI6czmnNF4Mr6O5eh2u+8CW1UrAChWd2X4mwSMRGTkAwAC3DuKm4dxXtrwuwyKfxaKxUFlZHwe0qDP8Ap8qr9HpDcYLgDlmJhVUZZiewH3wBJIFAD+4dxU3DuK9Gh0r3HC3zbtjZtLqSTIO4wM4IH+bsK5v+FWQpK6u2xCyFCOCTE7QSOelAHu4dxU3DuKP7L+D2tQzLdYqQUCBWVZ3bpJ3KZAgcD9aurng2m946nVqgVoH/AFgI2oZDKAGEsw4Hw+uABdHWc5HWCAfoYMfaozCccdJIJj1OJpDQrb3j307Mzt5mMAmDAnkgExMZq313g1hbjKbwteVWUMGceZmjIyoKBXAIn+8UHiaAOdRdtFU2AhgPOT1O1ePMf1g5wFwRiubL24bdJMeSDgHPxZyPTvB4BVlfE/D7VsA29Sl6TkKrKRgmc/QfP7lJLQIJ3KOcHdJjtCkZ9T0oAstw7ipVTtr2gC/TwW33f7j+VNWvALMZNz/Mv9FO2kmm1WvcXpsb5R4cvVZFwys/5N2f2n/zL/TTug9ktKxPvHujtDID+aVYW0pi1bpn6XE1VCL1mZPkqr3sfptwCte+ZZP4JXF32NsAxvuH5Mv9FaFLdXfh1hSssST2AH8qnPDixq9NlYZ8uR1qowi+xunj47s/4k/prwextn9u791/pr6Vprgtnyj5yBRb+tDfEiH5ioXjv4F3DK1/6fsfN7XsPpzzcuz0Hl/ftoh9htOMH38+joR/+Ovo1q5Z2wbNr7UzZ8VCiEVRHallLH2xmxhl75P5/wBnypvYiz+1e+6/0V7Z9idNPne9H/dKT+a19Qv61mMyonriaiDTzuuKWPzMflTasVbw/AvTzXtk/J8y/wCQ+nZwFe8ATALMn8Eq+H6J9OYIbUR1Je0J7kf3dbW14lbTFmwq9jEn7nNcajxO8+CPtUMlSrTGv1OjEpRvXO2ZB/0V6Jeb2p/z2v8Ah0F/0a6Hpc1RP+O1/wAOtW1u6eVP1x9q9Ghcif3TU1Bdymt9jIJ+jPRdbuoX/wAVv/h0vc/Rvpi0W7moM8Sbf9ArcNYj4pn50QXFXqRTJRXYxtvuYC5+jS0ATN7HPntf01za/RxaP/zAHebZH/ore/jBPwKZ7ii/2gAMqB8qa1XxFqV/Iwlz9GVgQPeXyT22f0VLv6LdODm9cHzKH/8AWtm+odjMwPQ0rfVm6msUG+xrml3Mun6MdLEnU3Ppsn8xS7/o1szi80erLP8A6IrUHRHbJaB0z/Cpa0m0y0sOoEim6df8F13t/Jlv/hzp1MPqH4nBT94U0FvYXS8Lcvt6ykflbrYvcXcYTbjECT9TXSC4+SMDiIrXjXLRiyPhMw172H044a6R33J/RQ7fsXZP613/ADJ/RW41DbSFFsD1gj7k0L3oWQAJPJXr6Zo0Rr4m65XyYpvYyzODe+6/0VwfY2yDl7gHzX+itZd3dqA3rWLEn2B5a7mWPsjan4rkf4l/poF32ZtDrc9PMv8ATWu/Du3CsenFcHw26f1eMCt6Me9C9aXYxbeA255f7r/TUrYN4Lc6gTUrOnDyjerPwyosLinLVuhWUp62temmeXpPUt0wluvba01bSm1COG54iU0JgCu7embt+6jCyRyKTWmUUGgKs0c0xpSP1hI/Op7uiWhmkkkykW13GLek3gkDA9c1G0pHSoBRbBCnzZFQlB9mXjlXDQIp612qek11e1FoYVRJmNxM/aaRu3+pikjByKSyqPA4Sw6GB2zQ01gqt1/in9y5XaTaUnIjuRPzgwaDoNWW3b1IgngEgQNxDMPKCOIBPFNGELp8k5ZZ8x4NRbuyvxLETjJ+tLjV9Nw+cVW2yDwZ4/PIoot1qwRB+okNXmXvPrSrOO00QW6691TLFBCSyzYAP6V0LvpR1s9zFdpaWeC35D8qZ6fAqc/IvpWYsBuifQH+FHv6ASxJfHp+eBgVY2fDWJDBVH3/AI0dvDLh4j71CeVJ7M6IYm17tyiFgGB8K9CImmLOnHALEmrhPBDjg0wnhrDgCpTzRfctDDJdjLarw5iZg15Y8OJ6Gtn+CJGaA9tVxwfoJ+9R+oSVFeg7szR8Ic8fnXj+FKgzAPc1fOHPwj7Zqv1Phbuci5ntSdZsbpfYqx7gfEZ+Zpe7rLCmVTPTk/vq6X2RLchx82H8q5PsP3aPrNZ1Y95MZYZdoma1fjbHC+UDtA/dVW/iNzncTW/teydlMsCx9ePtQNX4Egg29MGM9YX7yKXr41skU+myNWzB/wBo3O5r2tk3gc5OnAPYAED6zUrPqMfgz6XJ5MDaWn7KUvYWn7C17eo8TSd20pq2teW0phVrLNSPUmjoKGpM07ZU96VyG0nCpXa26YC11trNZulHNtB1n6VLwQAnzYB7V3FCuDB64OO/1pWzdkfNPaLx9veymPdsNzAqykGRlYB4JEbvr2rW9q7rW7doFRtJhlnOSQG+QaPoDzWn8UvC8Pw9jTELuZ2dwioIE7927IWT0j51hlQKcgZH1BrzM05Rb3LNQS4GjdYmC5PlA5JwOny9PSi6Dxq+itbV/IZJkCOIMk5ggDg/aq+26rknE5+U80G+5NwbSeDMjoe/2rmi5J7MyMG3R9D8Auaq5ZnT2V+KLj79zzzhMkTJyx+lbHT6dmUNGCAZkEfcGK+QaH2gvWV92rqisRuIAMkRAMjjjHWtfZ9sWNu2iMzXldSXJARtw27SsztAae8r0rsx+qcYhoT+Ruxo4GT9gTXSaOev5GftFK+D+Is1sb/eKy+U7ssT3JgA/QRVkl/1b8q6FkyMbRiOU0TDOJ+U/wAKO9swMAkdTj+FRLv+P7j+Vdi0CfhY/OKSTm+SkVBcEtr+0zT2U0/YuKogK31z/GhW9HPQj6j+VNaeyFPU/PNc82joim+Bi1dU8x9aN7+2OWH51w+oSPhH5UD8QoGUU/IVGzophrmtt9HH2NK39SjcspjiU/8A6qPqE/7IflXBuL/2a/cilsZRbOfxM/s/Yj+NES+54Kj5z/E0NgDwo+5/lXm3tj6GlbKqIdxeH/WL9AKUutf/AGgf9/KiXLwHLkfUigMUPDH/ADGlbGUEcNev/P7VPxd7rbohvx+t+dL3fFVHJn5UjZVRS5YT8U/7Lf8Al/jUpU+NJ3qUu41x8nyfSXjVvYu1U6XTmrXT2TX0Wo+YcR+09HWTQ7Nmm0SjWLpO7NqnrdTw/S7zE8CTRLlvaSO1S6quinSlp1djoCuorhTXYNbrF0sHeaAT/v8AKsf4j7YpAVGi4dy7OZceXaSBKGcgwZ7VpfF/DffhVaNoMsCJ3D9kdpPJ7d6w/iHhDi9cdbduLZBCsAQSzJbLMnwlSA+D0C8dZZMkuxSEF3Nd/bFk2re8e7S5CXHEIEBlSJkRDCCD2OK+fe0Hs/aZy9m9aKLjZbuKzAADzczPpHIag+0l/VLbWxdLsWi4UyYYjE+gHTpAqo8A1D27hO82ogMSq4QkZAZTkcwMkTHWuec9fI6xbPSzm9pwBsbcMyJmYOe3HH3ri/pCAdjTI4PMdgenPanfFHZnuMwO6SBOZUSAZJMgnd1PFK6Lw9ri7y42KwESSwBBJx+quD5jicda50nZkL88ciw0911BYCBEfTqQKds2SMyPWByc8n6c0QMLIZXQuHxbckggA5IEQ2IBzH8dTqPBbH4Zzbf3t0KLiJbR2uhVUm4t9VB2CRhzEGPUFXGUuAcZS2VfY3nhKn3aks7Fsy8A+kAAACB078nmrW2lZD2P9oluC2t4oqbFAecBoBho4ABIkxkDvNbj3iBQFIac7hmR0g9q7o54ukh5emnG2yWjFPWX7UmprsLRNKRkG0ODUd6Yt3fU/eqyTXiuRUHj8F4Zq5LmBQ3WkF1hHSaDdv3Txj5dKlR1rIqtIde1PWpsNVV3VXVEk/kM11pdc7ESMR+fescXVjRyRuqZYkxS9xzQ7l71oDXx3pCtpEvCaTuLXdzVL0M1yt9BlgT6UO0L7JdxW4vrSty3611rtem47RA+dV9zXHtTqEmjnlLEnXIVrOealItrWnj8qlNokT14/AnYK9xTttx3FVNiaf09otwK9J7HFVlhbuDvTlqxcZdwTH7680GiUAl/Meg6f+9aPRXV2BSIgRXLlz6fideH02v5MX8E0bL522gEcCheNXSG3Djr2qxSAY6dqT1WlD4JgVzxyXk1SOqeGsWiIHw/T3Lq7lCgDGZyaubekQIAYJ6x1rnw91tIEUcfn617dvSaWeVye3BuLBGKt8ldrRsJP6v0xSZ1drJK5aJwMxxNOa61vEwMd6V0llWMQBXRCa02zky431Kj3AbNO0zb55BBgwAB+QFZ/wAc9j7d+4WQIgYgsQIIHlBxP+Iz9OJFa46KGMmAI6c0rrAPhjBGfril1xb2MeGcVbPj/tbpgjqlsxatk2kbMuoYtJY4aJj7UhotS9lWUMNhKEggEFlbynicc19O8e9jDq7tsLJRAFABgBYJOe5M5P7QrP8Aj36O7i3V2MArRiCwB824n0ChR6k+s1ByV8h9NlW5UaXw+5q3tkuBwAduAxYmGM4klmiCMY6Cvs/sV4IluyQ9oeYKDvzIEkDacKuT5QABJgVktJ7K3LVlLLMN1vc4YDrwEbuuWxWzs+JPEHDQJ4gfyrHPwdOH07jvL8Fb7S+xulvs9wr7q9gi5a8p8sQGUeW4IEZEx1FYq6niWkPl/vrYJM2+Y5/6FgSDzhJr6OLF12BYxPY0vqtLtaM02N77sbMnWyMLov0h+bZdAkSDA2OpjghjzPy5+lWVn2ytSNwcdfiUmMdJFX2v8Js3BFy2lz/Gqt+8Vntb7C6NuEa0T1R3EfJSSv5VS2+Gc7UI/KP4LLSe1NhiZZlOYDDmOvk3U14b4/Zvm4qMSbZAbEHOQR6HP2NYjxH2Iuos6e+bhWCFuCDj9llMT81+oqewusHvQSTF5APTepJEfP7+YUtuL3G0RmqifS0XGDXZVgJrm0vAA5/3misYxUnM6oYdK3ErzT61wLpFHdST86lzSMOlNqRJ4pXaAzPJpV7I/aNHvWGXkChJuOAtan3TEe7qS3/yLm3nmpcUkUVloLVjdmxgo8oUNheooZtDos0ZlmvVUTgiiUmZihqfGxXXGg8VKLdtySTUp01ROWKduiv0mnkgVf6Xw8AZ68VUWtRDTVqPFPLHWPtXZkU3wRx6VyPfhdtdre9ao/xbz8Rp/TXN3NSliaW5RZVft2LrTGetF1NsRIpGxf28V7qtbPSuZweo61ljp3Il0zR0JfAPmqqXXd6NpdeAZ61R434Ixyq6bGNaHTDfQjinNDoxsW4uSeZFeXdStwQwkelPNrARgRUpSemqLwxrXd2hFroYNBkg/lVVfcLDMwUdJ4PH5ZGfWrDXIoDOTxmMhT2B9K+c+0Htgt3T24Ki4BtcMBt2xBIzBBMcfsg0idcGZpafkfVPDfFLTKDuUFpx1wBj5iRik0sC5dJuvwJVQc4OePmK+MaT2nuo0oSYh5MQIUqDJj9VvuAacX2puK/vHckjcFzgBgCQI4bI8wPTpFJumS+sXdH1rXklgFE480dv513a0DuqkNE896wvgXtldNxVdpDFACAI80SD/lMR+0cA1sfCvFluk7dw+KA2CYMSBMxwf/EO9MpbF4ZIZO42LpHl6L1piwk+Ygkd6r9Rq/jUQIOfWTH75FF0WsYLtkARIx+VPW1hrWrSyxs6UFhny8/WvfEwmREyOf8AfFVa62AV46zTA1AZCGgn99Y00MnF7Jii6U7Aw6/cV8s1GnfTay7YBgbjes/MtuWO+I+obtX1ZLpVQoExP27V85/SNf8A+cae4YGCC3bb8Ex0lm+9N7m7JLpxSS5PoOg1ysiOp+IAiek01c1QJBxIrI+xuuW5YKiRscjMTDgP06SzD6VfK+eflRHHe4T9Q4uiyW+OwpxdUAM1n3velA/EHua36ezF6zyi21txTmf9BSKvSjXTXG496pHDSojP1LlK6LMXccCk790HpQPeHvQy3rWLAk7Nl6uTVI9uxS1xqKxoFwinUEc7m2wRuVKGzCpR00GuQjaaaYU0joLPu0tKFgsMhiTkgscmM4JI6dqrL3tIqOdzHabZ4A27wdp2t2ngyeZ9K7ZZIx5JqDfBp0plWNZTQeNFoZWZwpgDAc7iyjeuZO5IB3AeaekG90fifmuBxKqbhkEGAhZSFEAtBWMxmaXqxkboaLMXW71419j1qs9mte+oRnZQF3HZB6cCevSeOvyq3NuhJNWDbToCGr0GjizXS2a2jLPLN1h1q0sajGaTtWR1oHjXjlrSpPlZySFWeIUks3/d/M8dyJZYxq2UxzknsIe3PiQSy27VC0SAVTaGdiu4iAQQZ9YyvNfMvDvDrupc3PhUjJf4Tgbmxknk4785q7t+Hm7dN/UeYtwGyBJ9cSSQMDsMcVf2ytqRvk9hJwIgBSu7oOBz864pNdkdKwub95S6f2QRlB9623A3CE4OYUzuUfSZOcVUt4BeUR/0lucFFZjE/Eyx5RI6TkDtNaVdewDbSoEQhnbIHKyTzHQDOewFVx8UVD7pzsIgCDMiASJAzM/mc0lsq8GLwVOuf3W1xDbg3P8A3Qobj4pkRgY6VoPZn2rt2n2XStsXGRiVkKi7QsZ/V+EZOJmqe+o1N6Yyp/UUQwy25p4x1+Wau9J4RpwmbKXbtw+WC5CKBlwgJEyfiAztJAxWwpHP0k5NRL257SBbhIQsHuMclVhBOwwTJyOI4c9gC54R7RI3luBkB/WKkqAonJHAI6x9eJz62WthYte7LAcKFUg9GLATAb/cUPUae4f72dlkEAOpUgkGBtEzMmMxkdeadZCnQ+7NBq/aVVIItHa3ws527hEkgQYj1OKPa9oF3AMqhTHmRy4BzzKgn6A1nLIt3yttLk4Jct+02SfN+qSOnYH4qVvyFkgMFOxIwpMqzkQOYPMmNtZ1ZWOvTxr7n0bWX1tKGuOEU8EkAH5d/pWA/SJZP4iz5gAyOI6CCpnIgzI7fCKstDqEDlSA5AUPHfhlJAHYER+16Vivabx5rmqIkgWQthYjy7GZZjEgg57n0AqjyKSaSEWHQ027NV+jvSt7i6f/AKgU9B5VBn84+laeWB4msb4FrW09uzefzLduOLgT4QrIApyfMSVB/Lpn6CmnFyCjqymYYcGNs/WWiOcGqYsiapnPmg1K0Vuq1W4cQR+6lC5q8PhqjJdfuKGfDF6GqqcFsScJvcpveGvfemrc6AdxQm0A7ijXENEis95XLPVl+CHcV4+mSsckboZVl64e037J+xq0t3kXgfWub3iYHWkcneyKxxxreRTNpn/ZP2qU63ignmpWap+Bunj/ALjG+0HtMjf3CbehDqdxHlGOwOWBPYetY5Q7hl2yQHn5EhgOxG4D/cUq9wTI579ewqaUCTvZwsQNo/Iz0pJSct2ZFpKiwt6gKAUZgJXoB8JDjgSDuJyDPlE0e540Ql0Fne5cESzeTbv3t5SJJJGTOZM1SBZOTj7/AFiiWVkiG+HrBgTjMdMxWcBq3Nt4T7SXrSLDWwWI3hl3bQAqzgzgAY9OvNcav2o1Lqri8k7ivu0Vg42wwuGVjaY5n5jmsxp9QyyqnBMxAhoxw3I+nSiJI6x84+lScprayMmky6PtJrOuoYCOAF+vwij2fbHUyEa+VUnLlEJUdThST8vzFZ9VYGJiePkc8EUXUIgRAt1iSPPbYEFTnIPwsO3BE8UKUvP7i7XuWZ9rNWd0ah4mFG1JKmeseUxH36VaaHwkkjUam47sSDDZgZMkEGenYfOkfZXwdZF66JHKKRzGCeOAeJjIrQeI+Jq7C3bQbQYYtJXtBI6ebJjt9Ncm1dnRixbphLtwEBywnzFVIWWngyMzHA7DJFVfi1zYs2z5o3O21QFA429SYM7ukY7074rcQWTxOATxJxO30xP0rPeH6O7qSiqy2Rcb+73BwWSJ3gAEFcH4iJ70jTZ1ymoI80PvtRcUW0hVghyD7tFAMSf4c5rS2/Y3KXNQ5dWVvKsWw2fMQTLAkjnH5U5Y0AtWLdtArbDgdHLCDcgZEyTk8Ad6tPCCo+JDEbd0mQxiNzHmAYzPxZxWoV2/kJ6bS2bbi0luVbHlUvIAjzMB5m8pyZ4+VVfiNy5ZZimEjqVFxVMzidxxP3+dPHxZfe+7tqR5iNzOVG4GC7MdsqJiTtmek5zHjmuIX8PsC4Ilhu3EeQuCY80gz2+UVkpUZOShBt7F7p9SupTc7yLfO4kAdFUT8uPSh6O63uitu6wtyd0RubMEQQccCMDjBnOMF0fASCRmGIIIPpPqeKPc8Zus6/3hUwdomExJAXkxwOaSycfVxUUbFtaRjTIpPDEzj9nzEAR84pH2gv6uF3EKPIAyQba7uSWON2f/AAiPUmjt+OalFKLcYA/HkBjBk7iZwMk9oxFH1/iTtZtqNuwTAjzCfNCKBGZ9SADzmMc90V+ox1sOe0Hidu0jhUi4Z93jzM7GS8RxmfX6is/oCPdu18gu+0gcsSDuJPqcfc0G/pTcfc0MzFiG4OTIEemIABx07Wnh/sdfY7roKJgs7QDnooJwfnAEEmeKqqqiUs6nK0v0Of7Vb3K22jbuD4MNKiB0g4x0qw8L9tTYus4UlWkBCQBPRv8AFgfnWn8O9kNEVBYFtpiblwQ0AmeYJEnEcSZrL+Oeya2l3AMoODuYEBp2qDIAg95mTHasUUtxdGXTuy10/tpaZoLsBNqN8lpVmBEj5rntWy0GoLgETld2e8+b6fD+fSvht7R7DFwEERM+UjnBB+dWWi8cuW1IklSpUgM20jn4QYHQYxAq0cmntZBu9mz6y/iluY99bn/EOgDHr2/fRjJEhsHqODXyqz4vDzcB25IiCQfikRgdpHSeMRqPZq+TclCQjCdsnaSYAIUj1/LnGa489ypoo8ScNUZGluT1JpS6fU0zqmAmTwQCOuTtH5yPmD2pB9QpAYMIOB/lVvp8Qrq2ObcFdY96TvPRLerS4SEMx16R6d+1DvIaZJPdGXQmzZqVGQzUrdIaj5nbRjAEk/ejshwGghJ/OJlh8X3+VcbMZbjIEmB8h34oqKIIiSe4EV5rZ2aokQIY468cfSmVUHgScDAP0wtdi1bwSsuI2iBtMZO/c0ntEdKY0911mDbUcwgA/Idf99anKXhkpuv6vwDTTNMBDPWRH5fzrjccjIPHUH5R+UUyWn9ecTB5HcmOBP8AvpXBX64+n+xUtXk5pS3Fg3+mf5U1YUdQY6jIGOAP59K5e8Se0+nrIo1i4GkOxAAOdyLgdAjRuaf1QZP51u5sZUw6eN32G0NsxhQPKBG2ADgQAsR2HpS1rWXBgEnG1R8vQZJJg0UtZ/VDsOmQpPIzEgf7zR1AcmBbRj1JMEkxG7KqZMySBgzxSuZ0PK00r3ENTbutbIeWGSilhzEkkc9OsenNGfW3ixdrjM7J7vdwqiFGPtGO80RiAvlJ822Zj4o80HqJnPaKUALYHSSYkwO5xjpmmU2xZZUuXuXPhXtKEKq4JQEzAEkQTE9pBxHfrmj3/aJbsq5uqpJ+GNjLB8pUtuVpgSOk/KqZfD7mwXNp2kmGjos7hJx3oGptTxEGOBgFgMZwMj8qFJcIpHPReavxq2rgoSAwO62o8ic/CTxJJb/XNUPjd/3z7lGxVAhesd5+sRXhstx847/Op7hoAwIzgCJjtWqSRss7apirWFDQYLA+aDkzwc84/fRG0ygjd8IGQxjtBBNd3dGCZ4iIIA6kHnvEivLmiIPmOOk5jHf6cVur7kG/uc2rwBG2IE4JDEE4GMA5g89OkyWwdzKWby8AeYZMZBPQndP8c1XvozJ2kZg9MdeAPl+dN6Ww5I3kHBURPacz0EUS08pjxa8mv8I0QRVuMg3ONy87gueNvBgyYzkjvVpY8ct23HkLoJJUlo94qwCSe5zwT5uINYjRam6LqyzwwIPWcECJEdj9K9teLXH6gbf1TMcHKr9e/brNbFrgrGUeEfSh48gP9/h/LJtkOkRmBMRn8usZcXWD3bMwLW3BHuyF+EMwxBEtABySMsJ4r5Tf8TtkAkMGEzjzScSGI+fGPN6Va6PxQFQoZsNKhgzAA9ZjJzxPWt+x0KVvku/aHwq1f2patulxFPmcLtYqNpQ7STgj6QfpgdVZe2Sj24fIKwQRGTKnivo2luLdBm4AZVuSGSYLErEhZM9eB3pL+zU1TH3+8lJG8QG27iBlpBGev5ZrFVhkxRkro+dm5mCCCOCOR8qd8P1txDC3GCntg5DKJ74Zvv6VZ672XFkibyMWBKgP7tucEq65EiCFMgiPWqm9YS3ENuOCduYCkeueenaadpo4nGUeDaaH2q3oy3suHW4xIA3BYwokScsT9aymo1rLvVHOwbyPXdH/AJYWADnPpSjXwevf/YofvYmORJP3EAGhTk+RlwXPhGqa2HcoQWEZOwKJJIj7nrj7HYHxG3t94XUJhVmCztHmgKSIE/kekV8wval3UhmJAGB2PHSiL4oPd7Mdh1gDoP3zV8eVx4McFI293xu3JhGInkRB9RB4qViPxqjC7yBweKlN15jdGAijgf8AtRA5EQCfyprw9LUEOFnMElgY2tHoPNtzFWV/S6JQGXUOTIldsyIG7OI6/fiudiMqfPgwPy69DRUUic5ggYDc9c8HPIFdWVtFgN7hSknBJ94cbeMjr/Gi2b1tVm6AX/VWWBBBAhgOOuSPzFK0zK8A1YAY57xH7673yZP1iIgwBR9S1shmtxAJjFySJUAKTjgsTP8AIjr8VpiWGRIG2AZkFxExjGw8c/Wk02TcGBXkHaIzkz0A/n+VGY8xAiP35n7npXNm5aZRucg8FZ6lgCB5T0MiCZzMRQtRs92SjtONsxzIkRtngnMxgVmhhplXYOmpXbtdn2BiYkASVgtO0mYIx1+0dWbyg7VOGyjwscGQZyJmOmY6iuFs6dgCSxAfzAk7NktiQoYeUKeTyaGDpz8LNEETDecyBxBiRJx6cUaEzWmxw6YwAWHm5JU7hBkFeTOI+RrjS+INYmHZZkHbKkqRBUr1BHevVNtk5uR5yuTMz5RwPLE+nHHFI6nU2dhALMwJIJJ5hNq/Dx8fbj5URx3yyUceSTdysYuMsgqSRJnsBJEepI5xXFxuY4HXj0mmLN/TMSQrRBJkthpBEf5mX/7c9ctudOoguQCW+eTgcRxn5gcUjg06CUXF82VpmBnn1yeMfaK7/EdIHSYMH1j6R96JeOnCwjsTyJHXGOBmM0yi6ZlXMNKzBaP1dxM46kc9KxxS5GSj3BW9+zcANgME+vIAPJPqKYVUcBkYm4qs9zdCqDjalsyTMmM+kdqDc02nEbWaIBwTEnd3Tp5R0/W+VLXLP94RbMjJETMAx5p4449RWOK5KLSdG8wYvMEDcYEdOw4nPamtF4Dq7yb7VpmSGcMGSNuATlu8T1FKXLLyRt+HJHaRjH3+kUFbYB8uCxyRg89/rWpxo3VY5pUAZO/BlgeQTjvwfvSV1grMIJIk9dxjiYnOab090Yn9UfnO3pQWZVdrinzHImJ7nniki3qdmY15Am2RM+YYBIIIgLP0GDnjBihWde48yNBB3DseOfWenWavtJcVbZtm5kkNC3FlQDgKzGGM5Pm7Vm/E7cXLkEwSfnJ6kDic8VTFPVJqjtlicVaZttF4hbvWlVW23GVVYEcwADJmeQcAdR0omjv6hbbK0AKYcQYDboaQfUEEjv6ms/7Ja9VbYXCyAN54mSNu6JA4PzpnQ60Fr4kkqzFSZzEkYJgSRPFXaopF2WvtRp2/DeZV3LuYEkyQCJwDI/WiecfT5/GIGSSMd+4/dX0FdZvKW7qllcbSZyNyxCiZUySZ4EehrHeL+GvYv+45UtKN5QxUFgDvglY6j0OOKINVyTzQt6kFseHwCD5WbPn9egIJHHeI9KB+GKQSpIJ+hgiRzIkH864KZgs7FRk7DsgDjJk/lR28Rm2ylCeNuGgdcnmOPtUrkna3JRgD1LB7p2JtVgoIyQDChsmTEyc96W1nhkCVaeZwREd/nzj0qaTWDM/FmG8x+gjqfWj39Yhc+VlQkeXcCwwJhm78571S5J7Csr1s9v3x+Ve17duICQu6JMbgA0dJzzFeVXcPcH0uolCm0kkk4IEzjMjkSPsKutDqLDKFguYtptY7R5B05GSBPFUl/wARtlSEsqpIiTmJHykn1quW5RTZri+zNENWFOLQDIT0AI/vAwiQYjIj19KDdvL8Rtx5do+E5JJ3ZXJGBJzz1qp/FHqT65rsa2OJiBM9/SsakI1LsXI8Ut/9iuDkeX9oHHl7SO/Xmjajww21tjyFzsYhPM3UFSRiYAMCRkZkGM8+oBM5/LM8zTV/xhm2iTCgATGABED06/U96SUG+BXCVhPdKpYsMdASYk/vxTFxwAc+uAJnpAPbt/Oqi/qyx7U34Xr7SPuu2zcH7OIJ6E0PG3ya8bdWOG3acARJIWdpHOQIUcc8VeJ7G6jZuT3awAdpJLZ69Bz6GqrxPx3SuyPasPbdTmGVVYesCZ+vWn7Pt4ViLZMcSekRkfMzNZokXx4ca2k7KXxHSaiwpS8pVSTBwQe8MOAe1IWwAGKkknBzHPHzzWl1HtyzBgybgYADAFQIO7A68YniaB4j7UWnsrat6cJEGQBlh1JyY9KdJ1wZPHGL9hShLip7zEbth6mYOD6GT9qCb7nrx/rgUS9rgVKhSssGicTBBOfnRz4wPw62fdJKl/PBk7yDu5jeOJjIVB+rnYpvlCJXyhO1qmBxH2o48QaI8uPz+eaSL+laH2m9qvxSldjgG4Lg3MhgkOWUbbakiXgFicKBWuCfYHCL7FZc1zEQAv0Bn99efjbikg4YSDIIIPBBHSp4D4gLGot3SCQhkxzkEY+9Me1Hi66nUG6oIBCgbucD5nH1rOnHwGheDgeKXIOFM84P8+1d2tezsAwtn5qO3MnrS/g/iIs3A5RXgqcyGEGZQgja3rn5UF9YGuG4UUBmZtiiEXcSdqjoomAOwrOmktjapbFiHjfwN3bjuR29KDcdggSfU4A6zz1iaB+MXjaY+lePr+cfLilUH4MpjWlvskygIJIhgG5E9eBPb703+CuXQCW/uxkkMCRgSY6ZHFVR1inkGBHYH/SnrHjFtANttgfnP8qnkjNbxW5RSbVPgesaBtO6XgSIyuRPBHrP1oC3XLMAScEHGQGOZEwOT/KlW8aBVgVJk4n9UenrSv48YEEgQYJGT64zmiMcrXuMSray/wD7XNtwSQw4IAkbZgR2McTQ/E7ty+QUXaAoQZEwCT6nPec1SajWowACkR8s/Xn70b+1FkeTyjkdz3Pc1uiSSpbjdtPYHo7RDESQJhyB0B4BP+zR7qMgQOZ+PgncpJ5nv6Um+rGQogTI4n5HuK7fxCWBYFhjynjFO4ybs1NJC95SpmZJJj+fzr1LxGYn1M/zrvV6oOAADiefX1o+u8RBtizZDJa8rOpIJa6BBcnqBJCjEA9ySapWtxAmm06soJ95Jn4WEc9JBNSlbOt2gD+AqUjU/JRKFCdSpUqpMlSpUoAlSpUoAlSpUoAlSpUoAlSpUoAlSpUoAlSpUoAlSpUoAlSpUoAlSpUoAlSpUoAlSpUoAlSpUoAlSpUoAlSpUoAlSpUoA//Z";

const _withId$1 = /*#__PURE__*/withScopeId("data-v-493eb588");

pushScopeId("data-v-493eb588");
const _hoisted_1$1 = { class: "hello" };
const _hoisted_2$1 = { class: "highlight" };
const _hoisted_3$1 = /*#__PURE__*/createVNode("img", { src: _imports_0 }, null, -1);
popScopeId();

const render$1 = /*#__PURE__*/_withId$1(function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", _hoisted_1$1, [
    createVNode("h1", _hoisted_2$1, toDisplayString(_ctx.textmsg), 1),
    _hoisted_3$1
  ]))
});

var css_248z$1 = "h3[data-v-493eb588] {\r\n    margin: 40px 0 0;\n}\nul[data-v-493eb588] {\r\n    list-style-type: none;\r\n    padding: 0;\n}\nli[data-v-493eb588] {\r\n    display: inline-block;\r\n    margin: 0 10px;\n}\n.highlight[data-v-493eb588] {\r\n    color: green;\n}\r\n";
styleInject(css_248z$1);

script$1.render = render$1;
script$1.__scopeId = "data-v-493eb588";

const Plugin$1 = {
    install(vue) {
        registerComponent(vue, script$1);
    }
};

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  HelloWorld: Plugin,
  TestWorld: Plugin$1
});

const filterUtility = (payload, dataSource, filterStratergies) => {
    let tempData = [];
    Object.values(payload).forEach((config) => {
        const { filterKey, type, matchType } = config;
        tempData = tempData || dataSource[config.dataSource];
        const filterValue = config.value || [];
        if (type !== "key") {
            const isFunction = filterStratergies[filterValue];
            if (!isFunction)
                return;
            tempData = tempData.filter((item) => {
                return isFunction(item);
            });
        }
        tempData = tempData.filter((item) => {
            if (matchType === "exact") {
                return filterValue.includes(item[filterKey]);
            }
            if (matchType === "between_range") {
                const min = [];
                const max = [];
                config.options
                    .filter((opt) => filterValue.includes(opt.value))
                    .forEach((value) => {
                    min.push(value.startKey || 0);
                    max.push(value.endKey || 0);
                });
                return (item[filterKey] >= Math.min(...min) &&
                    item[filterKey] <= Math.max(...max));
            }
            if (matchType === "less_than") {
                return item[filterKey] < Math.max(...filterValue);
            }
            if (matchType === "less_than_or_equal") {
                return item[filterKey] <= Math.max(...filterValue);
            }
            if (matchType === "greater_than_or_equal") {
                return item[filterKey] >= Math.min(...filterValue);
            }
            if (matchType === "greater_than") {
                return item[filterKey] > Math.min(...filterValue);
            }
            return item[filterKey] === filterValue;
        });
    });
    return tempData;
};

const sortUtility = (sortConfig, dataSource, sortStratergies) => {
    const data = dataSource[sortConfig.dataSource];
    const { sortingKey, ordering, type } = sortConfig;
    if (type === "key") {
        return data.sort((a, b) => {
            const sortKey = sortingKey || "";
            return ordering === "ascending"
                ? a[sortKey] - b[sortKey]
                : b[sortKey] - a[sortKey];
        });
    }
    const { sortFunction = "" } = sortConfig;
    return sortStratergies[sortFunction](data);
};

const install = (instance) => {
    for (const componentKey in components) {
        instance.use(components[componentKey]);
    }
};

export default install;
export { Plugin as HelloWorld, Plugin$1 as TestWorld, filterUtility, sortUtility };
