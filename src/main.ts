import { Move } from './Move';
import { School } from './School';
import { Philosopher } from './Philosopher';
import { Player } from './Player';

let moves: Move[] = [
    new Move('Critique', new School(), 100, 100),
    new Move('Analyze', new School(), 100, 100)
]

let wittgenstein = new Philosopher('Wittgenstein', 100, 100, 100);
wittgenstein.addMove(moves[1]);

let marx = new Philosopher('Marx', 100, 100, 100);
marx.addMove(moves[0]);

let player1 = new Player('Player 1');
let player2 = new Player('Player 2');

player1.addGroupMember(wittgenstein);
player2.addGroupMember(marx);

