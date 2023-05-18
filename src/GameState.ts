import { MenuType } from "./Game";

export interface GameState {
    render(): void;
    getNextState(): MenuType | null;
} 

export interface MenuState extends GameState {  
    // Adds event listener.
    activate(): void;

    // Removes event listener.
    deactivate(): void;
}
