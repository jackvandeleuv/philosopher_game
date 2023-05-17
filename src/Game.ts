import { Move } from './Move.js';
import { School } from './School.js';
import { Philosopher } from './Philosopher.js';
import { Player } from './Player.js';
import { State } from './State.js';
import { MainBattleMenu } from './MainBattleMenu.js';
import { MoveMenu } from './MoveMenu.js';

export enum MenuState {
    MainBattleMenu,
    MoveMenu,
    SwitchMenu,
    Resign
}
 
export class Game {
    private players: Player[] = [];
    private philGroups: Philosopher[][] = [];
    private activePhils: Philosopher[] = [];
    private moving = 0;
    private defending = 1;
    private ctx: CanvasRenderingContext2D;
    private activeMenuState: MenuState = MenuState.MainBattleMenu;
    private mainBattleMenu: MainBattleMenu;
    private moveMenu: MoveMenu;

    constructor(player1: Player, player2: Player, philGroup1: Philosopher[], philGroup2: Philosopher[], ctx: CanvasRenderingContext2D) {
        this.mainBattleMenu = new MainBattleMenu(ctx);
        this.mainBattleMenu.activate();
        this.moveMenu = new MoveMenu(ctx);
        this.moveMenu.activate();
        
        this.players.push(player1.deepCopy());
        this.players.push(player2.deepCopy());

        // Defensive copy
        let philGroup1Copy: Philosopher[] = []
        for (let i = 0; i < philGroup1.length; i++) {
            philGroup1Copy[i] = philGroup1[i].deepCopy()
        }

        // Defensive copy
        let philGroup2Copy: Philosopher[] = []
        for (let i = 0; i < philGroup2.length; i++) {
            philGroup2Copy[i] = philGroup2[i].deepCopy()
        }

        this.philGroups.push(philGroup1Copy);
        this.philGroups.push(philGroup2Copy);

        this.activePhils.push(philGroup1Copy[0])
        this.activePhils.push(philGroup2Copy[0]);

        this.ctx = ctx;
    }

    start(): void {
        this.gameLoop();
    }

    /*
    Returns an integer indicating the winner.
    */
    private gameLoop(): void {
        const gameLoopStep = () => {
            this.processInput();
            this.render();
            requestAnimationFrame(gameLoopStep);
        }

        requestAnimationFrame(gameLoopStep);
    }

    private render(): void {
        switch(this.activeMenuState) {
            case MenuState.MainBattleMenu:
                this.mainBattleMenu.render();
                break;
            case MenuState.MoveMenu:
                this.moveMenu.updateMoves(this.activePhils[this.moving].getMoves());
                this.moveMenu.render();
                break;
            default: 
                throw new Error('Menus were not as expected.')
        }
    }

    private processInput() {
        switch(this.activeMenuState) {
            case MenuState.MainBattleMenu:
                let newStateMain = this.mainBattleMenu.getNextState();
                if (newStateMain != null) {
                    this.activeMenuState = newStateMain;
                }
                break;
            case MenuState.MoveMenu:
                let newStateMove = this.moveMenu.getNextState();
                if (newStateMove != null) {
                    this.activeMenuState = newStateMove;
                } 
                let newMove = this.moveMenu.getNextMove();
                if (newMove != null) {
                    this.makeMove(newMove.deepCopy())
                }
                break;   
            default:
                throw new Error("Menu state not as expected.");
        }
    }

    private makeMove(chosenMove: Move) {
        let philToMove: Philosopher = this.activePhils[this.moving];
        let philToDefend: Philosopher = this.activePhils[this.defending];

        this.printBattleStatus();

        console.log(philToMove 
                    + ' used ' 
                    + chosenMove
                    + '!\n');
        
        let damageOut: number = philToMove.getAttack() * chosenMove.getPower();
        let damageDealt: number = damageOut * philToDefend.getDefense();

        if (damageDealt == 0) {
            console.log(chosenMove 
                            + ' missed the mark and did no damage!');
        } 

        if (damageDealt > 0) {
            console.log(chosenMove + ' did ' + damageDealt + ' damage!\n')
        }

        philToDefend.takeDamage(damageDealt);  
        
        if (philToDefend.isRetired()) {
            console.log(philToDefend + ' retired! Pick a new Philosopher:\n');

            while (philToDefend.isRetired()) {
                if (this.allRetired() != -1) { return };
                philToDefend = this.chooseNewDefender();
                if (philToDefend.isRetired()) {
                    console.log('That Philosopher retired already! Pick a different one.\n')
                }
            }
            this.activePhils[this.defending] = philToDefend;
            console.log('Your turn, ' + philToDefend + '!\n');
        }

        this.moving = this.moving ^ 1;
        this.defending = this.defending ^ 1;
    }

    private chooseNewDefender(): Philosopher {
        let defendingGroup: Philosopher[] = this.philGroups[this.defending];

        let promptString: string = ''; 
        for (let i = 0; i < defendingGroup.length; i++) {
            if (!defendingGroup[i].isRetired()) {
                promptString = promptString 
                                + (i + 1).toString() 
                                + ') ' 
                                + defendingGroup[i] 
                                + '\n';
            }

            if (defendingGroup[i].isRetired()) {
                promptString = promptString
                                + (i + 1).toString()
                                + ') '
                                + defendingGroup[i]
                                + ' (retired)\n'
            }
        }

        let chosenPhil: number = parseInt(prompt(promptString) as string) - 1;
        return defendingGroup[chosenPhil];
    }

    private printBattleStatus(): void {
        console.log('\nPlayer ' + (this.moving + 1).toString() + "'s turn:\n");

        let movingPhil: Philosopher = this.activePhils[this.moving];
        let defendingPhil: Philosopher = this.activePhils[this.defending];

        console.log(movingPhil + ' is ready to move.\n');
        console.log('Your '
                        + movingPhil 
                        + "'s Health - " 
                        + movingPhil.getHealth().toString() 
                        + '\n');
        console.log('Opposing ' 
                        + defendingPhil 
                        + "'s health - " 
                        + defendingPhil.getHealth()
                        + '\n');
    }

    private allRetired(): number {
        // Check to see if all Philosophers on one team are retired.
        for (let i = 0; i < this.philGroups.length; i++) {

            let teamRetired: boolean = true;

            for (let phil of this.philGroups[i]) {
                if (!phil.isRetired()) {
                    teamRetired = !teamRetired;
                    break;
                }
            }

            if (teamRetired) {
                return i ^ 1;
            }
            
        }

        return -1;
    }

}