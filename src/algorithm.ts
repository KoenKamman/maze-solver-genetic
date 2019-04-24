import Maze from "./maze";
import Solver from "./solver";
import Util from "./util";
import { Moves } from "./enums";

export default class Algorithm {
    private maze: Maze;
    private solversPerGeneration: number;
    private stepsPerSolver: number;
    private generation: number;
    private solved: boolean;

    constructor(mazeToSolve: Maze, solversPerGeneration: number, stepsPerSolver: number, ) {
        this.maze = mazeToSolve;
        this.solversPerGeneration = solversPerGeneration;
        this.stepsPerSolver = stepsPerSolver;
        this.generation = 0;
        this.solved = false;
    }

    public run(): void {
        let solvers = this.firstGeneration();

        while (!this.solved) {
            solvers = this.survivalOfTheFittest(solvers);
            solvers = this.generateSolvers(solvers);
            for (let i = 0; i < solvers.length; i++) {
                if (solvers[i].getGeneration() != this.generation) {
                    solvers[i].setFitness(0);
                } else {
                    this.solved = solvers[i].solve();
                }
            }
        }

        console.log("Maze solved!");
        process.exit();
    }

    private firstGeneration(): Solver[] {
        let solvers = [];
        for (let i = 0; i < this.solversPerGeneration && !this.solved; i++) {
            let solver = new Solver(this.maze, this.stepsPerSolver, this.generation);
            this.solved = solver.solve();
            solvers.push(solver);
        }
        return solvers;
    }

    private survivalOfTheFittest(solvers: Solver[]): Solver[] {
        return solvers.sort((a, b) => {
            let fitnessA = a.getFitness();
            let fitnessB = b.getFitness();
            if (fitnessA > fitnessB) {
                return -1
            } else if (fitnessA < fitnessB) {
                return 1
            } else {
                return 0;
            }
        }).slice(0, solvers.length / 2);
    }

    private generateSolvers(solvers: Solver[]): Solver[] {
        this.generation += 1;
        let newSolvers = [];
        for (let i = 0; i < solvers.length; i++) {
            let solverA = solvers[Util.getRandomInt(0, solvers.length - 1)];
            let solverB = solvers[Util.getRandomInt(0, solvers.length - 1)];
            newSolvers.push(this.combineSolvers(solverA, solverB));
        }
        return solvers.concat(newSolvers);
    }

    private combineSolvers(solverA: Solver, solverB: Solver): Solver {
        const crossOver = Util.getRandomInt(0, this.stepsPerSolver);
        const listA = solverA.getMoveList().slice(0, crossOver);
        const listB = solverB.getMoveList().slice(crossOver);
        const moveList = listA.concat(listB);
        return this.mutate(moveList);
    }

    private mutate(moveList: Moves[]): Solver {
        if (0.1 > Math.random()) {
            moveList[Util.getRandomInt(0, moveList.length - 1)] = Util.randomEnum(Moves);
        }
        return new Solver(this.maze, this.stepsPerSolver, this.generation, moveList);
    }
}