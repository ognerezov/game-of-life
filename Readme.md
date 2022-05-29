# The game of Life

Typescript implementation of classic zero player game
https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

## Usage
### Installation
    npm install --save ts-game-of-life
### Imports
    import {live} from "ts-game-of-life/dist/game";
    import {Universe,show} from "ts-game-of-life/dist/entities";

### Define your Universe
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
### Calculate state on a next tick
        let next = live(period2Universe1);
### Display results
        show(res);
## Rules
Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

* Any live cell with fewer than two live neighbours dies, as if by underpopulation.
* Any live cell with two or three live neighbours lives on to the next generation.
* Any live cell with more than three live neighbours dies, as if by overpopulation.
* Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
* These rules, which compare the behavior of the automaton to real life, can be condensed into the following:

* Any live cell with two or three live neighbours survives.
* Any dead cell with three live neighbours becomes a live cell.
* All other live cells die in the next generation. Similarly, all other dead cells stay dead.
The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed, live or dead; births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick.