function dispatchEventTest() {
  function dispatch<T>(type: string, data: T) {
    const event: CustomEvent<T> = document.createEvent("CustomEvent");
    event.initCustomEvent(type, false, false, data);
    return document.dispatchEvent(event);
  }

  document.addEventListener("clock", () => {
    console.log("clock ticked");
  });

  let h = setInterval(() => {
    clearInterval(h);
    console.log("tick");
    let handled = dispatch("clock", { value: "checked" });
    if (!handled) console.error("clock not handled");
  }, 1000);
}

dispatchEventTest();
