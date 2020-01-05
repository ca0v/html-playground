(async function () {

    async function sleep(duration: number) {
        return new Promise((good, bad) => {
            setTimeout(good, duration);
        });
    }

    function range(size: number) {
        return Array(size).fill(0);
    }

    function shuffle(array: Array<any>) {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            let temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function setPixel(ctx: CanvasRenderingContext2D, x: number, y: number, pixel: Uint8ClampedArray) {
        let [r, g, b, a] = pixel;
        ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + (a / 255) + ')';
        ctx.fillRect(x, y, 1, 1);
    }

    const image = document.querySelector(".image") as HTMLImageElement;
    const { width, height } = image.getBoundingClientRect();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    if (!ctx) throw "cannot create 2d context";

    ctx.drawImage(image, 0, 0);
    let imageData = ctx.getImageData(0, 0, width, height);
    console.log(imageData);
    ctx.clearRect(0, 0, width, height);
    document.body.appendChild(canvas);

    let { data } = imageData;
    let columns = range(width).map((v, i) => i);
    columns = shuffle(columns);

    let colorFilter = [255, 255, 255, 255];

    for (let i = 0; i < width; i++) {
        let x = columns[i];
        await sleep(0);
        for (let y = 0; y < height; y++) {
            let index = (x + y * width) * 4;
            let currentColor = ctx.getImageData(x, y, 1, 1).data;
            let pixel = data.slice(index, index + 4)
                .map((v, i) => {
                    let result = Math.min(v, currentColor[i] + colorFilter[i]);
                    return result;
                });
            setPixel(ctx, x, y, pixel);
        }
    };
})();