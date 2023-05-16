import { Move } from './Move.js';
import { School } from './School.js';
import { Philosopher } from './Philosopher.js';
import { Player } from './Player.js';
import { Game } from './Game.js';

let moves: Move[] = [
    new Move('Critique', new School(), .5, 100),
    new Move('Analyze', new School(), .5, 100),
    new Move('Propagandize', new School(), .5, 100),
    new Move('Revolt', new School(), .5, 100),
    new Move('Rant', new School(), .5, 100)
]
 
let philosophers: Philosopher[] = [
    new Philosopher('Wittgenstein', 100, 100, 100),
    new Philosopher('Marx', 100, 100, 100),
    new Philosopher('Russell', 100, 100, 100),
    new Philosopher('Moore', 100, 100, 100),
    new Philosopher('Hegel', 100, 100, 100),
    new Philosopher('Sartre', 100, 100, 100),
    new Philosopher('Aristotle', 100, 100, 100),
    new Philosopher('Kierkegaard', 100, 100, 100)
]

for (let phil of philosophers) {
    for (let move of moves) {
        phil.addMove(move);
    }
}

let game: Game = new Game(new Player('Player1'), new Player('Player2'), philosophers.slice(0, 4), philosophers.slice(4));

game.start();


