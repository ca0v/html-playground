(function taggedFunctionsTest() {
  const tagTest = (...args: any) => {
    let [head, ...tail] = args;
    return [head.map((v: any) => `"${v}"`).join(","), tail.map((v: any) => `"${v}"`).join(",")];
  };

  let world = "world";
  let result = tagTest`hello ${world}!  The current time is ${new Date().toLocaleTimeString()}`;

  console.log("tagged function: ", result);
})();
