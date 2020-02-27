import { DbStore } from "../fun/index";
import { AudioRecorder } from "../fun/audio-recorder";
import { merge } from "../fun/merge-audio";

const recorder = new AudioRecorder();

class NotebookStore extends DbStore<{
  name: string;
  state: string;
}> { }

class AudioStore extends DbStore<{
  name: string;
  state: Blob;
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
  const noteLog = new NotebookStore("notebook");
  await noteLog.init();
  const data = await noteLog.get("notes");
  notebook.value = data?.state || "";

  const audioLog = new AudioStore("audio");
  await audioLog.init();

  const save = () => {
    noteLog.put("notes", { name: "notes", state: notebook.value });
  };
  notebook.addEventListener("input", debounce(save, 500));

  let looping = false;
  const recorderButton = document.querySelector(".record-audio") as HTMLButtonElement;
  const appendButton = document.querySelector(".append-audio") as HTMLButtonElement;
  const concatButton = document.querySelector(".concatinate-audio") as HTMLButtonElement;

  recorderButton?.addEventListener("click", async () => {
    looping = !looping;
    const priorAudio = await audioLog.get("audio-1");
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
        audioLog.put("audio-1", { name: "audio-1", state: <any>audio });
        recorderButton.classList.add("playing");
        await recorder.playback(audio);
        recorderButton.classList.remove("playing");
      }
    }
  });

  appendButton?.addEventListener("click", async () => {
    const priorAudio = await audioLog.get("audio-1");
    const tracks = parseInt((await noteLog.get("track-count"))?.state || "0");
    audioLog.put(`track-${tracks + 1}`, { name: "track", state: priorAudio.state });
    noteLog.put("track-count", { name: "track-count", state: tracks + 1 + "" });
    appendButton.innerText = tracks + "";
  });

  concatButton?.addEventListener("click", async () => {
    looping = false;
    const tracks = parseInt((await noteLog.get("track-count"))?.state || "0");
    noteLog.put("track-count", { name: "track-count", state: "0" });
    let fullAudio = (await audioLog.get("audio-2"))?.state;
    for (let i = 1; i <= tracks; i++) {
      const blobs = (await audioLog.get(`track-${i}`)).state;
      fullAudio = fullAudio ? merge(fullAudio, blobs) : merge(blobs);
    }

    await recorder.playback(fullAudio);
    await audioLog.put("audio-2", { name: "audio-2", state: fullAudio });
  })

}