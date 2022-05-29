import {
    ALIVE,
    Bounds,
    graveyard,
    Land,
    Cell,
    Universe,
    CellState,
    DEAD,
    visitNeighbours,
} from "./entities";

export function live(universe : Universe) : Universe{
    universe.tick ++;

    if (universe.lives.length <= 2){
        return graveyard(universe);
    }
    universe.land = universe.land || createLand(universe.lives);
    universe.lives = survive(universe)
    if (universe.lives.length <= 2){
        return graveyard(universe);
    }
    universe.land = createLand(universe.lives)
    return universe
}

function getBounds(lives: Cell[]) : Bounds{
    let left = Number.MAX_SAFE_INTEGER;
    let bottom = Number.MAX_SAFE_INTEGER;
    let right = Number.MIN_SAFE_INTEGER;
    let top = Number.MIN_SAFE_INTEGER;

    for(let live of lives){
        left = Math.min(left,live.x)
        right = Math.max(right,live.x)
        bottom = Math.min(bottom,live.y)
        top = Math.max(top,live.y)
    }

    return expand({
        left,
        bottom,
        right,
        top
    });
}

export function expand(bounds: Bounds) {
    return {
        left : bounds.left - 1,
        bottom : bounds.bottom - 1,
        right : bounds.right + 1,
        top : bounds.top + 1
    };
}

export function survive(universe : Universe) :Cell[]{
    const newLives : Cell[] = []
    const fertilization : Map<number,Map<number,number>> = new Map();

    for(let live of universe.lives){
        const neighbours = visitNeighbours(live,universe.land,fertilization)
        if(neighbours === 2 || neighbours ===3){
            newLives.push(live)
        }
    }

    for(let y of fertilization.keys()){
        for(let x of fertilization.get(y).keys()){
            if(fertilization.get(y).get(x) ===3){
                newLives.push({
                    x,y
                })
            }
        }
    }

    return newLives;
}

export function createLand(lives: Cell[]) : Land{
    const res : Land = {
        bounds : getBounds(lives),
        land : []
    }

    const length = res.bounds.right - res.bounds.left + 1;
    for(let i = res.bounds.bottom; i <= res.bounds.top; i++){
        const row = new Array<CellState>(length).fill(DEAD)
        res.land.push(row)
    }

    for(let live of lives){
        const x : number = live.x - res.bounds.left;
        const y : number = live.y - res.bounds.bottom;
        res.land[y][x] = ALIVE;
    }

    return res;
}