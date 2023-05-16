export class Player {
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
    deepCopy() {
        return new Player(this.name);
    }
}
