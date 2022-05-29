import {live} from "../src/game";
import {show} from "../src/entities";
import {Universe} from "../src/entities";

const universe1 : Universe ={
    lives : [
        {
            x : -3,
            y : -5,
        },
        {
            x : 3,
            y : 5
        }

    ],
    tick : 0
}
const universe2 : Universe ={
    lives : [
        {
            x : -3,
            y : -5,
        },
        {
            x : 0,
            y : 0,
        },
        {
            x : 3,
            y : 5
        }

    ],
    tick : 0
}

const stableUniverse1 = {
    lives : [
        {
            x : 0,
            y : 0,
        },
        {
            x : 0,
            y : 1,
        },
        {
            x : 1,
            y : 0
        }
        ,
        {
            x : 1,
            y : 1
        }

    ],
    tick : 0
}

const stableUniverse2 = {
    lives : [
        {
            x : 0,
            y : 1,
        },
        {
            x : 1,
            y : 0,
        },
        {
            x : 1,
            y : 2
        }
        ,
        {
            x : 2,
            y : 1
        }

    ],
    tick : 0
}

const period2Universe1 = {
    lives : [
        {
            x : 0,
            y : -1,
        },
        {
            x : 0,
            y : 0,
        },
        {
            x : 0,
            y : 1
        }

    ],
    tick : 0
}

const period2Universe2 = {
    lives : [
        {
            x : 2,
            y : 0,
        },
        {
            x : 3,
            y : 0,
        },
        {
            x : 2,
            y : 1
        },
        {
            x : 3,
            y : 1
        },

        {
            x : 0,
            y : 2,
        },
        {
            x : 0,
            y : 3,
        },
        {
            x : 1,
            y : 2
        },
        {
            x : 1,
            y : 3
        }

    ],
    tick : 0
}


describe("test init", () => {
    it("test init land and tick", () => {
        const res = live(universe2);
        show(res);
        expect(res.tick).toBe(1);
        expect(res.land.bounds.bottom).toBe(0);
        expect(res.land.bounds.right).toBe(1);
        expect(res.land.bounds.left).toBe(0);
        expect(res.land.bounds.top).toBe(1);
    });
});

describe("test min lives", () => {
    it("kill everybody if lives <3", () => {
        const res = live(universe1);
        show(res);
        expect(res.lives.length).toBe(0);
    });
});

describe("test stable universes", () => {
    it("check if stable fields stay with the same live count and field", () => {
        let res = live(stableUniverse1);
        show(res);
        expect(res.lives.length).toBe(4);

        res = live(res)
        show(res);
        expect(res.lives.length).toBe(4);

        res = live(stableUniverse2)
        show(res);
        expect(res.lives.length).toBe(4);

        res = live(res)
        show(res);
        expect(res.lives.length).toBe(4);
    });
});

describe("test period universes", () => {
    it("check if changing fields working properly", () => {
        let res = live(period2Universe1);
        show(res);
        expect(res.lives.length).toBe(3);

        res = live(res)
        show(res);
        expect(res.lives.length).toBe(3);

        res = live(res)
        show(res);
        expect(res.lives.length).toBe(3);

        res = live(period2Universe2);
        show(res);
        expect(res.lives.length).toBe(6);

        res = live(res)
        show(res);
        expect(res.lives.length).toBe(8);

        res = live(res)
        show(res);
        expect(res.lives.length).toBe(6);

    });
});