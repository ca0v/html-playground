import { DbStore } from "./fun/index";

class DebugStore extends DbStore<{
  name: string;
  state: string;
}> { }

function debounce<T extends Function>(cb: T, wait = 20) {
  let h = 0;
  let callable = (...args: any) => {
    clearTimeout(h);
    h = setTimeout(() => cb(...args), wait);
  };
  return <T>(<any>callable);
}

export async function run() {
  const notebook = document.getElementById("notebook") as HTMLTextAreaElement;
  const database = "notebook";
  const db = new DebugStore(database);
  await db.init();
  const data = await db.get("notes");
  notebook.value = data?.state || "";
  const save = () => {
    db.put("notes", { name: "notes", state: notebook.value });
  };
  notebook.addEventListener("input", debounce(save));

  const channel = new MessageChannel();
  channel.port1.onmessage = async event => {
    const { database } = event.data;
    const db = new DebugStore(database);
    await db.init();

    ["APP_VERSION", "activate", "install", "fetchFromCacheFirst"].forEach(async name => {
      const data = await db.get(name);
      const status = document.querySelector(`.${name}`) as HTMLElement;
      if (!status) return;
      status.innerText = data?.state || "";
    });

  };
  navigator.serviceWorker?.controller?.postMessage({ command: "version" }, [channel.port2]);

  const positionStatus = document.querySelector(".altitude") as HTMLLabelElement;
  if (positionStatus) {
    navigator.geolocation.getCurrentPosition(position => {
      const c = position.coords;
      positionStatus.innerText = `${c.altitude} ${c.longitude},${c.latitude}`;
    });
  }
}