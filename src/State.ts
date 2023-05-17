import { MenuState } from "./Game";

export interface State {
    handleInput(ctx: CanvasRenderingContext2D): void;
    update(): void;
    render(ctx: CanvasRenderingContext2D): void;
    getNextState(): MenuState | null;
} 
