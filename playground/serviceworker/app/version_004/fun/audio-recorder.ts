import { merge } from "./merge-audio";

export class AudioRecorder {
    player = document.createElement("audio");

    constructor() {
        this.player.controls = true;
    }

    private async canRecordAudio() {
        const permission = await navigator.permissions.query({ name: 'microphone' });
        switch (permission.state) {
            case "granted":
            case "prompt":
                return true;
            default:
                return false;
        }
        permission.onchange = function () {
        };
    }

    private async canFindDevice() {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioDevices = devices.filter((d) => d.kind === 'audioinput');
        return 0 < audioDevices.length;
    }

    async record(duration = 1000) {
        if (!await this.canRecordAudio()) throw "cannot record audio";
        if (!await this.canFindDevice()) throw "cannot find device";
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        const audio = await this.recordFromStream(mediaStream, duration);
        return merge(...audio);
    }

    private async recordFromStream(stream: MediaStream, duration = 2000) {
        return new Promise<Blob[]>((good, bad) => {
            const options = { mimeType: 'audio/webm' };
            const recordedChunks = [] as Array<Blob>;
            const mediaRecorder = new MediaRecorder(stream, options);

            mediaRecorder.ondataavailable = e => {
                if (e.data.size > 0) {
                    recordedChunks.push(e.data);
                }
            }

            mediaRecorder.onstop = () => {
                good(recordedChunks);
            };
            mediaRecorder.start(0);
            setTimeout(() => mediaRecorder.stop(), duration);
        });

    }

    async playback(audio: Blob) {
        return new Promise((good, bad) => {
            const url = URL.createObjectURL(audio);
            this.player.src = url;
            this.player.play();
            this.player.onended = () => {
                // removes the reference from the internal mapping, thus allowing the Blob to be deleted (if there are no other references), and the memory to be freed.
                URL.revokeObjectURL(url);
                good();
            };

            this.player.onerror = (err) => {
                bad(err);
            }
        });
    }
}