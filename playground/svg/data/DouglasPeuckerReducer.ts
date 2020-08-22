type Point = [number, number];

export class DouglasPeuckerReducer {

    private distance(point1: Point, point2: Point) {
        return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2));
    }

    // probably works on mostly straight lines but not good for closed polygons
    // because distance from 1st/last point is critical
    ramerDouglasPeucker<T extends Point>(l: Array<T>, eps: number): Array<T> {
        const last = l.length - 1;
        const [p1x, p1y] = l[0];
        const [p2x, p2y] = l[last];
        const x21 = p2x - p1x;
        const y21 = p2y - p1y;

        const [dMax, x] = l.slice(1, last)
            .map(p => Math.abs(y21 * p[0] - x21 * p[1] + p2x * p1y - p2y * p1x))
            .reduce((p, c, i) => {
                const v = Math.max(p[0], c);
                return [v, v === p[0] ? p[1] : i + 1];
            }, [-1, 0]);

        if (dMax > eps) {
            return [...this.ramerDouglasPeucker(l.slice(0, x + 1), eps), ...this.ramerDouglasPeucker(l.slice(x), eps).slice(1)];
        }
        return [l[0], l[last]];
    };

    /**
     * 
     * @param coordinate list of points to simplify
     * @param delta maximum length difference before selecting a point 
     */
    private *alixPolylineSimplification(coordinate: Point[], delta: number) {
        if (coordinate.length < 3 || delta <= 0)
            return coordinate;

        const end = coordinate.length - 1;
        yield coordinate[0];
        let i = 1;
        let k = 0;
        while (i < end) {
            let d = this.distance(coordinate[i - 1], coordinate[i]);
            while (i < end && d - delta < this.distance(coordinate[k], coordinate[i])) {
                i++;
                d += this.distance(coordinate[i - 1], coordinate[i]);
            }
            k = i - 1;
            yield coordinate[k];
        }
        yield coordinate[end];
    };

    public reduce(points: Array<Point>, precision: number) {
        //return this.ramerDouglasPeucker(points, precision);
        const stream = this.alixPolylineSimplification(points, precision);
        const result = [] as Point[];
        while (true) {
            const point = stream.next();
            if (point.done) break;
            result.push(point.value);
        }
        return result;
    }
}
