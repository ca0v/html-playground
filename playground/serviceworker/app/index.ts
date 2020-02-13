self.addEventListener("load", async () => {
  const reg = await navigator.serviceWorker.register("../worker.js");
  console.log(reg);
});

const dom = document.createElement("div");
dom.innerHTML = "version 3";
document.body.appendChild(dom);
