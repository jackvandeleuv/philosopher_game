import { MenuType } from "./Game";

export interface GameState {
    render(): void;
    getNextState(): MenuType | null;
} 

export interface GameMenuState extends GameState {  
    // Adds event listener.
    activate(): void;

    // Removes event listener.
    deactivate(): void;
}
