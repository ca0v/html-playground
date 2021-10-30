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
  state: Blob | null;
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
  const buttons = "record,append,concatinate,play,clear".split(",").map(key => document.querySelector(`.${key}-audio`) as HTMLButtonElement)
  const [recorderButton, appendButton, concatButton, playButton, clearButton] = buttons;

  clearButton?.addEventListener("click", async () => {
    await audioLog.put("audio-2", { name: "audio-2", state: null });
  });

  playButton?.addEventListener("click", async () => {
    let fullAudio = (await audioLog.get("audio-2"))?.state;
    if (!fullAudio) return;
    playButton.classList.add("playing");
    log("playback recording");
    await recorder.playback(fullAudio);
    log("end playback");
    playButton.classList.remove("playing");
  });

  recorderButton?.addEventListener("click", async () => {
    log("begin record/playback loop of a 3 second clips");
    looping = true;

    // playback prior recording
    const priorAudio = await audioLog.get("audio-1");
    if (priorAudio?.state) {
      recorderButton.classList.add("playing");
      await recorder.playback(priorAudio.state);
      recorderButton.classList.remove("playing");
    }

    // record for 3 seconds, store clip into audio-1, playback, repeat
    while (looping) {
      recorderButton.classList.add("recording");
      log("begin recording 3 second clip...");
      const audio = await recorder.record(3000);
      log("end recording");
      recorderButton.classList.remove("recording");
      if (audio) {
        audioLog.put("audio-1", { name: "audio-1", state: <any>audio });
        recorderButton.classList.add("playing");
        log("playback recording");
        await recorder.playback(audio);
        log("end playback");
        recorderButton.classList.remove("playing");
      }
    }
  });

  appendButton?.addEventListener("click", async () => {
    log("capture the current track");
    const priorAudio = await audioLog.get("audio-1");
    const tracks = parseInt((await noteLog.get("track-count"))?.state || "0");
    if (priorAudio?.state) {
      audioLog.put(`track-${tracks + 1}`, { name: "track", state: priorAudio.state });
      noteLog.put("track-count", { name: "track-count", state: tracks + 1 + "" });
    }
    appendButton.innerText = tracks + "";
  });

  concatButton?.addEventListener("click", async () => {
    log("stop the record/playback loop");
    looping = false;
    const tracks = parseInt((await noteLog.get("track-count"))?.state || "0");
    noteLog.put("track-count", { name: "track-count", state: "0" });
    let fullAudio = (await audioLog.get("audio-2"))?.state;
    log("construct the full audio sample for all captured tracks");
    for (let i = 1; i <= tracks; i++) {
      const blobs = (await audioLog.get(`track-${i}`)).state;
      if (blobs) {
        fullAudio = fullAudio ? merge(fullAudio, blobs) : merge(blobs);
      }
    }

    if (fullAudio) {
      log("playback the fully captured audio");
      await recorder.playback(fullAudio);
      log("save the full audio");
      await audioLog.put("audio-2", { name: "audio-2", state: fullAudio });
    }
  });

}

function log(message: string) {
  console.log(message);
  const statusArea = document.querySelector(".status-area") as HTMLDivElement;
  if (statusArea) statusArea.innerText = message;
}
