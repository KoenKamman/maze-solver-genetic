import { MAZE1_DATA, MAZE1_WIDTH, MAZE1_HEIGHT, MAZE1_REQUIRED_STEPS } from "./mazes/maze1";
import Maze from "./maze";
import Algorithm from "./algorithm";

const maze = new Maze(MAZE1_WIDTH, MAZE1_HEIGHT, MAZE1_DATA, MAZE1_REQUIRED_STEPS);
let algorithm = new Algorithm(maze, 10000, 50);
algorithm.run();