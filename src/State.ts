import { MenuState } from "./Game";

export interface State {
    handleClick(ctx: CanvasRenderingContext2D): void;
    update(): void;
    render(ctx: CanvasRenderingContext2D): void;
    getNextState(): MenuState | null;
    activate(): void;
    deactivate(): void;
} 
