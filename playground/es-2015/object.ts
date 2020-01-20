interface Dictionary<T> {
    [Key: string]: T;
}

class ObjectDefinePropertyTest {
    /**
     * Creates an observable clone of an object
     * @param object object to be converted to an observable with getter and setter properties
     */
    static props<T>(object: T) {
        // manage pub/sub
        const subscriptions = <Dictionary<Array<(model: T) => void>>>{};
        const subscribe = (topic: keyof T, cb: (model: T) => void) => {
            const subscriber = subscriptions[<string>topic] = subscriptions[<string>topic] || [];
            subscriber.push(cb);
        };
        const publish = (topic: keyof T) => {
            const subscriber = subscriptions[<string>topic];
            if (!subscriber) return;
            subscriber.forEach(s => s(model));
        }
        const propertyNames = Object.keys(<any>object) as Array<keyof T>;
        const model = <T & { on(topic: keyof T, cb: (model: T) => void): void }><any>{};
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

    static test() {
        const model = this.props({ foo: 1, bar: "bar", baz: true });
        const dump = v => console.log(JSON.stringify(v));
        model.on("foo", dump);
        model.on("bar", dump);
        model.on("baz", dump);
        model.foo = 0;
        model.bar = "";
        model.foo++;
        model.bar += ".";
        const model2 = this.props(model);
        model2.on("foo", dump);
        model2.on("bar", dump);
        model2.on("baz", dump);
        model2.baz = model === model2;
        model2.foo++;
        model.foo++;
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
        }
        f`hello ${"world"}! ${model.bar.toString()}`;
    }
}

function dom<Props>(props: Props, template: (template: Props) => string) {
    const dom = document.createElement("div");
    let priorValue = dom.innerHTML = template(props);
    Object.keys(props).forEach(key => props.on(key, () => {
        let value = template(props);
        if (value === priorValue) return;
        dom.innerHTML = value;
        priorValue = value;
    }));
    return dom;
}

(function () {
    ObjectDefinePropertyTest.test();
    new ObjectOther().test();
    const model = ObjectDefinePropertyTest.props({ foo: new Date() });
    const myDate = dom(model, (t => `<p>The current date is <b>${t.foo.toLocaleDateString()}</b>`));
    const myTime = dom(model, (t => `<p>The current time is <b>${t.foo.toLocaleTimeString()}</b>`));
    const myDiv = dom({}, (t => `<div></div>`));
    myDiv.appendChild(myDate);
    myDiv.appendChild(myTime);
    document.body.appendChild(myDiv);
    setInterval(() => {
        model.foo = new Date();
    }, 50);
})();

