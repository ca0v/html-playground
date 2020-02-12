self.addEventListener("load", async () => {
  const reg = await navigator.serviceWorker.register("../worker.js");
  console.log(reg);
});

console.log("version 1");
