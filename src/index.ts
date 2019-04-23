import logUpdate from "log-update";
import { CellTypes } from "./cellTypes";
import { maze1 } from "./mazes/maze1";
import { Maze } from "./maze";

const MAZE_WIDTH = 18;
const MAZE_HEIGHT = 16;
const MAZE_DATA = maze1;

let maze = new Maze(MAZE_WIDTH, MAZE_HEIGHT, MAZE_DATA);
maze.print();