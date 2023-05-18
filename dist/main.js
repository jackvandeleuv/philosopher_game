import { Move } from './Move.js';
import { School } from './School.js';
import { Philosopher } from './Philosopher.js';
import { Player } from './Player.js';
import { Game } from './Game.js';
let moves = [
    // Analytic Moves
    new Move('Logic Bomb', new School(), .9, 85),
    new Move('Paradox Pulse', new School(), .7, 95),
    new Move('Language Lash', new School(), .85, 80),
    new Move('Private Language', new School(), .75, 90),
    new Move('Common Sense Strike', new School(), .9, 80),
    new Move('Open Question Quake', new School(), .8, 90),
    new Move('Principle of Explosion', new School(), .85, 80),
    new Move('Set Theory', new School(), .75, 90),
    new Move('Tractatus', new School(), .9, 80),
    new Move('Picture Theory', new School(), .8, 85),
    new Move('Ethical Intuitionism', new School(), .85, 85),
    new Move('Naturalistic Fallacy', new School(), .9, 75),
    // Continental Moves
    new Move('Will to Power', new School(), .85, 95),
    new Move('Ubermensch Uppercut', new School(), .8, 90),
    new Move('Ennui', new School(), .9, 80),
    new Move('Bad Faith', new School(), .8, 85),
    new Move('Categorical Imperative', new School(), .85, 90),
    new Move('Transcendental', new School(), .9, 85),
    new Move('Eternal Recurrence', new School(), .8, 80),
    new Move('Dionysian', new School(), .75, 85),
    new Move('Nothingness', new School(), .9, 75),
    new Move('Being and Nothingness Blast', new School(), .7, 90),
    new Move('Ding an sich Damage', new School(), .8, 85),
    new Move('Synthetic A Priori', new School(), .9, 75)
];
let philosophers = [
    new Philosopher('Bertrand Russell', 8, .3, 1000),
    new Philosopher('Ludwig Wittgenstein', 7, .1, 1200),
    new Philosopher('G.E. Moore', 7.5, .15, 100),
    new Philosopher('Friedrich Nietzsche', 9, .3, 1000),
    new Philosopher('Jean-Paul Sartre', 7.5, .15, 1200),
    new Philosopher('Immanuel Kant', 8, .1, 1100)
];
// For Analytic Philosophers
let russellMoves = [moves[0], moves[1], moves[6], moves[7]];
let wittgensteinMoves = [moves[2], moves[3], moves[8], moves[9]];
let mooreMoves = [moves[4], moves[5], moves[10], moves[11]];
philosophers[0].addMove(russellMoves[0]);
philosophers[0].addMove(russellMoves[1]);
philosophers[0].addMove(russellMoves[2]);
philosophers[0].addMove(russellMoves[3]);
philosophers[0].setImage('./images/wittgenstein.jpg');
philosophers[1].addMove(wittgensteinMoves[0]);
philosophers[1].addMove(wittgensteinMoves[1]);
philosophers[1].addMove(wittgensteinMoves[2]);
philosophers[1].addMove(wittgensteinMoves[3]);
philosophers[1].setImage('./images/wittgenstein.jpg');
philosophers[2].addMove(mooreMoves[0]);
philosophers[2].addMove(mooreMoves[1]);
philosophers[2].addMove(mooreMoves[2]);
philosophers[2].addMove(mooreMoves[3]);
philosophers[2].setImage('./images/wittgenstein.jpg');
// For Continental Philosophers
let nietzscheMoves = [moves[12], moves[13], moves[16], moves[17]];
let sartreMoves = [moves[14], moves[15], moves[18], moves[19]];
let kantMoves = [moves[20], moves[21], moves[22], moves[23]];
philosophers[3].addMove(nietzscheMoves[0]);
philosophers[3].addMove(nietzscheMoves[1]);
philosophers[3].addMove(nietzscheMoves[2]);
philosophers[3].addMove(nietzscheMoves[3]);
philosophers[3].setImage('./images/wittgenstein.jpg');
philosophers[4].addMove(sartreMoves[0]);
philosophers[4].addMove(sartreMoves[1]);
philosophers[4].addMove(sartreMoves[2]);
philosophers[4].addMove(sartreMoves[3]);
philosophers[4].setImage('./images/wittgenstein.jpg');
philosophers[5].addMove(kantMoves[0]);
philosophers[5].addMove(kantMoves[1]);
philosophers[5].addMove(kantMoves[2]);
philosophers[5].addMove(kantMoves[3]);
philosophers[5].setImage('./images/wittgenstein.jpg');
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let game = new Game(new Player('Player1'), new Player('Player2'), philosophers.slice(0, 3), philosophers.slice(3), ctx);
game.start();
