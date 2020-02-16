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
  notebook.addEventListener("input", debounce(save, 500));

  let looping = false;
  const recorderButton = document.querySelector(".record-audio") as HTMLButtonElement;
  recorderButton?.addEventListener("click", async () => {
    looping = !looping;
    const priorAudio = await db.get("audio-1");
    if (priorAudio) {
      recorderButton.classList.add("playing");
      await recorder.playback(<any>priorAudio.state);
      recorderButton.classList.remove("playing");
    }

    while (looping) {
      recorderButton.classList.add("recording");
      const audio = await recorder.record(3000);
      recorderButton.classList.remove("recording");
      if (audio) {
        db.put("audio-1", { name: "audio-1", state: <any>audio });
        recorderButton.classList.add("playing");
        await recorder.playback(audio);
        recorderButton.classList.remove("playing");
      }
    }
  });

}