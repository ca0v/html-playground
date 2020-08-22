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
        let result = [] as Array<Array<Point>>;
        rings.forEach(r => { result = result.concat(r) });
        return result;
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
        console.log(bbox);
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

    private asPath(points: Array<Point>) {
        let p0: null | number[] = null;
        return points.map(p1 => {
            if (null === p0) {
                p0 = p1;
                return p1;
            }
            const result = [p1[0] - p0[0], p1[1] - p0[1]] as Point;
            p0 = p1;
            return result;
        });
    }

    private round(points: Array<Point>, precision = 3) {
        const scale = Math.pow(10, precision);
        return points.map(point => {
            const [x, y] = point;
            return [Math.round(x * scale) / scale, Math.round(y * scale) / scale] as Point;
        });
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
        let savings = { before: 0, after: 0 };
        const deltaPaths = paths.map(path => {
            const reducedPath = this.reduce(path, 0.005);
            savings.before += path.reduce((a, b) => a + b.length, 0);
            savings.after += reducedPath.reduce((a, b) => a + b.length, 0);
            return this.asPath(reducedPath);
        });
        console.log(savings, Math.round(100 * (savings.before / savings.after - 1)));
        const svgPaths = deltaPaths.map(path => {
            const d = this.asSvgPath(this.round(path, 5));
            return `<path d="${d}"/>`;
        });
        return svgPaths.join("\n");
    }
}


