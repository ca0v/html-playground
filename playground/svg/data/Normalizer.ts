import { state } from "./sc";

export class Normalizer {
    private normalize(shape: typeof state): { paths: number[][][]; } {
        const firstFeature = shape.features[0];
        const firstPoint = firstFeature.geometry.rings[0][0];
        const bbox = { xmin: firstPoint[0], ymin: firstPoint[1], xmax: firstPoint[0], ymax: firstPoint[1] };
        shape.features.forEach(f => {
            f.geometry.rings.forEach(ring => {
                ring.forEach(point => {
                    const [x, y] = point;
                    bbox.xmin = Math.min(bbox.xmin, x);
                    bbox.xmax = Math.max(bbox.xmax, x);
                    bbox.ymin = Math.min(bbox.ymin, y);
                    bbox.ymax = Math.max(bbox.ymax, y);
                });
            });
        });
        console.log(bbox);
        const [dx, dy] = [-bbox.xmin, -bbox.ymin];
        const [sx, sy] = [1.0 / (bbox.xmax - bbox.xmin), 1.0 / (bbox.ymax - bbox.ymin)];
        const scale = Math.min(sx, sy);
        const paths = firstFeature.geometry.rings.map(ring => {
            return ring.map(point => {
                const [x, y] = point;
                return [scale * (x + dx), 1 - scale * (y + dy)];
            });
        });

        return { paths };
    }


    private asPath(points: number[][]) {
        let p0: null | number[] = null;
        return points.map(p1 => {
            if (null === p0) {
                p0 = p1;
                return p1;
            }
            const result = [p1[0] - p0[0], p1[1] - p0[1]];
            p0 = p1;
            return result;
        });
    }


    private simplify(points: number[][], precision = 3) {
        const scale = Math.pow(10, precision);
        return points.map(point => {
            const [x, y] = point;
            return [Math.round(x * scale) / scale, Math.round(y * scale) / scale];
        });
    }


    private asSvgPath(points: number[][]) {
        let p0 = points[0];
        let result = `M${p0[0]} ${p0[1]}`;
        for (let i = 1; i < points.length; i++) {
            const [x, y] = points[i];
            result += `l${x} ${y}`;
        }
        result += "z";
        return result;
    }


    public process(shape: typeof sc) {
        const paths = this.normalize(shape);
        console.log(paths);
        const deltaPaths = paths.paths.map(path => this.asPath(path));
        const svgPaths = deltaPaths.map(path => {
            const d = this.asSvgPath(this.simplify(path, 5));
            return `<path d="${d}"/>`;
        });
        return svgPaths.join("\n");
    }
}
