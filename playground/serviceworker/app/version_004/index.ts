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
  const appendButton = document.querySelector(".append-audio") as HTMLButtonElement;
  const concatButton = document.querySelector(".concatinate-audio") as HTMLButtonElement;

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

  appendButton?.addEventListener("click", async () => {
    const priorAudio = await db.get("audio-1");
    const tracks = parseInt((await db.get("track-count"))?.state || "0");
    db.put(`track-${tracks + 1}`, { name: "track", state: priorAudio.state });
    db.put("track-count", { name: "track-count", state: tracks + 1 + "" });
    appendButton.innerText = tracks + "";
  });

  concatButton?.addEventListener("click", async () => {
    looping = false;
    const tracks = parseInt((await db.get("track-count"))?.state || "0");
    db.put("track-count", { name: "track-count", state: "0" });
    let fullAudio = new Blob();
    for (let i = 1; i <= tracks; i++) {
      const blobs = (await db.get(`track-${i}`)).state as any as Blob[];
      fullAudio = new Blob([fullAudio, ...blobs], { type: "audio/webm" });
    }
    const targetAudio = (await db.get("audio-2"))?.state as any as Blob;
    if (targetAudio) {
      fullAudio = new Blob([fullAudio, targetAudio], { type: "audio/webm" });
    }
    await recorder.playback(fullAudio);
    await db.put("audio-2", { name: "audio-2", state: <any>fullAudio });
  })

}