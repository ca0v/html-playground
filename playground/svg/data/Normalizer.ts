import { DouglasPeuckerReducer } from "./DouglasPeuckerReducer.js";

export type State = {
    displayFieldName: string;
    fieldAliases: {
        objectid: string;
    };
    geometryType: string;
    spatialReference: {
        wkid: number;
        latestWkid: number;
    };
    fields: {
        name: string;
        type: string;
        alias: string;
    }[];
    features: {
        geometry: {
            rings: Array<Array<Array<number>>>;
        };

    }[];
};

type Point = [number, number];

export class Normalizer {

    private normalize(shape: State): Array<Array<Point>> {
        const rings = shape.features.map(f => f.geometry.rings) as Array<Array<Array<Point>>>;
        return rings.flat();
    }

    private scale(path: Array<Array<Point>>) {
        const firstPoint = path[0][0];
        const bbox = { xmin: firstPoint[0], ymin: firstPoint[1], xmax: firstPoint[0], ymax: firstPoint[1] };
        path.forEach(ring => {
            ring.forEach(point => {
                const [x, y] = point;
                bbox.xmin = Math.min(bbox.xmin, x);
                bbox.xmax = Math.max(bbox.xmax, x);
                bbox.ymin = Math.min(bbox.ymin, y);
                bbox.ymax = Math.max(bbox.ymax, y);
            });
        });
        if (0 === this.bboxArea(bbox)) throw "not enough dimensional data to scale, bounding box must contain some area";

        const [dx, dy] = [-bbox.xmin, -bbox.ymin];

        const [sx, sy] = [1.0 / (bbox.xmax - bbox.xmin), 1.0 / (bbox.ymax - bbox.ymin)];
        const scale = Math.min(sx, sy);
        return path.map(ring => {
            return ring.map(point => {
                const [x, y] = point;
                return [scale * (x + dx), 1 - scale * (y + dy)] as Point;
            });
        });
    }

    bboxArea(bbox: { xmin: number; ymin: number; xmax: number; ymax: number; }) {
        const [w, h] = [bbox.xmax - bbox.xmin, bbox.ymax - bbox.ymin];
        return w * h;
    }

    private *asPath(points: Generator<Point>) {
        let p0 = points.next();
        if (p0.done) return;
        yield p0.value;
        while (!p0.done) {
            let v = p0.value;
            p0 = points.next();
            if (p0.done) {
                return;
            }
            yield [p0.value[0] - v[0], p0.value[1] - v[1]] as Point
        }
    }

    private *round(points: Generator<Point>, precision = 3) {
        const scale = Math.pow(10, precision);
        for (let point of points) {
            const [x, y] = point;
            yield [Math.round(x * scale) / scale, Math.round(y * scale) / scale] as Point;
        }
    }

    private asSvgPath(points: Array<Point>) {
        let p0 = points[0];
        let result = `M${p0[0]} ${p0[1]}`;
        for (let i = 1; i < points.length; i++) {
            const [x, y] = points[i];
            result += `l${x} ${y}`;
        }
        result += "z";
        return result;
    }

    private reduce(points: Array<Point>, precision: number) {
        const reducer = new DouglasPeuckerReducer();
        return reducer.reduce(points as Array<[number, number]>, precision);
    }

    public process(shape: State) {
        const paths = this.scale(this.normalize(shape));
        const deltaPaths = paths.map(path => {
            const reducedPath = this.reduce(path, 0.0001);
            return this.asPath(reducedPath);
        });
        const svgPaths = deltaPaths.map(path => {
            const d = this.asSvgPath([...this.round(path, 4)]);
            return `<path d="${d}"/>`;
        });
        return svgPaths.join("\n");
    }
}


