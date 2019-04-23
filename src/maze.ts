import logUpdate from "log-update";
import { CellTypes } from "./cellTypes";

export class Maze {
    private maze: CellTypes[][] = [];

    constructor(width: number, height: number, mapData: Map<number[], CellTypes>) {
        this.initMaze(width, height, mapData);
    }

    private initMaze(width: number, height: number, mapData: Map<number[], CellTypes>): void {
        // Fill grid with cells
        for (let i = 0; i < height; i++) {
            this.maze[i] = [];
            for (let j = 0; j < width; j++) {
                let cellType: CellTypes;
                if (i === 0 || i === height - 1 || j === 0 || j === width - 1) {
                    cellType = CellTypes.CLOSED;
                } else {
                    cellType = CellTypes.OPEN;
                }
                this.maze[i][j] = cellType;
            }
        }

        // Draw maze
        mapData.forEach((cellType, position) => {
            this.maze[position[0]][position[1]] = cellType;
        });
    }

    public print() {
        const characters = new Map<CellTypes, string>([
            [CellTypes.OPEN, " "],
            [CellTypes.CLOSED, "■"],
            [CellTypes.START, "▢"],
            [CellTypes.END, "▣"]
        ]);

        let output = "";
        for (let i = 0; i < this.maze.length; i++) {
            for (let j = 0; j < this.maze[i].length; j++) {
                output += characters.get(this.maze[i][j]) + " ";
            }
            output += "\n";
        }
        logUpdate(output);
    }
}