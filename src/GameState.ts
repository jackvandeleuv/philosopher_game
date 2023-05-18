import { MenuType } from "./GameLogic";

export interface State {
    render(): void;
} 

export interface MenuState extends State {  
    // Adds event listener.
    activate(): void;

    // Removes event listener.
    deactivate(): void;

    getNextState(): MenuType | null;
}

export interface GameScene extends State {

}