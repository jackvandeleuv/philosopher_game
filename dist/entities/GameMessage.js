export class GameMessage {
    constructor(message) {
        this.message = message;
        this.readBy = [false, false];
    }
    setMessageRead(playerIndex) {
        this.readBy[playerIndex] = true;
    }
    readByAll() {
        for (let status of this.readBy) {
            if (status == false) {
                return false;
            }
        }
        return true;
    }
    isReadBy(playerIndex) {
        return this.readBy[playerIndex];
    }
    deepCopy() {
        let messageCopy = new GameMessage(this.message);
        messageCopy.readBy = this.readBy;
        return messageCopy;
    }
    getMessage() {
        return this.message;
    }
}
