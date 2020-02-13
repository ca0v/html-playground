self.addEventListener("load", async () => {
  const reg = await navigator.serviceWorker.register("../worker.js");
  console.log(reg);
});

function log(message: string) {
  const dom = document.createElement("div");
  dom.innerHTML = message;
  document.body.appendChild(dom);
}

log("version 7");

const channel = new MessageChannel();
channel.port1.addEventListener("message", event => {
  log(`response from worker: ${event.data}`);
});

navigator.serviceWorker.onmessage = event => {
  log(`broadcast from worker: ${event.data}`);
};

navigator.serviceWorker.controller!.postMessage({ command: "version" }, [channel.port2]);
