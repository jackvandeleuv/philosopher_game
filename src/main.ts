import { Move } from './entities/Move.js';
import { School } from './entities/School.js';
import { Philosopher } from './entities/Philosopher.js';
import { Player } from './entities/Player.js';
import { Game } from './Game.js';
import { StateManager } from './StateManager.js';
import { ImageRepository } from './ImageRepository.js';
import { MenuFlag } from './StateManager.js';

let moves: Move[] = [
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
]

let imageRepo1 = new ImageRepository();

imageRepo1.loadImage('images/moore.jpg');
imageRepo1.loadImage('images/russell.jpg');
imageRepo1.loadImage('images/wittgenstein.jpg');
imageRepo1.loadImage('images/kant.jpg');
imageRepo1.loadImage('images/nietzsche.jpg');
imageRepo1.loadImage('images/sartre.jpg');

let imageRepo2 = new ImageRepository();

imageRepo2.loadImage('images/moore.jpg');
imageRepo2.loadImage('images/russell.jpg');
imageRepo2.loadImage('images/wittgenstein.jpg');
imageRepo2.loadImage('images/kant.jpg');
imageRepo2.loadImage('images/nietzsche.jpg');
imageRepo2.loadImage('images/sartre.jpg');

let philosophers: Philosopher[] = [
    new Philosopher('G.E. Moore', 75, .15, 1000, 'images/moore.jpg'),
    new Philosopher('Bertrand Russell', 80, .3, 1000, 'images/russell.jpg'),
    new Philosopher('Ludwig Wittgenstein', 70, .1, 1200, 'images/wittgenstein.jpg'),
    new Philosopher('Immanuel Kant', 80, .1, 1100, 'images/kant.jpg'),
    new Philosopher('Friedrich Nietzsche', 90, .3, 1000, 'images/nietzsche.jpg'),
    new Philosopher('Jean-Paul Sartre', 75, .15, 1200, 'images/sartre.jpg')
]

// For Analytic Philosophers
let russellMoves = [moves[0], moves[1], moves[6], moves[7]];
let wittgensteinMoves = [moves[2], moves[3], moves[8], moves[9]];
let mooreMoves = [moves[4], moves[5], moves[10], moves[11]];

philosophers[1].addMove(russellMoves[0]);
philosophers[1].addMove(russellMoves[1]);
philosophers[1].addMove(russellMoves[2]);
philosophers[1].addMove(russellMoves[3]);

philosophers[2].addMove(wittgensteinMoves[0]);
philosophers[2].addMove(wittgensteinMoves[1]);
philosophers[2].addMove(wittgensteinMoves[2]);
philosophers[2].addMove(wittgensteinMoves[3]);

philosophers[0].addMove(mooreMoves[0]);
philosophers[0].addMove(mooreMoves[1]);
philosophers[0].addMove(mooreMoves[2]);
philosophers[0].addMove(mooreMoves[3]);


// For Continental Philosophers
let nietzscheMoves = [moves[12], moves[13], moves[16], moves[17]];
let sartreMoves = [moves[14], moves[15], moves[18], moves[19]];
let kantMoves = [moves[20], moves[21], moves[22], moves[23]];

philosophers[4].addMove(nietzscheMoves[0]);
philosophers[4].addMove(nietzscheMoves[1]);
philosophers[4].addMove(nietzscheMoves[2]);
philosophers[4].addMove(nietzscheMoves[3]);

philosophers[5].addMove(sartreMoves[0]);
philosophers[5].addMove(sartreMoves[1]);
philosophers[5].addMove(sartreMoves[2]);
philosophers[5].addMove(sartreMoves[3]);

philosophers[3].addMove(kantMoves[0]);
philosophers[3].addMove(kantMoves[1]);
philosophers[3].addMove(kantMoves[2]);
philosophers[3].addMove(kantMoves[3]);


let canvas1 = <HTMLCanvasElement> document.getElementById('gameCanvas1');
let ctx1 = <CanvasRenderingContext2D> canvas1.getContext('2d');
let canvas2 = <HTMLCanvasElement> document.getElementById('gameCanvas2');
let ctx2 = <CanvasRenderingContext2D> canvas2.getContext('2d');
 
let game: Game = new Game(new Player('Player1'), 
                            new Player('Player2'), 
                            philosophers.slice(0, 3), 
                            philosophers.slice(3),
                            );

let manager1: StateManager = new StateManager(ctx1, game, 0, imageRepo1);
let manager2: StateManager = new StateManager(ctx2, game, 1, imageRepo2);


function gameLoop(manager1: StateManager, manager2: StateManager, game: Game): void {
    const gameLoopStep = () => {
        // Process input from menus
        manager1.processMenuInput();
        manager2.processMenuInput();
        
        // Get next game scene from the game logic
        let nextScene1 = game.getNextScene1();
        let nextScene2 = game.getNextScene2();
        if (nextScene1 != null) { manager1.pushGameScene(nextScene1); }
        if (nextScene2 != null) { manager2.pushGameScene(nextScene2); }

        // Get next menu state from the game logics
        let nextState1 = game.getNextMenuState1();
        let nextState2 = game.getNextMenuState2();
        if (nextState1 != null) { manager1.changeMenuState(nextState1); }
        if (nextState2 != null) { manager2.changeMenuState(nextState2) }

        // Render current state
        manager1.render();
        manager2.render();

        requestAnimationFrame(gameLoopStep);
    }

    requestAnimationFrame(gameLoopStep);
}

Promise.all([
    imageRepo1.loadImage('images/moore.jpg'),
    imageRepo1.loadImage('images/russell.jpg'),
    imageRepo1.loadImage('images/wittgenstein.jpg'),
    imageRepo1.loadImage('images/kant.jpg'),
    imageRepo1.loadImage('images/nietzsche.jpg'),
    imageRepo1.loadImage('images/sartre.jpg'),
    imageRepo2.loadImage('images/moore.jpg'),
    imageRepo2.loadImage('images/russell.jpg'),
    imageRepo2.loadImage('images/wittgenstein.jpg'),
    imageRepo2.loadImage('images/kant.jpg'),
    imageRepo2.loadImage('images/nietzsche.jpg'),
    imageRepo2.loadImage('images/sartre.jpg')
]).then(() => {
    // Start your game here
    manager2.changeMenuState(MenuFlag.FrozenMenu);
    gameLoop(manager1, manager2, game);
}).catch((error) => {
    console.error('Failed to load images: ', error);
});


