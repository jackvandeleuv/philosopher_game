import { MenuState } from "./Game";

export interface State {
    render(): void;
    getNextState(): MenuState | null;

    // Add relevant event listeners
    activate(): void;

    // Remove relevant event listeners
    deactivate(): void;
} 
