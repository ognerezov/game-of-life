export interface Universe{
    lives : Cell []
    land ?: Land
    tick : number
}

export function show(universe : Universe){
    if (!universe.land){
        return
    }

    console.table(universe.land.land.map(arr=>(
        arr.map(cell =>(cell.alive ? '*' :''))
    )))
}

export function graveyard(universe : Universe) : Universe{
    return {
        lives :[],
        land : {
           bounds : {
               left : 0,
               bottom : 0,
               right : 1,
               top : 1
           }
           , land : [[DEAD,DEAD],[DEAD,DEAD]]
        },
        tick : universe.tick
    }
}

export interface Cell {
    x : number
    y : number
}

export interface CellState{
    alive : boolean
}

export const DEAD : CellState ={
    alive :false
}

export const ALIVE : CellState ={
    alive :true
}

export function getCellAt(x : number, y : number, land : Land) : CellState{
    return land.land[y - land.bounds.bottom][x - land.bounds.left];
}

export function visitNeighbours(cell : Cell, land : Land, fertilization : Map<number,Map<number,number>>):number{
    let count = 0;
    for(let y = Math.max(cell.y-1, land.bounds.bottom); y <= Math.min(cell.y+1, land.bounds.top); y++){
        for(let x = Math.max(cell.x-1, land.bounds.left); x <= Math.min(cell.x+1, land.bounds.right); x++){
            const neighbour = getCellAt(x,y, land)
            count += neighbour.alive ? 1 : 0;
            if(!neighbour.alive){
                let row = fertilization.get(y);
                if (!row) {
                    row = new Map();
                    fertilization.set(y,row);
                }
                const current = row.get(x);
                row.set(x, current ? current + 1 :1)
            }
        }
    }
    return count -1;
}

export interface Bounds{
    left : number
    bottom : number
    right : number
    top : number
}

export interface Land{
    bounds : Bounds
    land : CellState [][]
}
