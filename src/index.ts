import logUpdate from "log-update";
import { CellTypes } from "./cellTypes";
import { maze1 } from "./mazes/maze1";

const MAZE_WIDTH = 18;
const MAZE_HEIGHT = 16;
const MAZE_FILE = maze1;

let maze: CellTypes[][] = [];

initMaze();
printMaze();

function initMaze(): void {
    // Fill grid with cells
    for (let i = 0; i < MAZE_HEIGHT; i++) {
        maze[i] = [];
        for (let j = 0; j < MAZE_WIDTH; j++) {
            let cellType: CellTypes;
            if (i === 0 || i === MAZE_HEIGHT - 1 || j === 0 || j === MAZE_WIDTH - 1) {
                cellType = CellTypes.CLOSED;
            } else {
                cellType = CellTypes.OPEN;
            }
            maze[i][j] = cellType;
        }
    }

    // Draw maze
    MAZE_FILE.forEach((cellType, position) => {
        maze[position[0]][position[1]] = cellType;
    })
}

function printMaze(): void {
    const characters = new Map<CellTypes, string>([
        [CellTypes.OPEN, " "],
        [CellTypes.CLOSED, "■"],
        [CellTypes.START, "▢"],
        [CellTypes.END, "▣"]
    ]);

    let output = "";
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            output += characters.get(maze[i][j]) + " ";
        }
        output += "\n";
    }
    logUpdate(output);
}