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
        if (!await this.canRecordAudio()) return;
        if (!await this.canFindDevice()) return;
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        return this.recordFromStream(mediaStream, duration);
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

    async playback(audioData: any) {
        return new Promise((good, bad) => {
            const data: Blob = audioData.type ? audioData : new Blob(audioData);
            const url = URL.createObjectURL(data);
            this.player.src = url;
            this.player.play();
            this.player.onended = async () => {
                good();
                // removes the reference from the internal mapping, thus allowing the Blob to be deleted (if there are no other references), and the memory to be freed.
                URL.revokeObjectURL(url);

                // write out the audio as base64 so use as product resource
                if (0) {
                    let reader = new FileReader();
                    reader.readAsDataURL(data); // converts the blob to base64 and calls onload
                    reader.onload = () => {
                        console.log(reader.result);
                    };
                }
            }
        });
    }
}