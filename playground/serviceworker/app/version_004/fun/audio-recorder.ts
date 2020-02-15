export class AudioRecorder {
    player = document.createElement("audio");

    constructor() {
        this.player.controls = true;
    }

    async run() {
        document.body.appendChild(this.player);

        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioDevices = devices.filter((d) => d.kind === 'audioinput');
        if (!audioDevices.length) return;
        const audio = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        this.player.srcObject = audio;
    }
}