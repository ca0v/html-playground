interface Dictionary<T> {
  [Key: string]: T;
}

class ObjectDefinePropertyTest {
  static test() {
    const model = props({ foo: 1, bar: "bar", baz: true });
    const dump = (v: any) => console.log(JSON.stringify(v));
    model.on("foo", dump);
    model.on("bar", dump);
    model.on("baz", dump);
    model.foo = 0;
    model.bar = "";
    model.foo++;
    model.bar += ".";
    const model2 = props(model);
    model2.on("foo", dump);
    model2.on("bar", dump);
    model2.on("baz", dump);
    model2.baz = model === model2;
    model2.foo++;
    model.foo++;

    const myDiv = document.createElement("div");
    const model3 = props({ foo: new Date(), bar: new Date() });
    livedom(model3, t => `<p>The current date is <b>${t.foo.toLocaleDateString()}</b>`, myDiv);
    livedom(model3, t => `<p>The current time is <b>${t.foo.toLocaleTimeString()}</b>`, myDiv);
    livedom(
      model3,
      t => `<p>Ticks since starting: <b>${Math.floor((t.foo.valueOf() - t.bar.valueOf()) / 1000)}</b> seconds`,
      myDiv
    );
    document.body.appendChild(myDiv);
    setInterval(() => {
      model3.foo = new Date();
    }, 1000);
  }
}

class ObjectOther {
  test() {
    const model = Object.assign({ foo: 1 }, { bar: 1 });
    console.log(++model.foo);
    const model2 = Object.create(model) as typeof model;
    console.log(++model.foo);
    console.log(++model2.foo);
    console.log(++model.foo);

    // unfortunately I can find no way to know which properties are being passed
    // so I cannot create a "live" template string
    const f = (strings: TemplateStringsArray, ...keys: string[]) => {
      console.log(strings, keys);
    };
    f`hello ${"world"}! ${model.bar.toString()}`;
  }
}

function livedom<Props extends { on: any }>(props: Props, template: (template: Props) => string, parent?: HTMLElement) {
  const dom = document.createElement("div");
  let priorValue = (dom.innerHTML = template(props));
  Object.keys(props).forEach(key =>
    props.on(key, () => {
      let value = template(props);
      if (value === priorValue) return;
      dom.innerHTML = value;
      priorValue = value;
    })
  );
  parent?.appendChild(dom);
  return dom;
}

function props<T>(object: T) {
  // manage pub/sub
  const subscriptions = <Dictionary<Array<(model: T) => void>>>{};
  const subscribe = (topic: keyof T, cb: (model: T) => void) => {
    const subscriber = (subscriptions[<string>topic] = subscriptions[<string>topic] || []);
    subscriber.push(cb);
  };
  const publish = (topic: keyof T) => {
    const subscriber = subscriptions[<string>topic];
    if (!subscriber) return;
    subscriber.forEach(s => s(model));
  };
  const propertyNames = Object.keys(<any>object) as Array<keyof T>;
  const model = <T & { on(topic: keyof T, cb: (model: T) => void): void }>(<any>{});
  const data = <T>{};
  propertyNames.forEach(propName => {
    data[propName] = object[propName];
    Object.defineProperty(model, propName, {
      get: () => data[propName],
      set: value => {
        data[propName] = value;
        publish(propName);
      },
      configurable: true,
      enumerable: true,
    });
  });
  model.on = subscribe;
  return model;
}

(function() {
  ObjectDefinePropertyTest.test();
  new ObjectOther().test();
})();
