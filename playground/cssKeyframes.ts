class KeyFrameLab {
  cssKeyframeTest(rules: any) {
    const style = document.createElement("style");
    document.head.appendChild(style);
    const sheet = (style.sheet as unknown) as CSSGroupingRule;

    Object.keys(rules).forEach(name => {
      let rule = rules[name];
      sheet.insertRule(`@keyframes ${name} ${rule}`, sheet.cssRules.length);
    });
  }

  run() {
    this.cssKeyframeTest({
      "move-right": `{
    25% {
      transform: translate(0em, 25em);
      background-color: red;
      width: 10px;
      height: 10px;
    }
    50% {
      transform: translate(25em, 25em);
      border-radius: 50px;
      background-color: silver;
      width: 100px;
      height: 100px;
    }
    75% {
      transform: translate(25em, 0em);
      width: 10px;
      height: 10px;
      background-color: blue;
    }
    100% {
      transform: translate(0em, 0em);
      width: 10px;
      height: 10px;
      background-color: red;
    }
  }`,
    });
  }
}
new KeyFrameLab().run();