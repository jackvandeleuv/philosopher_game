"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(newName) {
        this.activePhil = 0;
        this.name = newName;
    }
    ;
    getActivePhil() {
        return this.activePhil;
    }
    setActivePhil(activePhil) {
        this.activePhil = activePhil;
    }
    getName() {
        return this.name;
    }
}
exports.Player = Player;
