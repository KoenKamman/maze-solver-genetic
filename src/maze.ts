import { CellTypes } from "./enums";

export default class Maze {
    private maze: CellTypes[][] = [];
    private start: number[] = [];
    private end: number[] = [];
    private requiredSteps: number;

    constructor(width: number, height: number, mapData: Map<number[], CellTypes>, requiredSteps: number) {
        this.initMaze(width, height, mapData);
        this.requiredSteps = requiredSteps;
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
            if (cellType === CellTypes.START) {
                this.start = position;
            } else if (cellType === CellTypes.END) {
                this.end = position;
            }
            this.maze[position[0]][position[1]] = cellType;
        });
    }

    public getStart(): number[] {
        return this.start;
    }

    public getEnd(): number[] {
        return this.end;
    }

    public getCell(cell: number[]): CellTypes {
        return this.maze[cell[0]][cell[1]];
    }

    public setCell(cell: number[], type: CellTypes): void {
        this.maze[cell[0]][cell[1]] = type;
    }

    public getRequiredSteps(): number {
        return this.requiredSteps;
    }

    public toString(): string {
        const characters = new Map<CellTypes, string>([
            [CellTypes.OPEN, " "],
            [CellTypes.CLOSED, "▫"],
            [CellTypes.START, "S"],
            [CellTypes.END, "E"],
            [CellTypes.EXPLORED, "■"]
        ]);

        let output = "";
        for (let i = 0; i < this.maze.length; i++) {
            for (let j = 0; j < this.maze[i].length; j++) {
                output += characters.get(this.maze[i][j]) + " ";
            }
            output += "\n";
        }
        return output;
    }
}