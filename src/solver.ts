import logUpdate from "log-update";
import Maze from "./maze";
import clone from "clone";
import { Moves, CellTypes } from "./enums";
import Util from "./util";

export default class Solver {
    private static counter: number;
    private id: number;
    private generation: number;
    private maze: Maze;
    private fitness: number;
    private moveList: Moves[];
    private steps: number;

    public constructor(maze: Maze, steps: number, generation: number, moveList?: Moves[]) {
        Solver.counter = Solver.counter ? Solver.counter + 1 : 1;
        this.id = Solver.counter;
        this.maze = clone(maze);
        this.fitness = 0;
        this.moveList = [];
        this.steps = steps;
        this.generation = generation;
        this.moveList = moveList ? moveList : [];
    }

    public solve(): boolean {
        let currentPosition = this.maze.getStart();

        let solved = false;
        if (this.moveList.length != 0) {
            for (let i = 0; i < this.moveList.length && !solved; i++) {
                currentPosition = this.move(currentPosition, this.moveList[i]);
                solved = this.maze.getCell(currentPosition) === CellTypes.END;
            }
        } else {
            for (let i = 0; i < this.steps && !solved; i++) {
                currentPosition = this.moveRandom(currentPosition);
                solved = this.maze.getCell(currentPosition) === CellTypes.END;
            }
        }

        const distanceFromEnd = Math.abs(this.maze.getEnd()[0] - currentPosition[0]) + Math.abs(this.maze.getEnd()[1] - currentPosition[1]);
        const distanceFromStart = Math.abs(this.maze.getStart()[0] - currentPosition[0]) + Math.abs(this.maze.getStart()[1] - currentPosition[1]);
        this.fitness = (this.fitness - distanceFromEnd) + distanceFromStart;

        this.print();
        return solved;
    }

    private move(position: number[], move: Moves): number[] {

        let newPosition: number[] = [];
        if (move === Moves.DOWN) {
            newPosition = [position[0] + 1, position[1]];
        } else if (move === Moves.LEFT) {
            newPosition = [position[0], position[1] - 1];
        } else if (move === Moves.RIGHT) {
            newPosition = [position[0], position[1] + 1];
        } else if (move === Moves.UP) {
            newPosition = [position[0] - 1, position[1]];
        }

        let hasMoved = true;
        const type = this.maze.getCell(newPosition);
        if (type === CellTypes.OPEN) {
            this.maze.setCell(newPosition, CellTypes.EXPLORED);
        } else if (type === CellTypes.CLOSED) {
            hasMoved = false;
            this.fitness -= 2;
        } else if (type === CellTypes.EXPLORED || type === CellTypes.START) {
            this.fitness -= 2;
        }

        if (hasMoved) {
            return newPosition;
        } else {
            return position;
        }
    }

    private moveRandom(position: number[]): number[] {
        const move = Util.randomEnum(Moves);
        this.moveList.push(move);
        return this.move(position, move);
    }

    public getMoveList(): Moves[] {
        return this.moveList;
    }

    public getGeneration(): number {
        return this.generation;
    }

    public getFitness(): number {
        return this.fitness;
    }

    public setFitness(value: number): void {
        this.fitness = value;
    }

    public print(): void {
        logUpdate(`Generation #${this.generation}\nSolver #${this.id}\nFitness: ${this.fitness}\n${this.maze.toString()}`);
    }

    public toString(): string {
        return `${this.fitness}`;
    }

}