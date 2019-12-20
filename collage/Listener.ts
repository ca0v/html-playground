import { Dictionary } from "./Dictionary";
/**
 * Google speech recognition
 */
export class Listener {
  recognition: SpeechRecognition;
  stopped: boolean = true;
  autostart: boolean = true;
  constructor() {
    this.recognition = new (<any>window)["webkitSpeechRecognition"]();
    let recognition = this.recognition;
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.lang = "en-PH";
    recognition.maxAlternatives = 5;
    recognition.addEventListener("start", e => {
      this.stopped = false;
    });
    recognition.addEventListener("end", e => {
      this.stopped = false;
      if (this.autostart)
        recognition.start();
    });
    recognition.addEventListener("result", e => {
      for (let i = 0; i < e.results.length; i++) {
        let result = e.results[i];
        if (result.isFinal) {
          for (let j = 0; j < result.length; j++) {
            let transcript = result[j].transcript;
            console.log(transcript, result[j]);
            let confidence = result[j].confidence;
            this.trigger("speech-detected", {
              result: transcript,
              power: confidence * 100
            });
            return;
          }
        }
      }
    });
  }
  private _callbacks: Dictionary<Array<(value: {
    result: string;
    power: number;
  }) => void>> = {};
  private callbacks(topic: string) {
    return this._callbacks[topic] = this._callbacks[topic] ?? [];
  }
  on(topic: string, cb: (value: {
    result: string;
    power: number;
  }) => void) {
    this.callbacks(topic).push(cb);
  }
  trigger(topic: string, value: {
    result: string;
    power: number;
  }) {
    this.callbacks(topic).forEach(cb => cb(value));
  }
  listen() {
    if (this.stopped)
      this.recognition.start();
  }
}
