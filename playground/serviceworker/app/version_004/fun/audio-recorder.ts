export class AudioRecorder {
    player = document.createElement("audio");

    constructor() {
        this.player.controls = true;
    }

    async run() {

        const permission = await navigator.permissions.query({ name: 'microphone' });
        switch (permission.state) {
            case "granted":
            case "prompt":
                break;
            default:
                return;
        }
        permission.onchange = function () {

        };

        document.body.appendChild(this.player);

        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioDevices = devices.filter((d) => d.kind === 'audioinput');
        if (!audioDevices.length) return;
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        const url = await this.delay(mediaStream);
        //this.player.srcObject = mediaStream;
        this.player.src = url;
    }

    async delay(stream: MediaStream) {
        return new Promise<string>((good, bad) => {
            const options = { mimeType: 'audio/webm' };
            const recordedChunks = [] as Array<any>;
            const mediaRecorder = new MediaRecorder(stream, options);
            mediaRecorder.ondataavailable = e => {
                if (e.data.size > 0) {
                    recordedChunks.push(e.data);
                }
            }

            mediaRecorder.onstop = () => {
                good(URL.createObjectURL(new Blob(recordedChunks)));
            };
            mediaRecorder.start();
            setTimeout(() => mediaRecorder.stop(), 2000);
        });

    }
}