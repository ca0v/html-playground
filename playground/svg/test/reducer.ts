import { describe, it } from "mocha";
import { assert } from "chai";
import { DouglasPeuckerReducer, Point } from "../data/DouglasPeuckerReducer";
import { state as sc } from "../data/sc";

import { Normalizer, State } from "../data/Normalizer";

function range(r: number) {
    return Array(r).fill(0).map((v, i) => i);
}

describe("DouglasPeuckerReducer", () => {
    it("reduce", () => {
        const reducer = new DouglasPeuckerReducer();
        let points = [[0, 0], [1, 0], [2.1, 0.1], [3.1, 0.1], [4, 0], [5, 0], [6, 0]] as Point[];
        let result = [...reducer.reduce(points, 0.2)];
        assert.equal(result.length, 2);

        points = [[0, 0.5], [10, 9.5], [20, 20.5], [30, 29.5], [40, 40.5], [50, 49.5], [60, 60.5], [70, 69.5], [80, 80.5], [90, 89.5]];
        result = [...reducer.reduce(points, 0.1)];
        assert.deepEqual([[0, 0.5], [50, 49.5], [90, 89.5]], result);

        points = [[0, 0.5], [1, 9.5], [2, 20.5], [3, 29.5], [4, 40.5], [5, 49.5], [6, 60.5], [7, 69.5], [8, 80.5], [9, 89.5]];
        result = [...reducer.reduce(points, 0.1)];
        assert.deepEqual([[0, 0.5], [9, 89.5]], result);
    });

    it("reduce sc", () => {
        const reducer = new DouglasPeuckerReducer();
        const savings = { before: 0, after: 0 };
        sc.features[0].geometry.rings.forEach(ring => {
            const result = [...reducer.reduce(<Array<[number, number]>>ring, 0.01)];
            savings.before += ring.length;
            savings.after += result.length;
            return result;
        });
        assert.equal(248, savings.before);
        assert.equal(116, savings.after);
    });
});

describe("SVG Utilities", () => {
    it("process a shape", () => {
        const svgUtil = new Normalizer();
        const state = {} as State;
        state.features = [{
            geometry: {
                rings: [[[0, 0]]]
            }
        }];
        assert.throws(() => svgUtil.process(state));
        const rings = state.features[0].geometry.rings;

        rings[0] = [[0, 0], [1, 1]];
        assert.equal('<path d="M0 1l1 -1z"/>', svgUtil.process(state));

        rings[0] = [[0, 0], [10000, 10000]];
        assert.equal('<path d="M0 1l1 -1z"/>', svgUtil.process(state));

        rings[0] = [[0, 0], [10, 10000]];
        assert.equal('<path d="M0 1l0.001 -1z"/>', svgUtil.process(state));

        rings[0] = [[0, 0], [1, 10], [2, 20], [10, 100]];
        assert.equal('<path d="M0 1l0.1 -1z"/>', svgUtil.process(state));

        rings[0] = [[0, 0], [1, 10], [55, 50], [9, 90], [10, 100]];
        assert.equal('<path d="M0 1l0.01 -0.1l0.54 -0.4l-0.45 -0.5z"/>', svgUtil.process(state));

        rings[0] = [[0, 0], [1, 10], [2, 20], [10, 100]];
        assert.equal('<path d="M0 1l0.1 -1z"/>', svgUtil.process(state));

        rings[0] = [[0, 0], [1, 0], [1, 1], [1, 0], [0, 0]];
        assert.equal('<path d="M0 1l1 0l0 -1l-1 1z"/>', svgUtil.process(state));
    });
})