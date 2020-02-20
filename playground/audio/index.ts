async function record() {
    const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new AudioContext();
    audioContext.addEventListener("statechange", ev => {
    });

    const track = audioContext.createMediaStreamSource(mediaStream);
    const delayFilter = audioContext.createDelay(1000);
    track.connect(delayFilter).connect(audioContext.destination);

    const mediaRecorder = new MediaRecorder(mediaStream, { mimeType: "audio/webm" });
    
    mediaRecorder.start();
    setTimeout(() => {
        mediaRecorder.stop();
    }, 5000);

    mediaRecorder.addEventListener("dataavailable", async e => {
        const url = await e.data.text();
        console.log(url.length);
    });
}

record();