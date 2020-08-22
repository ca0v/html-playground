import { describe, it } from "mocha";
import { assert } from "chai";
import { DouglasPeuckerReducer } from "../data/DouglasPeuckerReducer";
import { state as sc } from "../data/sc";

describe("DouglasPeuckerReducer", () => {
    it("reduce", () => {
        const reducer = new DouglasPeuckerReducer();
        const result = reducer.reduce([[0, 0], [1, 0], [2.1, 0.1], [3.1, 0.1], [4, 0], [5, 0], [6, 0]], 0.2);
        console.log(result);
        assert.equal(result.length, 3);
    });

    it("reduce sc", () => {
        const reducer = new DouglasPeuckerReducer();
        const points = sc.features[0].geometry.rings.map(ring => {
            const result = reducer.reduce(<Array<[number, number]>>ring, 0.005);
            console.log(ring.length, result.length);
            return result;
        })
        console.log(JSON.stringify(points));
    })
})