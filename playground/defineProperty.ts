/**
 * Demonstrates a technique for observing when a object property changes without explicitly
 * writing getter/setter and change notification logic
 * Can use tsx and this technique for a simpler svelte-like experience
 * NOTE that tsx is not a react-only solution...can write your own dom/component creator method
 */
class DefinePropertyLab {

  defineProp(target: Object, name: string) {
    let hash = <any>{};
    hash[name] = target[name];
    return Object.defineProperties(target, {
      [name]: {
        get: () => hash[name],
        set: value => (hash[name] = value),
      },
    });
  }

  watchProp(target: Object, name: string, cb: () => void) {
    let { get, set } = Object.getOwnPropertyDescriptor(target, name);
    let newSetter = value => {
      set(value);
      cb();
    };

    Object.defineProperties(target, {
      [name]: {
        get: get,
        set: newSetter,
      },
    });
  }

  watch<T>(pojo: T, cb: (props: keyof T) => void) {
    let store = <any>{};
    let propNames = Object.keys(pojo);
    if (propNames.some(propertyName => !Object.getOwnPropertyDescriptor(pojo, propertyName).configurable)) {
      throw `pojo is not a plain-old-javascript-object`;
    }

    propNames.forEach(propertyName => {
      console.log("watching property:", propertyName);
      store[propertyName] = pojo[propertyName];
      Object.defineProperty(pojo, propertyName, {
        configurable: false,
        enumerable: true,
        get: () => store[propertyName],
        set: value => {
          store[propertyName] = value;
          cb(<any>propertyName);
        },
      });
    });
    return Object.preventExtensions(pojo);
  }

  testDefineProp() {
    let o = this.defineProp(Object.assign({ foo: "foo" }), "foo") as { foo: string };
    console.log(o.foo, Object.getOwnPropertyDescriptor(o, "foo").set.toString());
    o.foo = "bar";
    this.watchProp(o, "foo", () => {
      console.log("foo", o.foo);
    });

    console.log(o.foo, Object.getOwnPropertyDescriptor(o, "foo").set.toString());

    o.foo += "baz";

    // converts pojo to an observable
    let model = { foo: "foo", bar: "bar" };
    this.watch(model, propName => {
      console.log(`${propName} changed to ${pojo[propName]}`);
    });

    let pojo = model;
    pojo.foo = "foobarbaz";
    pojo.bar = pojo.foo;

    // proves that preventExtensions is enforced at runtime
    try {
      pojo.foobar = pojo.foo = pojo.bar = "test";
      // should fail due to preventExtensions
      this.watch(model, propName => {
        console.log(`${propName} changed to ${pojo[propName]}`);
        if (propName === "foobar") console.warn("should not have been possible");
      });
      pojo.foobar = pojo.foo = pojo.bar = "123";
    } catch (ex) {
      console.warn(ex);
    }
  }
  run() {
    this.testDefineProp();
  }
}

new DefinePropertyLab().run();