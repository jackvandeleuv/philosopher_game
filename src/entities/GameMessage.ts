import { Game } from "phaser";

export class GameMessage {
    private readBy: boolean[] = [false, false];

    constructor(private message: string) {}

    setMessageRead(playerIndex: number): void {
        this.readBy[playerIndex] = true;
    }

    readByAll(): boolean {
        for (let status of this.readBy) {
            if (status == false) {
                return false;
            }
        }
        return true;
    }

    isReadBy(playerIndex: number): boolean {
        return this.readBy[playerIndex];
    }

    deepCopy(): GameMessage {
        let messageCopy = new GameMessage(this.message);
        messageCopy.readBy = this.readBy;
        return messageCopy;
    }

    getMessage(): string {
        return this.message;
    }
}