import { MenuType } from "./StateManager.js";

export interface State {
    render(): void;
} 

export interface MenuState extends State {  
    // Adds event listener.
    activate(): void;

    // Removes event listener.
    deactivate(): void;

    getNextMenuState(): MenuType | null;
}

export interface GameScene extends State {
    isSceneComplete(): boolean;
}