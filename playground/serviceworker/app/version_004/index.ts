import { DbStore } from "../fun/index";
import { AudioRecorder } from "./fun/audio-recorder";

const recorder = new AudioRecorder();

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
  notebook.addEventListener("keypress", debounce(save));

  const recorderButton = document.querySelector(".record-audio") as HTMLButtonElement;
  recorderButton?.addEventListener("click", () => {
    recorder.run();
  });
  
}