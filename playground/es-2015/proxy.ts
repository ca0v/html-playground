(function() {
  const withLogging = <T extends object>(a: T) =>
    new Proxy(a, {
      get: (o, p: keyof T) => {
        console.log("withLogging.get", o, p, o[p]);
        return o[p];
      },
      set: (o, p: keyof T, v) => {
        console.log("withLogging.set", o, p, o[p], v);
        o[p] = v;
        return true;
      },
    });
  let item = withLogging({ foo: "foo" });
  item.foo = "bar";
  item.foo = "baz";
  console.log(item.foo);
})();
