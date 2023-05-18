export class EnterPhil {
    constructor(philToEnter) {
        this.philToEnter = philToEnter;
    }
    render() {
        let icon = new Image();
        img.src = this.philToEnter.getImage();
    }
    getNextState() {
        throw new Error('Method not implemented.');
    }
}
